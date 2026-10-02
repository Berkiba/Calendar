import type { LoaderFunctionArgs } from "react-router-dom";
import type { Event } from "../model/interface/Event";
import { getEvent, getEvents } from "../model/service/EventService";

export async function loadEvents(): Promise<Event[]> {
	return await getEvents();
}

export async function loadEvent({ params }: LoaderFunctionArgs) {
	const id = params.id!;
	return await getEvent(id);
}

