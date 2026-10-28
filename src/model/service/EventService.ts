
import axios from "axios";
import type { Event, EventInput } from "../interface/Event";

//retrieve all events saved in mongodb
export async function getEvents(): Promise<Event[]> {
	const response = await axios.get<Event[]>("/api/events");
	return response.data;
}

//retrieve one event using its unique ID
export async function getEvent(id: string): Promise<Event> {
	const response = await axios.get<Event>(
		`/api/events/${encodeURIComponent(id)}`);
	return response.data;
}

//send new event to backend
//express validates data and saves event through mongodb
export async function createEvent(
	data: EventInput
): Promise<Event> {

	const response = await axios.post<Event>("/api/events", data);

	return response.data;
}

//update existing event using its id
//send updated event data to express backend
export async function updateEvent(id: string, data: EventInput): Promise<Event>{

	const response = await axios.put<Event>(
		`/api/events/${encodeURIComponent(id)}`,
		data
	);

	return response.data;
}

//delete existing event using its id
//send delete request to express backend
export async function deleteEvent(id: string): Promise<void>{

	await axios.delete(
		`/api/events/${encodeURIComponent(id)}`
	);
}

