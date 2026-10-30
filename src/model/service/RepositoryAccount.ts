/// <reference types="node" />
import IRepositoryData from "../interface/IRepositoryData.ts"
import Account from "../../.share/Account.ts";
import db from "../repository/MongoDB.ts"
import { createHmac } from "node:crypto";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET ?? "";
if (!jwtSecret) throw new Error("JWT_SECRET is missing.");

const _collection = db?.collection<Account>("Users");

export default class RepositoryAccount implements IRepositoryData<Account | null, Account> {
	private _HelperSaltHash(raw: string): string {
		const hmac = createHmac("sha256", `${process.env.secret}`);
		const salted_key = hmac.update(`${process.env.salt}` + raw);
		const hash = salted_key.digest("hex");
		return hash;
	}
	async Get(k: Account | null): Promise<Account | null> {
		if (k === null) throw EvalError("Empty key for retrieving the Account from the database");
		const hashed_key = this._HelperSaltHash(k.password!);
		const key = { email: k.email, password: hashed_key };
		const account = await _collection?.findOne(key) ?? null;
		if (account === null) return null;
		const token = jwt.sign({ sub: account.email }, jwtSecret, {
			algorithm: "HS256",
			expiresIn: "15m",
		});
		account.token = token;
		account.password = null;
		return account;
	}
	//retrieve user role using their email
	//existing account without role are treated as regular users
	async GetRoleByEmail(email: string): Promise<"user" | "admin" | null>{
		//find account in mongodb using verified email
		const account = await _collection?.findOne({email});
		//return null if account doesn't exist
		if(!account){
			return null;
		}
		//only a stored admin role gets admin permissions
		return account.role === "admin" ? "admin" : "user";
	}

	async BatchGet(_k: (Account | null)[]): Promise<Account[] | null> {
		// not sure how to implement checker to use the none-null attribute of Account to search in the database...
		// so i disable this functionality for now.
		throw EvalError("RepositoryAccount should not be used with BatchGet(...)");
	}
	async Set(k: Account | null, d: Account): Promise<void> {
		// register.
		// try not to modify the outer value.
		// deep copy is hard?
		const original_data_password = d.password;
		d.password = this._HelperSaltHash(d.password!);
		if (k === null) {
			const key = { email: d.email };
			const existing = await _collection?.findOne(key) ?? null;
			// check existing.
			if (existing !== null) throw EvalError("The account already exist.");
			//new accounts always receive regular user permissions
			//never trust a role supplied by frontend
			await _collection?.insertOne({...d, role: "user", token: null});
			d.password = original_data_password;
		}
		// update.
		else {
			const hashed_key = this._HelperSaltHash(k.password!);
			const key = { email: k.email, password: hashed_key };
			//only update allowed account info
			await _collection?.updateOne(key, { $set:{  
				name: 		d.name,
				password:	d.password,
			}
			}, { upsert: false });
		}
	}
	async BatchSet(_k: (Account | null)[], _d: Account[]): Promise<void> {
		// people shall now batch update/create accounts. 
		throw EvalError("RepositoryAccount should not be used with BatchSet(...)");
	}
};