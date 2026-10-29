/// <reference types="vite/client" />
import "../css/.GLOBAL.css";
import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom"
import SideBar from "./SideBar.tsx"
import { LoadWebsiteVisitCounter, PostWebsiteVisitCounter } from "../../controller/LoadWebsiteVisitCounter.ts"
import AccountManager, { AccountContext } from "../../controller/AccountManager.ts"

const mockCredentials = { name: "test_name", email: "test_email@ju.se", password: "test_password" };

/**
 * Currently will just fetching the search api without having search parameters.
 * @returns Home page as React component.
 */
export default function Home() {
	const { account, setAccount } = useContext(AccountContext)!;
;
	const [searchResult, setSearchResult] = useState<number>();
	useEffect(() => {
		async function getSearch() {
			setSearchResult(await LoadWebsiteVisitCounter());
		}
		getSearch();
		// also increase the counter.
		PostWebsiteVisitCounter();
	}, []);

	// test mongodb
	const OnPressRegister = async () => {
		try {
			await new AccountManager(mockCredentials).Register();
		}
		catch (error) {
			console.error(error);
		}
	}
	const OnPressAccess = async () => {
		try {
			const loggedInAccount = new AccountManager(mockCredentials);
			await loggedInAccount.Login();
			setAccount(loggedInAccount);
		}
		catch (error) {
			console.error(error);
		}
	}
	return (
		<nav className="Home">
			<SideBar></SideBar>
			<nav style={{ marginLeft: "var(--pos-left)" }}>
				<h1>Empty Home</h1>
				<h1>Today Activity Count: {searchResult}</h1>
						<button onClick={OnPressRegister}>Create mock account</button>
						<button onClick={OnPressAccess}>Access mock account</button>
			</nav >
			<Outlet></Outlet>
		</nav >
	);
}