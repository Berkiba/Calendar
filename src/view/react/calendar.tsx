/// <reference types="vite/client" />

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import dayjs, { type Dayjs } from "dayjs";
import { Link } from "react-router-dom";
import "../css/calendar.css";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AccountContext } from "../../controller/AccountManager.ts";
import type { Event as CalendarEvent } from "../../model/interface/Event";
import { getEvents } from "../../model/service/EventService";
import {
    getCalendarSelection,
    saveCalendarSelection,
} from "../../model/service/CalendarSelectionService";

import {
    isValidCalendarDate,
} from "../../model/service/CalendarSelectionValidation";

export default function Calendar() {
	const accountContext = useContext(AccountContext);
	const account = accountContext?.account ?? null;
	const setAccount = accountContext?.setAccount;
	const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
	const [status, setStatus] = useState("");
	const [events, setEvents] = useState<CalendarEvent[]>([]);
	const [eventsLoading, setEventsLoading] = useState(true);
	const [eventsError, setEventsError] = useState("");
	const userActionVersion = useRef(0);

	function dateClicked(date: Dayjs | null) {
		if (!date || !date.isValid()) {
			console.warn("[Calendar] Ignored an invalid date selection.");
			setStatus("That date is invalid.");
			return;
		}

		setSelectedDate(date);
		userActionVersion.current += 1;
		const dateValue = date.format("YYYY-MM-DD");
		console.log("[Calendar] Date selected:", dateValue);
		setStatus("");

		if (!account || !account.Token) {
			console.warn("[Calendar] Date was not saved: no user is logged in.");
			setStatus("Log in to save your selected date. Events can still be viewed.");
			return;
		}

		const token = account.Token;
		void saveCalendarSelection(dateValue, token)
			.then((result) => {
				console.log("[Calendar] Date saved to database:", result.selectedDate);
				setStatus(`Saved ${dateValue} to your calendar.`);
			})
			.catch((error: unknown) => {
				if (axios.isAxiosError(error) && error.response?.status === 401) {
					setAccount?.(null);
					console.warn("[Calendar] Save rejected: session token is invalid or expired.");
					setStatus("Your session has expired. Please log in again. The date was not saved.");
					return;
				}

				console.error("[Calendar] Could not save selected date:", error);
				setStatus("Could not save the date. Check the server and database connection.");
			});
	}

	useEffect(() => {
		let cancelled = false;

		async function loadEvents() {
			setEventsLoading(true);
			setEventsError("");
			try {
				const loadedEvents = await getEvents();
				if (cancelled) return;
				setEvents(loadedEvents);
				console.log("[Calendar] Loaded events:", loadedEvents.length);
			} catch (error) {
				if (cancelled) return;
				console.error("[Calendar] Could not load events:", error);
				setEventsError("Could not load events. Check the server and database connection.");
			} finally {
				if (!cancelled) setEventsLoading(false);
			}
		}

		void loadEvents();
		return () => {
			cancelled = true;
		};
	}, []);

	useEffect(() => {
		if (!account?.Token) return;

		let cancelled = false;
		const actionVersionAtStart = userActionVersion.current;
		const token = account.Token;

		async function loadSavedDate() {
			try {
				const result = await getCalendarSelection(token);
				if (
					!cancelled
					&& actionVersionAtStart === userActionVersion.current
					&& result.selectedDate
					&& isValidCalendarDate(result.selectedDate)
				) {
					setSelectedDate(dayjs(result.selectedDate));
					console.log("[Calendar] Loaded saved date from database:", result.selectedDate);
				}
			} catch (error) {
				if (cancelled) return;
				if (axios.isAxiosError(error) && error.response?.status === 401) {
					setAccount?.(null);
					console.warn("[Calendar] Saved-date request rejected: session token is invalid or expired.");
					setStatus("Your session has expired. Please log in again.");
					return;
				}
				console.error("[Calendar] Could not load saved date:", error);
			}
		}

		void loadSavedDate();
		return () => {
			cancelled = true;
		};
	}, [account, setAccount]);

	const selectedDateValue = selectedDate?.format("YYYY-MM-DD") ?? "";
	const eventsForSelectedDate = useMemo(
		() => events.filter((event) => event.date === selectedDateValue),
		[events, selectedDateValue],
	);

	return (
		<div className="calendar">
			<div className="calendar-content">
				<section className="calendar-picker" aria-label="Calendar date picker">
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateCalendar value={selectedDate} onChange={dateClicked} />
					</LocalizationProvider>
					<p role="status" aria-live="polite">{status}</p>
				</section>

				<section className="calendar-events" aria-labelledby="calendar-events-heading">
					<h2 id="calendar-events-heading">Events</h2>
					<p>Events for {selectedDateValue || "the selected date"}</p>

					{eventsLoading && <p role="status">Loading events…</p>}
					{!eventsLoading && eventsError && <p className="calendar-error" role="alert">{eventsError}</p>}
					{!eventsLoading && !eventsError && eventsForSelectedDate.length === 0 && (
						<p>No events on this date.</p>
					)}
					{!eventsLoading && !eventsError && eventsForSelectedDate.length > 0 && (
						<ul className="calendar-event-list">
							{eventsForSelectedDate.map((event) => (
								<li key={event.id} className="calendar-event">
									<Link to={`/events/${encodeURIComponent(event.id)}`} className="calendar-event-title">
										{event.title}
									</Link>
									<span className="calendar-event-time">{event.startTime}–{event.endTime}</span>
									{event.location && <span>{event.location}</span>}
									{event.description && <p>{event.description}</p>}
								</li>
							))}
						</ul>
					)}

					<h3>All events</h3>
					{!eventsLoading && !eventsError && events.length === 0 && <p>No events have been created yet.</p>}
					{!eventsLoading && !eventsError && events.length > 0 && (
						<ul className="calendar-event-list">
							{events.map((event) => (
								<li key={event.id} className="calendar-event">
									<Link to={`/events/${encodeURIComponent(event.id)}`} className="calendar-event-title">
										{event.title}
									</Link>
									<span className="calendar-event-date-time">{event.date} · {event.startTime}–{event.endTime}</span>
									{event.location && <span>{event.location}</span>}
								</li>
							))}
						</ul>
					)}
				</section>
			</div>
		</div>
	);
}