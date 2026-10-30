import type { Event } from "../interface/Event.ts";

/** Send an event-creation confirmation through Resend. */
export async function sendEventCreatedEmail(to: string, event: Event): Promise<void> {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;

    if (!apiKey) throw new Error("RESEND_API_KEY is missing.");
    if (!from) throw new Error("RESEND_FROM_EMAIL is missing.");

    const text = [
        "Your event has been created successfully.",
        "",
        `Title: ${event.title}`,
        `Date: ${event.date}`,
        `Time: ${event.startTime} - ${event.endTime}`,
        `Location: ${event.location || "Not specified"}`,
        `Description: ${event.description || "No description"}`,
        "",
        "This is an automatic confirmation from the calendar application.",
    ].join("\n");

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from,
            to: [to],
            subject: `Event created: ${event.title}`,
            text,
        }),
    });

    const responseBody = await response.text();
    if (!response.ok) {
        throw new Error(`Resend request failed (${response.status}): ${responseBody}`);
    }

    console.log("[Email] Event confirmation sent successfully.");
}