/// <reference types="vite/client" />

import React from "react";
import "../.css/calendar.css";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function Calendar() {
	function dateClicked(date: any) {
		console.log("Clicked: " + date.format("YYYY-MM-DD"));
	}
    

	return (
		<div className="calendar">
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateCalendar onChange={dateClicked} />
			</LocalizationProvider>
		</div>
	);
}