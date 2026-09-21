/// <reference types="vite/client" />
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../.css/SideBar.css";

export default function Component() {
	return (
		<>
			<nav className="side-bar">
				<Link to="/">Home</Link>
				<Link to="/">PLACE_HOLDER</Link>
				<Link to="/">PLACE_HOLDER</Link>
				<Link to="/">PLACE_HOLDER</Link>
				<Link to="/">PLACE_HOLDER</Link>
			</nav>
			<Outlet></Outlet>
		</>
	);
}