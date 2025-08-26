import mysql from "mysql2/promise";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import schema from "./schema.ts";

export default async function connectToDatabase(credentials: Object): Promise<MySql2Database<Record<string, never>> | null> {
    try {
        const connection = await mysql.createConnection(credentials);
        console.log("Database connection established, returning drizzle instance..."); 
        
        return drizzle(connection);

    } catch (error) {
        console.error("Error connecting to the database:", error);
        return null;
    }
}

// const db = await connectToDatabase(config.db);
// export default db;