import { useState } from "react";
import type { SubmitEvent } from "react";
import AccountManager from "../../controller/AccountManager.ts";

export default function Register() {
	const [message, setMessage] = useState("");

	async function f_HelperSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		try {
			await new AccountManager(Object.fromEntries(new FormData(form))).Register();
			form.reset();
			setMessage("Account created.");
		} catch {
			setMessage("Registration failed.");
		}
	}

	return (
		<form onSubmit={f_HelperSubmit} style={{ marginLeft: "var(--pos-left)" }}>
			<label>Name <input name="name" required /></label>
			<label>Email <input name="email" type="email" required /></label>
			<label>Password <input name="password" type="password" required /></label>
			<button type="submit">Register</button>
			<p role="status">{message}</p>
		</form>
	);
}