/// <reference types="vite/client" />
import "../css/.GLOBAL.css";
import { useState, useEffect, useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Alert, Snackbar } from "@mui/material";
import SideBar from "./SideBar.tsx"
import { LoadWebsiteVisitCounter, PostWebsiteVisitCounter } from "../../controller/LoadWebsiteVisitCounter.ts"
import AccountManager, { AccountContext } from "../../controller/AccountManager.ts"

const mockCredentials = { name: "test_name", email: "test_email@ju.se", password: "test_password" };

/**
 * Currently will just fetching the search api without having search parameters.
 * @returns Home page as React component.
 */
export default function Home() {
	const { setAccount } = useContext(AccountContext)!;
	
	//get notification after deleting event
	const location = useLocation();
	const navigate = useNavigate();

	const notification = (
		location.state as { notification?: string } | null)?.notification;
	
	//keep the notification visible until it closes
	const [notificationOpen, setNotificationOpen] 		= useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");
	useEffect(() => {
		if (location.pathname === "/" && notification === "event deleted successfully"){
			setNotificationMessage(notification);
			setNotificationOpen(true);
		}
	}, [notification, location.key, location.pathname]);

	//close notification and clear navigation state
	function closeNotification(){
		setNotificationOpen(false);
	}
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

			{/*show notification after deleting event*/}
			<Snackbar
				open			 = {notificationOpen}
				autoHideDuration = {4000}
				onClose			 = {() => setNotificationOpen(false)}
				anchorOrigin	 = {{ vertical: "bottom", horizontal: "center" }}
				>
					<Alert
						severity	= "success"
						variant		= "filled"
						onClose  	= {() => setNotificationOpen(false)}
						>
						{notificationMessage}
					</Alert>
				</Snackbar>
		</nav >
	);
}