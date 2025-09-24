/**
 * drizzle.config.ts
 * A configuration file for Drizzle-Kit
 * exports a configuration object via defineConfig() that drizzle-kit CLI reads
 * @see {@link https://orm.drizzle.team/docs/kit-overview|Drizzle}
 */

import { defineConfig } from "drizzle-kit";
import config from "./config/config.ts";

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/db/models/**',
	out: './src/db/migrations',
	verbose: true,
	strict: true,

	dbCredentials: config.db,

	migrations: {
		prefix: "timestamp",
		table: "__drizzle_migrations__",
		schema: "public",
	},
});
