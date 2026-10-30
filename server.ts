import type { EventInput } from "./src/model/interface/Event.ts";


import { sendEventCreatedEmail } from "./src/model/service/EmailNotification.ts"
import express from "express";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
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

function HelperVerifyToken(token: string, email: string): boolean {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET ?? "", { algorithms: ["HS256"] });
        return payload.sub === email;
    } catch {
        return false;
    }
}

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
		
		 // Send a confirmation only when a valid logged-in account is available.
        // Email failure must not undo a successfully saved event.
        const authorization = req.headers.authorization;
        if (authorization?.startsWith("Bearer ")) {
            try {
                const token = authorization.slice("Bearer ".length).trim();
                const payload = jwt.verify(token, process.env.JWT_SECRET ?? "", {
                    algorithms: ["HS256"],
                });

                if (typeof payload !== "string" && typeof payload.sub === "string" && payload.sub) {
                    try {
                        await sendEventCreatedEmail(payload.sub, createdEvent);
                    } catch (emailError) {
                        console.error("[Email] Event was saved, but its confirmation email failed:", emailError);
                    }
                } else {
                    console.warn("[Email] Event was saved, but notification was skipped because the token identity was invalid.");
                }
            } catch {
                console.warn("[Email] Event was saved, but notification was skipped because the token is invalid or expired.");
            }
        } else {
            console.log("[Email] Confirmation skipped because the event creator is not logged in.");
        }

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

//PUT /api/events/:id
//updates existing event into mongodb
server.put("/api/events/:id", async (req, res) =>{

	try{
		const id = String(req.params.id);
		const body = req.body;

		//ensure that json object was supplied
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
			title 		: body.title.trim()      ,
			date        : body.date              ,
			startTime   : body.startTime         ,
			endTime     : body.endTime           ,
			location    : body.location.trim()   ,       
			description : body.description.trim(),
		};

		//validate required event info
		if(!eventData.title || !eventData.date){
			res.status(400).json({
				error: "title and date required"
			});
			return;
		}

		//validate the date
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
				error: "invalid start or end time"
			});
			return;
		}

		//update the event in mongodb
		const updatedEvent = await repository_manager.event.Update(id, eventData);

		//return 404 if event doesn't exist
		if(updatedEvent === null){
			res.status(404).json({
				error: "event not found"
			});
			return;
		}

		//return updated event
		res.json(updatedEvent);
	}

	catch(error){
		console.error("failed to update event: ", error);

		res.status(500).json({
			error: "could not update event"
		});
	}

});

//DELETE /api/events/:id
//deletes an existing event from mongodb using its id
server.delete("/api/events/:id", async (req, res) =>{

	try{
		const id = String(req.params.id);

		//delete event from mongodb
		const deleted = await repository_manager.event.Delete(id);

		//return 404 if event doesn't exist
		if(!deleted){
			res.status(404).json({
				error: "event not found"
			});
			return;
		}

		//return success with no response body
		res.sendStatus(204);
	}
	catch(error){
		console.error("failed to delete event:", error);

		res.status(500).json({
			error: "could not delete event"
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