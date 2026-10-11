import IRepositoryData from "../interface/IRepositoryData.ts"
import Account from "../../.share/Account.ts";
import db from "../repository/MongoDB.ts"

const _collection = db?.collection<Account>("Users");

export default class RepositoryAccount implements IRepositoryData<Account | null, Account> {
	async Get(k: Account | null): Promise<Account | null> {
		if (k === null) throw EvalError("Empty key for retrieving the Account from the database");
		const key = { email: k.email, password: k.password };
		const account = await _collection?.findOne(key) ?? null;
		// hide password.
		if (account != null)
			account.password = "";
		return account;
	}
	async BatchGet(_k: (Account | null)[]): Promise<Account[] | null> {
		// not sure how to implement checker to use the none-null attribute of Account to search in the database...
		// so i disable this functionality for now.
		throw EvalError("RepositoryAccount should not be used with BatchGet(...)");
	}
	async Set(k: Account | null, d: Account): Promise<void> {
		// register.
		if (k === null) {
			const key = { email: d.email };
			const existing = await _collection?.findOne(key) ?? null;
			// check existing.
			if (existing !== null) throw EvalError("The account already exist.");
			await _collection?.insertOne(d);
		}
		// update.
		else {
			const key = { email: k.email, password: k.password };
			await _collection?.updateOne(key, { $set: d }, { upsert: true });
		}
	}
	async BatchSet(_k: (Account | null)[], _d: Account[]): Promise<void> {
		// people shall now batch update/create accounts. 
		throw EvalError("RepositoryAccount should not be used with BatchSet(...)");
	}
};