/// <reference types="vite/client" />
import "../.css/.GLOBAL.css";
import "../.css/SideBar.css";
import React, { useRef } from "react";
import { Link, Outlet } from "react-router-dom";

/** 
 * Foldable, expandable side bar.
 * @returns Side bar react component.
*/
export default function Component() {
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
	return (
		<>
			<nav ref={backgroundRef} className="side-bar hidden background" onClick={BackgroundOnClick}></nav>
			<nav ref={sideBarRef} className="side-bar hidden" onClick={SideBarOnClick}>
				<p className="arrow">{">"}</p>
				<Link to="/calendar">Calendar</Link>
				<Link to="/events/new">New Event</Link>
				<Link to="/">PLACE_HOLDER</Link>
				<Link to="/">PLACE_HOLDER</Link>
				<Link to="/">PLACE_HOLDER</Link>
			</nav>
		</>
	);
}

