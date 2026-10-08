import { MongoClient } from 'mongodb';
const client = new MongoClient(`${process.env.db_url}`);
export const db = (await connectToMongoDB())?.db(`${process.env.db_database}`);
export default db;

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// copy from mongodb.
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
export async function connectToMongoDB() {
	try {
		await client.connect();
		console.log("You successfully connected to MongoDB!");
		return client;
	} catch (err) {
		console.dir(err);
	}
}
// Call this only when your application terminates
export async function disconnectFromMongoDB() {
	await client.close();
}

process.on("SIGINT", async () => {
	await disconnectFromMongoDB();
	process.exit(0);
});

process.on("SIGTERM", async () => {
	await disconnectFromMongoDB();
	process.exit(0);
});