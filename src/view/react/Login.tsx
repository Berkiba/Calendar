import { useContext, useState } from "react";
import type { SubmitEvent } from "react";
import AccountManager, { AccountContext } from "../../controller/AccountManager.ts";

export default function Login() {
	const { setAccount } = useContext(AccountContext)!;
	const [message, setMessage] = useState("");

	async function f_HelperSubmit(event: SubmitEvent<HTMLFormElement>) {
		// prevent default reload?
		event.preventDefault();
		const form = event.currentTarget;
		try {
			const account = new AccountManager(Object.fromEntries(new FormData(form)));
			await account.Login();
			setAccount(account);
			form.reset();
			setMessage("Logged in.");
		} catch {
			setMessage("Login failed.");
		}
	}

	return (
		<form onSubmit={f_HelperSubmit} style={{ marginLeft: "var(--pos-left)" }}>
			<label>Email <input name="email" type="email" required /></label>
			<label>Password <input name="password" type="password" required /></label>
			<button type="submit">Log in</button>
			<p role="status">{message}</p>
		</form>
	);
}