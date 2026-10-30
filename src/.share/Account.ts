export type Account = {
	name: string | null;
	email: string | null;
	password: string | null;
	token: string | null;
	role?: "user" | "admin";
}

export default Account;