import Account from "../.share/Account.ts";
import axios from "axios"

/**
 * 
 * 
 * All account related funtionalities shall be here.
 * 
 * 
 */
export default class AccountManager {
	/**
	 * Constructor and member attributes.
	 */
	private _isLogin: boolean;
	private _account: Account;
	constructor(json: object) {
		this._isLogin = false;
		// it does not need to contain all the needed data,
		// because member methods will check if required data exist before doing anything.
		if (typeof json !== "object" || json === null)
			throw TypeError("Invalid Account construct argument.");
		this._account = { name: null, email: null, password: null };
		this._account.name = "name" in json && typeof json.name === "string" ? json.name : null;
		this._account.email = "email" in json && typeof json.email === "string" ? json.email : null;
		this._account.password = "password" in json && typeof json.password === "string" ? json.password : null;
	}
	/**
	 * Properties.
	 */
	get Name() { if (this._account.name === null) throw EvalError("Null name."); return this._account.name; }
	get Email() { if (this._account.email === null) throw EvalError("Null email."); return this._account.email; }
	/**
	 * Member methods.
	 */
	private _CheckCredentialValid() {
		if (this._account.email === null) throw EvalError("Empty email.");
		if (this._account.password === null) throw EvalError("Empty password.");
		// ^ means start of a string.
		// . means any character.
		// + means one or multiple previous charactor.
		// $ means end of a string. 
		if (!(/^.+@.+\..+$/.test(this._account.email))) throw TypeError("Not a valid email.");
	}

	public async Register() {
		this._CheckCredentialValid();
		if (this._account.name === null) throw EvalError("Empty username.");
		// i guess the axios will throw if encountered some error status code ?
		await axios.post("/api/account/register", this._account);
	}
	public async Login() {
		if (this._isLogin === true) throw EvalError("Please logout before login again.");
		this._CheckCredentialValid();
		const response = await axios.post("/api/account/login", this._account);
		if (response == null) return;
		// overwrite / erase the password info with null from the backend.
		this._account = response.data as Account;
		this._isLogin = true;
	}
}