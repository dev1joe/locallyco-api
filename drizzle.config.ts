import { defineConfig } from "drizzle-kit";
import config from "./config/config.ts";

export default defineConfig({
    dialect: 'mysql',
    schema: './db/models/**',
    dbCredentials: config.db,
    out: './db/migrations', // ./drizzle is the default location for migrations
    verbose: true,
    strict: true,

    migrations: {
        prefix: "timestamp",
        table: "__drizzle_migrations__",
        schema: "public",
    },
});
