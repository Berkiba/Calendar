import type { Request, Response } from "express";
import type SearchReturnType from "../../.model/.type/Search.ts";
import Database from "../../.model/.service/Database.ts";
import MongoDB from "../../.model/.service/.concrete/MongoDB.ts";

const database = new Database(new MongoDB);

export default function Search(request: Request, response: Response) {
	let json: SearchReturnType = { data: database.Get("My Key.") };
	return response.json(json);
}