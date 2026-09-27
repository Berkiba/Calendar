import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../Home";
import EventForm from "../EventForm";
import EventDetails from "../EventDetails";
import Calendar from "../calendar";

export default createBrowserRouter([{
	path: "/",
	Component: Home,
	children: [
		{
			index: true,
			element: <Navigate to="/calendar" replace />
		},
		{
			path: "calendar",
			Component: Calendar,
		},
		{
			path: "events/new",
			Component: EventForm,
		},
		{
			path: "events/:eventId",
			Component: EventDetails,
		},
	],
}
],

);