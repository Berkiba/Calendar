/// <reference types="vite/client" />
import "../.css/.GLOBAL.css";
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom"
import SideBar from "./SideBar.tsx"
import SearchReturnType from "../.type/Search.ts"



export default function Component() {
	const [searchResult, setSearchResult] = useState(null);
	useEffect(() => {
		async function getSearch() {
			console.log("the fetch starts");
			const response = await fetch("/api/search");
			const json = await response.json();
			setSearchResult(json.data)
			console.log("the fetch works");
		}
		getSearch();
	}, []);
	return (
		<nav className="Home">
			<SideBar></SideBar>
			<nav style={{ marginLeft: "var(--pos-left)" }}>
				<h1>Empty Home</h1>
				<h1>Search API returns: {searchResult}</h1>
			</nav >
			<Outlet></Outlet>
		</nav >
	);
}