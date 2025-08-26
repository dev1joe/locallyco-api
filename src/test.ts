/**
 * How to run:
 * `ts-node test.ts`
 */

import "dotenv/config.js"; // Load environment variables from .env file
import config from '../config/config.ts'; // Adjust the path to your config file
import connectToDB from '../db/db.ts'; // Adjust the path to your database connection file

// import entities
import categories from '../db/models/category.model.ts';

// Connect to the database
//console.log(config.db);
const db = await connectToDB(config.db);

if(! db) {
    console.error("Failed to connect to the database. Seeding aborted.");
    process.exit(1);
}


const res = await db.select({ id: categories.id }).from(categories)
const categoriesIds = res.map(c => c.id);
console.log(`Categories IDs: ${categoriesIds}`);

process.exit(0);