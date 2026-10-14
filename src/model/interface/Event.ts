
//represents a saved calendar event
//both the frontend and backend use this interface
export interface Event {
	id: string,
	title: string,
	date: string,
	startTime: string,
	endTime: string,
	location: string,
	description: string,
};

//represents info needed to create event
export type EventInput = Omit<Event, "id">;

