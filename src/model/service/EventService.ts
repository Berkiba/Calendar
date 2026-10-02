
import axios from "axios";
import type { Event } from "../interface/Event";
const url = import.meta.env.VITE_API_URL; // why must have VITE in the name?

export async function getEvents(): Promise<Event[]> {
	const response = axios(`${url}/events`);
	return (await response).data;
}

export async function getEvent(id: string): Promise<Event> {
	const response = axios(`${url}/events/${id}`);
	return (await response).data;
}

