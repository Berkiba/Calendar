import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../Home";
import EventForm from "../EventForm";
import EventDetails from "../EventDetails";
import Calendar from "../calendar";
import { loadEvent } from "../../../controller/EventController";

export default createBrowserRouter([{
	path: "/",
	Component: Home,
	children: [
		{
			index: 		true,
			element: 	<Navigate to="/calendar" replace />
		},
		{
			path: 		"calendar",
			Component: 	Calendar,
		},
		{
			path: 		"events/new",
			Component: 	EventForm,
		},
		{
			//open the form with an existing event's info
			path: 		"events/:id/edit",
			Component:	EventForm,
			loader:		loadEvent
		},
		{
			path: 		"events/:id",
			Component: 	EventDetails,
			loader: 	loadEvent
		},
	],
}
],

);