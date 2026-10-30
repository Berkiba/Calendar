
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

//send new event to backend with authentication token
//express validates data and saves event through mongodb
export async function createEvent(data: EventInput, token: string): Promise<Event> {

	const response = await axios.post<Event>(
		"/api/events",
		data,
		{headers: {Authorization: `Bearer ${token}`}}
	);

	return response.data;
}

//update existing event using its id
//send updated event data to express backend
export async function updateEvent(id: string, data: EventInput, token: string): Promise<Event>{

	const response = await axios.put<Event>(
		`/api/events/${encodeURIComponent(id)}`,
		data,
		{headers: {Authorization: `Bearer ${token}`}}
	);

	return response.data;
}

//delete existing event using its id
//send delete request to express backend
export async function deleteEvent(id: string, token: string): Promise<void>{

	await axios.delete(
		`/api/events/${encodeURIComponent(id)}`,
		{headers: {Authorization: `Bearer ${token}`}}
	);
}

