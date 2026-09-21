import React from "react";
import { Link, Outlet } from "react-router-dom"
import SideBar from "./SideBar"

export default function Component() {
	return (
		<>
			<SideBar></SideBar>
			<nav>
				<h1 style={{ marginLeft: "20vw" }} >Empty Home</h1>
			</nav >
			<Outlet></Outlet>
		</>
	);
}