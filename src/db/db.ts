import { config } from "../../config/config.ts";
import { schema } from "./schema.ts";
import * as relations from "./relations"
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

const schema_relations = { ...schema, ...relations }

function connectToDatabase(credentials: Object): NodePgDatabase<typeof schema_relations> {
	const pool = new Pool(credentials);
	return drizzle(pool, {
		schema: schema_relations,
		casing: "snake_case",
	});
}

let db: NodePgDatabase<typeof schema_relations>;

try {
	db = connectToDatabase(config.db);
} catch (error) {
	console.error("Failed to init db with errors:", error);
	process.exit(1);
}

export default db;
