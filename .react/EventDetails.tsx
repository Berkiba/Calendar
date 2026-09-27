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
    const events = [
    {
        id:              "1",
        title:           "Pool party",
        date:             "2026-09-28",
        startTime:       "10:00",
        endTime:         "11:00",
        location:        "Room E3333",
        description:     "Awesome pool party and it's gonna be really fun. Bring nachos."
    },
    {
        id:              "2",
        title:           "Dinosaur documentary",
        date:             "2026-09-29",
        startTime:       "08:00",
        endTime:         "20:00",
        location:        "Room E4444",
        description:     "Dinosaur documentary binge. It's gonna be totally radical. I love dinosaurs."
    },
    {
        id:              "3",
        title:           "Motorcycle day",
        date:             "2026-09-30",
        startTime:       "15:00",
        endTime:         "15:30",
        location:        "Room E5555",
        description:     "Ride motorcycles and do awesome and cool stuff with motorcycles."
    }
];

//find event that matches id from URL
const event = events.find((event) => event.id === eventId);

//check if no event matches and show message
if(!event){

    return(
        <Box sx={{ ml: "22vw", p: 4}}>
            <Typography variant = "h4">
                Event not found
            </Typography>
        </Box>
    )
}

return (
    // main container for event details    
    <Box
        sx = {{
            ml:       "22vw",
            p:        4,
            maxWidth: 700,
        }}
    >
        {/*Card containing event information*/}
        <Card elevation= {3}>
            {/*Main content inside card*/}
            <CardContent>
                <Stack spacing = {2}>
                    {/*text for each event: title, date, time, location, description*/}
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

                    {/*Edit and delete buttons*/}
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
