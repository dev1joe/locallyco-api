/**
 * How to run:
 * `ts-node test.ts`
 */

import "dotenv/config.js"; // Load environment variables from .env file
import { config } from '../config/config.ts'; // Adjust the path to your config file
import db from './db/db.ts'; // Adjust the path to your database connection file

// import entities
import categories from './db/models/category.ts';

const res = await db.select({ id: categories.id }).from(categories)
const categoriesIds = res.map(c => c.id);
console.log(`Categories IDs: ${categoriesIds}`);

// NOTE: implement routes to test endpoints

// import { user } from "./db/models/auth-schema.ts"
// app.get("/test/api/users", async (req, res) => {
// 	const users = await db.select().from(user);
//
// 	res.json(users);
// });

process.exit(0);
