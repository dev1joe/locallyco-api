import { defineConfig } from "drizzle-kit";
import config from "./config/config.ts";

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/db/models/**',
	out: './src/db/migrations', // ./drizzle is the default location for migrations
	verbose: true,
	strict: true,

	dbCredentials: config.db,

	migrations: {
		prefix: "timestamp",
		table: "__drizzle_migrations__",
		schema: "public",
	},
});
