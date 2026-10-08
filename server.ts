import dotenv from 'dotenv';
dotenv.config();

import express from "express";
const server = express();
// @ts-ignore
import cors from "cors"
const coursOptions = {
	origin: ["http://localhost:5173"],
}
import repository_manager from "./src/model/service/RepositoryManager.ts"

// registera middleware.
server.use(cors(coursOptions));
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////

const events = [
	{
		id: "1",
		title: "Pool party",
		date: "2026-09-28",
		startTime: "10:00",
		endTime: "11:00",
		location: "Room E3333",
		description: "Awesome pool party and it's gonna be really fun. Bring nachos."
	},
	{
		id: "2",
		title: "Dinosaur documentary",
		date: "2026-09-29",
		startTime: "08:00",
		endTime: "20:00",
		location: "Room E4444",
		description: "Dinosaur documentary binge. It's gonna be totally radical. I love dinosaurs."
	},
	{
		id: "3",
		title: "Motorcycle day",
		date: "2026-09-30",
		startTime: "15:00",
		endTime: "15:30",
		location: "Room E5555",
		description: "Ride motorcycles and do awesome and cool stuff with motorcycles."
	}
];

server.post("/api/website-visit-counter", async (req, res) => {
	const number = await repository_manager.website_visit_counter.Get("");
	if (number != undefined)
		await repository_manager.website_visit_counter.Set("", number + 1);
});

server.get("/api/website-visit-counter", async (req, res) => {
	const number = await repository_manager.website_visit_counter.Get("");
	return res.json({ data: number });
});

server.get("/events", (req, res) => { // mock.
	return res.json(events);
});

server.get("/events/:id", (req, res) => { // return the single event from the mock.
	const id = req.params.id;
	const event = events.find((e) => e.id === id);
	return res.json(event);
});

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
server.listen(3000, () => { console.log("Running...") });