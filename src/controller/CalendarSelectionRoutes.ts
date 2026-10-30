import { Router } from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../model/repository/MongoDB.ts";
import { isValidCalendarDate } from "../model/service/CalendarSelectionValidation.ts";

const router = Router();

type CalendarSelectionRecord = {
    email: string;
    selectedDate: string;
    updatedAt: Date;
};

function getAuthenticatedEmail(req: Request, res: Response): string | null {
    const authorization = req.headers.authorization;
    const match = typeof authorization === "string"
        ? /^Bearer\s+(.+)$/i.exec(authorization)
        : null;

    if (!match || !match[1]) {
        res.status(401).json({ error: "Login required" });
        return null;
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not configured");
        }

        const payload = jwt.verify(match[1], secret, { algorithms: ["HS256"] });
        if (typeof payload === "string" || typeof payload.sub !== "string" || !payload.sub) {
            throw new Error("Token does not contain an account subject");
        }

        return payload.sub;
    } catch {
        res.status(401).json({ error: "Invalid or expired session" });
        return null;
    }
}

router.get("/", async (req, res) => {
    const email = getAuthenticatedEmail(req, res);
    if (email === null) {
        console.warn("[Calendar] Saved date request rejected: user is not authenticated.");
        return;
    }

    try {
        if (!db) {
            throw new Error("MongoDB connection unavailable");
        }

        const selection = await db.collection<CalendarSelectionRecord>("CalendarSelections").findOne(
            { email },
            { projection: { _id: 0, selectedDate: 1 } },
        );
        const selectedDate = selection?.selectedDate ?? null;
        console.log(`[Calendar] Loaded saved date for ${email}: ${selectedDate ?? "none"}`);
        res.json({ selectedDate });
    } catch (error) {
        console.error("[Calendar] Failed to load saved date:", error);
        res.status(500).json({ error: "Could not load the saved calendar date" });
    }
});

router.put("/", async (req, res) => {
    const email = getAuthenticatedEmail(req, res);
    if (email === null) {
        console.warn("[Calendar] Save rejected: user is not authenticated.");
        return;
    }

    const selectedDate: unknown = req.body?.selectedDate;
    if (!isValidCalendarDate(selectedDate)) {
        res.status(400).json({ error: "A valid selectedDate in YYYY-MM-DD format is required" });
        console.warn("[Calendar] Save rejected: invalid date.");
        return;
    }

    try {
        if (!db) {
            throw new Error("MongoDB connection unavailable");
        }

        await db.collection<CalendarSelectionRecord>("CalendarSelections").updateOne(
            { email },
            { $set: { selectedDate, updatedAt: new Date() } },
            { upsert: true },
        );
        console.log(`[Calendar] Saved date for ${email}: ${selectedDate}`);
        res.json({ selectedDate });
    } catch (error) {
        console.error("[Calendar] Failed to save selected date:", error);
        res.status(500).json({ error: "Could not save the selected calendar date" });
    }
});

export default router;