
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { createEvent } from "../../model/service/EventService";

import{
    Alert,
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

// Event form which is responsible for creating and configuring an event
export default function EventForm(){

    //react router navigation
    const navigate = useNavigate();

    //state for each input field
    const [title, setTitle]             = useState("");
    const [date, setDate]               = useState("");
    const [startTime, setStartTime]     = useState("");
    const [endTime, setEndTime]         = useState("");
    const [location, setLocation]       = useState("");
    const [description, setDescription] = useState("");
    const [saving, setSaving]           = useState(false);
    const [error, setError]             = useState("");

    //called when user submits the form
    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ){
        //prevent browser from refreshing
        event.preventDefault();
        //clear previous error messages
        setError("");

        //check that end time is after start time
        if(startTime >= endTime){
            setError("End time must be after start time");
            return;
        }

        //disable submit button while saving
        setSaving(true);

        try{
            
            //send form data to backend
            const createdEvent = await createEvent({
                title: title.trim(),
                date,
                startTime,
                endTime,
                location: location.trim(),
                description: description.trim()
            });

            //use id returned by the backend
            navigate(`/events/${createdEvent.id}`);
        }
        catch(err){
            //use backend's error msg if available
            const message = 
                axios.isAxiosError(err) &&
                typeof err.response?.data?.error === "string" ?
                err.response.data.error :
                "Could not save event, check backend and MongoDB";
            
            setError(message);
        }
        finally{
            //re-enable button when request finishes
            setSaving(false);
        }
    }

    return(
        // main container for event form
        <Box
            sx={{
                ml:    "22vw",
                p:          4,
                maxWidth: 700,
            }}
        >
            {/*Card container around form*/}
            <Paper elevation={3} sx = {{ p: 4 }}>
                {/*Page title*/}
                <Typography variant="h4" component="h1" gutterBottom>
                    Create Event
                </Typography>
                {/*Form container*/}
                <Box component = "form" onSubmit={handleSubmit}>
                    <Stack spacing = {3}>
                        {/* Display an error if the backend rejects the event */}
                            {error &&(
                                <Alert severity="error">
                                    {error}
                                </Alert>
                            )}
                        {/*Each text field (event title, date, time, location, description)*/}
                        <TextField
                            label       = "Event title"
                            value       = {title}
                            onChange    = {(event) => setTitle(event.target.value)}
                            required
                            fullWidth
                        />

                        <TextField
                            label       = "Date"
                            type        = "date"
                            value       = {date}
                            onChange    = {(event) => setDate(event.target.value)}
                            required
                            fullWidth
                            slotProps = {{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />

                        <TextField
                            label       = "Start time"
                            type        = "time"
                            value       = {startTime}
                            onChange    = {(event) => setStartTime(event.target.value)}
                            required 
                            fullWidth
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />

                        <TextField
                            label       = "End time"
                            type        = "time"
                            value       = {endTime}
                            onChange    = {(event) => setEndTime(event.target.value)}
                            required 
                            fullWidth
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />

                        <TextField
                            label       = "Location"
                            value       = {location}
                            onChange    = {(event) => setLocation(event.target.value)}
                            fullWidth
                        />

                        <TextField
                            label       = "Description"
                            value       = {description}
                            onChange    = {(event) => setDescription(event.target.value)}
                            multiline
                            minRows     = {4}
                            fullWidth
                        />
                        {/*Submit button*/}
                        <Button
                            type        = "submit"
                            variant     = "contained"
                            size        = "large"
                            disabled    = {saving}
                        >
                            {saving ? "saving..." : "create event"}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    )

}