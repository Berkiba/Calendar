import type { LoaderFunctionArgs } from "react-router-dom";
import axios from "axios"

export default async function LoadWebsiteVisitCounter(): Promise<number> {
	return (await axios.get("/api/website-visit-counter")).data.data;
}

