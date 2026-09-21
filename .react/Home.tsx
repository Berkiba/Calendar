/// <reference types="vite/client" />
import "../.css/.GLOBAL.css";
import React from "react";
import { Link, Outlet } from "react-router-dom"
import SideBar from "./SideBar"

export default function Component() {
	return (
		<nav className="Home">
			<SideBar></SideBar>
			<nav>
				<h1 style={{ marginLeft: "20vw" }} >Empty Home</h1>
			</nav >
			<Outlet></Outlet>
		</nav>
	);
}