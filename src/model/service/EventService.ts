
import axios from "axios";
import type { Event } from "../interface/Event";

export async function getEvents(): Promise<Event[]> {
	const response = axios(`/events`);
	return (await response).data;
}

export async function getEvent(id: string): Promise<Event> {
	const response = axios(`/events/${id}`);
	return (await response).data;
}

