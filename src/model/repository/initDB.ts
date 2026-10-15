
import db, { disconnectFromMongoDB } from "./MongoDB.ts";

async function initializeDatabase(): Promise<void> {
    if (!db) {
        throw new Error("MongoDB connection unavailable");
    }

    const events = db.collection("Events");
  
    await events.createIndex(
        { id: 1 },
        { unique: true, name: "unique_event_id" }
    );

  
    await events.createIndex(
        { date: 1, startTime: 1 },
        { name: "events_by_date_and_start_time" }
    );


    const data = db.collection("Data");

    await data.updateOne(
        { name: "visit_count" },
        { $setOnInsert: { value: 0 } },
        { upsert: true }
    );

    console.log("Database initialization completed.");
}

try {
    await initializeDatabase();
} catch (error) {
    console.error("Database initialization failed:", error);
    process.exitCode = 1;
} finally {
    await disconnectFromMongoDB();
}
