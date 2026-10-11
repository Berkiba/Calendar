import type { LoaderFunctionArgs } from "react-router-dom";
import axios from "axios"

/**
 * 
 * @returns the vist counter.
 */
export async function LoadWebsiteVisitCounter(): Promise<number> {
	return (await axios.get("/api/website-visit-counter")).data.data;
}

/**
 * increase the counter when ever this being called.
 */
export async function PostWebsiteVisitCounter(): Promise<void> {
	await axios.post("/api/website-visit-counter");
}



