import { config } from "../../config/config.ts";
import { schema } from "./schema.ts";
import * as relations from "./relations.ts"
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { Pool } from "pg"

const schema_relations = { ...schema, ...relations };
export type DB = ReturnType<typeof drizzle<typeof schema_relations>>;
let db: DB | null = null;

function getDB(credentials: string) {
    if (!db) {
        const sql = neon(credentials);
        db = drizzle(sql, {
            schema: schema_relations,
            casing: "snake_case",
        });
    }
    return db;
}

export default getDB(config.db.url);