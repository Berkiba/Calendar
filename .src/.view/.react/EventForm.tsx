
import React, { useState } from "react";

import{

    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

// Event form which is responsible for creating and configuring an event
export default function EventForm(){
    //state for each input field
    const [title, setTitle]             = useState("");
    const [date, setDate]               = useState("");
    const [startTime, setStartTime]     = useState("");
    const [endTime, setEndTime]         = useState("");
    const [location, setLocation]       = useState("");
    const [description, setDescription] = useState("");

    //Runs when user submits form, preventDefault() stops browser from refreshing the page
    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault();

        //create one event object
        const newEvent = {
            title,
            date,
            startTime,
            endTime,
            location,
            description
        }

        //temp behavior until backend is implemented
        console.log("Created event:", newEvent);
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
                        >
                            Create Event
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    )

}