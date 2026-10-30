import {
	Box,
	Button,
	Card,
	CardContent,
	Stack,
	Typography,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Alert,
	Snackbar
} from "@mui/material";
import { useLocation, useLoaderData, useNavigate} from "react-router-dom";
import { Event } from "../../model/interface/Event";
import { useContext, useState } from "react";
import axios from "axios";
import { deleteEvent } from "../../model/service/EventService";
import { AccountContext } from "../../controller/AccountManager";

// Event details shows info about one event
export default function EventDetails() {
	// reads event id from the URL, example: /events/123 = eventId = 123
	const event    = useLoaderData() as Event | undefined;
	//navigate to edit page for this event
	const navigate = useNavigate();
	//retrieve logged in account from shared context
	const accountContext = useContext(AccountContext);
	//only admins can edit or delete events
	const isAdmin = accountContext?.account?.Role === "admin";
	//retrieve success notification passed from EventForm
	const location = useLocation();
	//show notification when arriving after create or edit
	const notification = ( location.state as { notification?: string } | null)?.notification;
	const [notificationOpen, setNotificationOpen] = useState(Boolean(notification));
	//state for delete confirmation dialog
	const [deleteOpen, setDeleteOpen] 	= useState(false);
	const [deleting, setDeleting]	  	= useState(false);
	const [deleteError, setDeleteError] = useState("");

	//open form to edit existing event
	function handleEdit(){
		if(!event){
			return;
		}

		navigate(`/events/${event.id}/edit`);
	}

	//check if no event matches and show message
	if (!event) {
		return (
			<Box sx={{ ml: "22vw", p: 4 }}>
				<Typography variant="h4">
					Event not found
				</Typography>
			</Box>
		)
	}

	//delete event only after user confirms
	async function handleDelete(){

		if(!event){
			return;
		}
		//retreive authentication token from logged in account
		const token = accountContext?.account?.Token;

		//prevent deletion if user is not logged in
		if(!token){
			setDeleteError("you must be logged in to delete events");
			return;
		}

		setDeleting(true);
		setDeleteError("");

		try{
			//remove event from mongodb through backend
			await deleteEvent(event.id, token);

			//return to home page after successful deletion
			navigate("/", {state: { notification: "event deleted successfully"}});
		}
		catch(err){
			//display backend error if delete fails
			const message =
				axios.isAxiosError(err) &&
				typeof err.response?.data?.error === "string" ?
				err.response.data.error :
				"could not delete event";

			setDeleteError(message);
		}
		finally{
			setDeleting(false);
		}
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

						{/*Edit and delete buttons (only admins can see these and use them)*/}
						{isAdmin && (
						<Stack direction="row" spacing={2}>
							<Button variant="contained" onClick={handleEdit}>
								Edit
							</Button>

							<Button variant="outlined" color="error" onClick={() => setDeleteOpen(true)}>
								Delete
							</Button>
						</Stack>
						)}
					</Stack>
				</CardContent>
			</Card>
			{/*confirmation dialog before deleting event*/}
			<Dialog 
				open={deleteOpen} 
				onClose={() => {
					if(!deleting){
						setDeleteOpen(false);
						setDeleteError("");
					}
				}}>

				<DialogTitle>
					Delete Event?
				</DialogTitle>

				<DialogContent>
					<DialogContentText>
						are you sure you wanna delete this?
					</DialogContentText>

					{/*display error if deletion fails*/}
					{deleteError && (
						<Typography color = "error" sx={{ mt: 2 }}>
							{deleteError}
						</Typography>
					)}
				</DialogContent>
				
				<DialogActions>
					<Button onClick={() => setDeleteOpen(false)} disabled={deleting}>
						Cancel
					</Button>
					<Button 
						color 	 = "error"
						variant  = "contained"
						onClick  = {handleDelete}
						disabled = {deleting}
						>
							{deleting ? "Deleting..." : "Delete"}
					</Button>
				</DialogActions>
			</Dialog>
			
			{/*show success notification after creating or updating event*/}
			<Snackbar
				open			 = {notificationOpen}
				autoHideDuration = {4000}
				onClose			 = {() => setNotificationOpen(false)}
				anchorOrigin	 = {{ vertical: "bottom", horizontal: "center" }}
				>
					<Alert
						severity	= "success"
						variant		= "filled"
						onClose  	= {() => setNotificationOpen(false)}
						>
						{notification}
					</Alert>
				</Snackbar>
		</Box>
	)
}
