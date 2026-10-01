/// <reference types="vite/client" />
import "../.css/.GLOBAL.css";
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom"
import SideBar from "./SideBar.tsx"
import type SearchReturnType from "../../.model/.type/Search.ts"


/**
 * Currently will just fetching the search api without having search parameters.
 * @returns Home page as React component.
 */
export default function Component() {
	const [searchResult, setSearchResult] = useState<SearchReturnType>();
	useEffect(() => {
		async function getSearch() {
			console.log("the fetch starts");
			const response = await fetch("/api/search");
			setSearchResult(await response.json());
			console.log("the fetch works");
		}
		getSearch();
	}, []);
	return (
		<nav className="Home">
			<SideBar></SideBar>
			<nav style={{ marginLeft: "var(--pos-left)" }}>
				<h1>Empty Home</h1>
				<h1>Search API returns: {searchResult?.data}</h1>
			</nav >
			<Outlet></Outlet>
		</nav >
	);
}