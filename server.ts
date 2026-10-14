import type { EventInput } from "./src/model/interface/Event.ts";

import dotenv from 'dotenv';
dotenv.config();

import express from "express";
const server = express();
import cors from "cors"
const coursOptions = {
	origin: [`${process.env.url}:${process.env.portF}`],
}
import repository_manager from "./src/model/service/RepositoryManager.ts"
//import Account from './src/.share/Account.ts';

// registera middleware.
server.use(cors(coursOptions));
server.use(express.json());
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////

server.post("/api/website-visit-counter", async (_req, res) => {
	const number = await repository_manager.website_visit_counter.Get("");
	// edge case whe the counter not found/exist in the database.
	if (number === null) {
		res.sendStatus(404).json({ error: "Counter not found somehow haha." });
		return;
	}
	// no more worries.
	await repository_manager.website_visit_counter.Set("", number + 1);
	res.sendStatus(204); // 204 mean success with no response data.
});

server.get("/api/website-visit-counter", async (_req, res) => {
	const number = await repository_manager.website_visit_counter.Get("");
	res.json({ data: number });
});

server.post("/api/account/register", async (req, res) => {
	const account = await repository_manager.account.Get(req.body);
	// shall not create account if already exist.
	if (account !== null) {
		res.sendStatus(404);
		return;
	}
	await repository_manager.account.Set(null, req.body);
	res.sendStatus(204);
});

server.post("/api/account/login", async (req, res) => {
	const account = await repository_manager.account.Get(req.body);
	if (account === null) {
		res.sendStatus(404);
		return;
	}
	res.json(account);
});

// GET /api/events
//retrieves all calendar events from mongodb
server.get("/api/events", async (_req, res) => {

	try{
		const events = await repository_manager.event.GetAll();

		res.json(events);
	}
	catch(error){

		console.error("failed to retrieve events:", error);

		res.status(500).json({
			error: "could not retrieve events"
		});
	}

});

//GET /api/events/:id
//retrieves a single event using its id
server.get("/api/events/:id", async (req, res) =>{

	try{
		const id = String(req.params.id);
		const event = await repository_manager.event.Get(id);

		//No event exists with this ID
		if(event === null){
			res.status(404).json({
				error: "event not found"
			});
			return;
		}

		res.json(event);
	} 
	catch(error){
		console.error("failed to retrieve event:", error);

		res.status(500).json({
			error: "could not retrieve event"
		});
	}
});

//POST /api/events
//retrieves event data from EventForm.tsx, validates it and stores it in mongodb
server.post("/api/events", async (req, res) =>{

	try{
		const body = req.body;

		//ensure a json object was supplied
		if(typeof body !== "object" 
		   || body === null
		   || Array.isArray(body)
		){
			res.status(400).json({
				error: "invalid event data"
			});
			return;
		}

		const fields = [
			"title"       ,
			"date"        ,
			"startTime"   ,
			"endTime"     ,
			"location"    ,
			"description" ,
		] as const;

		//ensure every expected field is a string
		const validFields = fields.every(
			field => typeof body[field] === "string"
		);

		if(!validFields){
			res.status(400).json({
				error: "event fields must contain text"
			});
			return;
		}

		const eventData: EventInput = {
			
			title      : body.title.trim()      ,
			date       : body.date              ,
			startTime  : body.startTime         ,
			endTime    : body.endTime           ,
			location   : body.location.trim()   ,
			description: body.description.trim(),
		};

		//validate required event info
		if(!eventData.title || !eventData.date){
			res.status(400).json({
				error: "title and date required"
			});
			return;
		}

		//validate the date, including impossible dates
		const parsedDate = new Date(
			`${eventData.date}T00:00:00Z`
		);

		if(
			!/^\d{4}-\d{2}-\d{2}$/.test(eventData.date) 
			|| Number.isNaN(parsedDate.getTime())
			|| parsedDate.toISOString().slice(0, 10) !== eventData.date
		){
			res.status(400).json({
				error: "invalid date"
			});
			return;
		}

		//validate time formats and ordering
		const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

		if(
			!timePattern.test(eventData.startTime) 
			|| !timePattern.test(eventData.endTime)
			|| eventData.startTime >= eventData.endTime
		){
			res.status(400).json({
				error: "Invalid start or end time"
			});
			return;
		}

		//save event to mongodb
		const createdEvent = await repository_manager.event.Create(eventData);

		//return new event and generated id
		res.status(201).json(createdEvent);
	}
	catch(error){
		console.error("Failed to create event:", error);

		res.status(500).json({
			error: "could not create event"
		});
	}
});


///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
server.listen(3000, () => { console.log("Running...") });