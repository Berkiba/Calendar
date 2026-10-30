import axios from "axios";

export interface CalendarSelectionResponse {
    selectedDate: string | null;
}

export async function getCalendarSelection(
    token: string
): Promise<CalendarSelectionResponse> {
    const response = await axios.get<CalendarSelectionResponse>(
        "/api/calendar-selection",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}

export async function saveCalendarSelection(
    selectedDate: string,
    token: string
): Promise<CalendarSelectionResponse> {
    const response = await axios.put<CalendarSelectionResponse>(
        "/api/calendar-selection",
        { selectedDate },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}