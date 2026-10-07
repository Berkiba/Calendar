/// <reference types="vite/client" />
import "../css/.GLOBAL.css";
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom"
import SideBar from "./SideBar.tsx"
import LoadWebsiteVisitCounter from "../../controller/LoadWebsiteVisitCounter.ts"


/**
 * Currently will just fetching the search api without having search parameters.
 * @returns Home page as React component.
 */
export default function Home() {
	const [searchResult, setSearchResult] = useState<number>();
	useEffect(() => {
		async function getSearch() {
			setSearchResult(await LoadWebsiteVisitCounter());
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