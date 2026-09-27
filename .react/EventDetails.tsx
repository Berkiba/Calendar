import{
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import {useParams} from "react-router-dom";

// Event details shows info about one event
export default function EventDetails(){
    // reads event id from the URL, example: /events/123 = eventId = 123
    const {eventId} = useParams();

    //temp mock data until backend is implemented
    const event = {
        id:              eventId ?? "1",
        title:           "Pool party",
        date:             "2026-09-28",
        startTime:       "10:00",
        endTime:         "11:00",
        location:        "Room E3333",
        description:     "Awesome pool party and it's gonna be really fun. Bring nachos."
    };

    return (
        <Box
            sx = {{
                ml:       "22vw",
                p:        4,
                maxWidth: 700,

            }}
        >
            <Card elevation= {3}>
                <CardContent>
                    <Stack spacing = {2}>
                        <Typography variant = "h4" component = "h1">
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

                        <Stack direction = "row" spacing = {2}>
                            <Button variant = "contained">
                                Edit
                            </Button>

                            <Button variant = "outlined" color="error">
                                Delete
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}
