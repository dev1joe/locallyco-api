import config from "../../config/config.ts";
import schema from "./schema.ts";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

//TODO: Handle db init failure gracefully
function connectToDatabase(credentials: Object): NodePgDatabase<typeof schema> {
	const pool = new Pool(credentials);
	return drizzle(pool, {
		schema: schema,
		casing: "snake_case",
	});
}

let db: NodePgDatabase<typeof schema>;

try {
	db = connectToDatabase(config.db);
} catch (error) {
	console.error("Failed to init db with errors:", error);
	process.exit(1);
}

export default db;
