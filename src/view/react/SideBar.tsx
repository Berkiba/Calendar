/// <reference types="vite/client" />
import "../css/.GLOBAL.css";
import "../css/SideBar.css";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../../controller/AccountManager";

/** 
 * Foldable, expandable side bar.
 * @returns Side bar react component.
*/
export default function SideBar() {
	const sideBarRef = useRef<HTMLElement>(null);
	const backgroundRef = useRef<HTMLElement>(null);

	// Sync toggle.
	function helperToggle() {
		sideBarRef.current?.classList.toggle("hidden");
		backgroundRef.current?.classList.toggle("hidden");
	}

	// Event handler for mouse clicks.
	// One for expanding.
	// One for folding.
	// Different places to click.
	function SideBarOnClick() {
		if (sideBarRef.current?.classList.contains("hidden"))
			helperToggle();
	}
	function BackgroundOnClick() {
		if (!backgroundRef.current?.classList.contains("hidden"))
			helperToggle();
	}

	const {account} = useContext(AccountContext)!;
	return (
		<>
			<nav ref={backgroundRef} className="side-bar hidden background" onClick={BackgroundOnClick}></nav>
			<nav ref={sideBarRef} className="side-bar hidden" onClick={SideBarOnClick}>
				<p className="arrow">{">"}</p>
				<Link to="/calendar">Calendar</Link>
				<Link to="/events/new">New Event</Link>
				<Link to="/register">Register</Link>
				<Link to="/login">Login</Link>
				<Link to="/">{account?.Email}</Link>
			</nav>
		</>
	);
}

