import {
	Box,
	Button,
	Card,
	CardContent,
	Stack,
	Typography,
} from "@mui/material";
import { useLoaderData, useParams } from "react-router-dom";
import { Event } from "../../model/interface/Event";

// Event details shows info about one event
export default function EventDetails() {
	// reads event id from the URL, example: /events/123 = eventId = 123
	const event = useLoaderData() as Event | undefined;

	//check if no event matches and show message
	if (!event) {
		return (
			<Box sx={{ ml: "22vw", p: 4 }}>
				<Typography variant="h4">
					Event not found hejn  jejejej
				</Typography>
			</Box>
		)
	}

	return (
		// main container for event details    
		<Box
			sx={{
				ml: "22vw",
				p: 4,
				maxWidth: 700,
			}}
		>
			{/*Card containing event information*/}
			<Card elevation={3}>
				{/*Main content inside card*/}
				<CardContent>
					<Stack spacing={2}>
						{/*text for each event: title, date, time, location, description*/}
						<Typography variant="h4" component="h1">
							{event.title}
						</Typography>

						<Typography>
							<strong>Date:</strong>  {event.date}
						</Typography>

						<Typography>
							<strong>Time:</strong>       {event.startTime} - {event.endTime}
						</Typography>

						<Typography>
							<strong>Location:</strong>       {event.location}
						</Typography>

						<Typography>
							<strong>Description:</strong>       {event.description}
						</Typography>

						{/*Edit and delete buttons*/}
						<Stack direction="row" spacing={2}>
							<Button variant="contained">
								Edit
							</Button>

							<Button variant="outlined" color="error">
								Delete
							</Button>
						</Stack>
					</Stack>
				</CardContent>
			</Card>
		</Box>
	)
}
