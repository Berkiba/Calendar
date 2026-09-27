import { createBrowserRouter } from "react-router-dom";
import Home from "../Home";
import EventForm from "../EventForm";
import EventDetails from "../EventDetails";

export default createBrowserRouter([{
	path: "/",
	Component: Home,
	children: [
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