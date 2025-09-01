import config from "../../config/config.ts";
import schema from "./schema.ts";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

//TODO: Handle db init failure gracefully
function connectToDatabase(credentials: Object): NodePgDatabase<typeof schema> | null {
	try {
		const pool = new Pool(credentials);
		return drizzle(pool, { schema });
	} catch (error) {
		console.error("Failed to init db with errors:", error);
		return null
	}
}

const db = connectToDatabase(config.db);

// If db didn't init successfully
if (db === null) {
	process.exit(1);
}
export default db;
