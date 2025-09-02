/**
 * @file seed.ts
 * @description This script seeds the database with initial data using Drizzle ORM.
 *
 * Requirements:
 * - Drizzle ORM and Drizzle Kit configured.
 * - `ts-node` and `@faker-js/faker` installed.
 *
 * How to run:
 * `ts-node seed.ts`
 */

import "dotenv/config.js"; // Load environment variables from .env file
import config from '../../config/config.ts'; // Adjust the path to your config file
import db from './db.ts'; // Adjust the path to your database connection file
import { faker } from '@faker-js/faker';

// import entities
import schema from "./schema.ts"
import products from './models/product.ts';
import categories from './models/category.ts';
import brands from './models/brand.ts';
import { NodePgDatabase } from "drizzle-orm/node-postgres";

/**
 * Main seeding function.
 * It's wrapped in a self-executing async function for easy execution.
 */
async function seed(database: NodePgDatabase<typeof schema>, reset: boolean = true, count: number = 5) { // TODO: specify type
	try {
		console.log('🌱 Starting database seeding...');

		// Use a transaction to ensure atomicity. If any part of the seeding fails,
		// the entire operation will be rolled back.
		await database.transaction(async (tx) => {
			// 1. Clear existing data to prevent duplicates on successive runs.
			// This is a common practice for seeders.

			if (reset) {
				console.log('🗑️  Deleting existing data...');
				await tx.delete(products);
				await tx.delete(categories);
				await tx.delete(brands);
			}

			// 2. Generate and insert categories.
			console.log(`👨‍👩‍👧‍👦 Creating ${count} categories...`);
			const categoriesToInsert: Array<Object> = [];
			for (let i = 0; i < count; i++) {
				categoriesToInsert.push({
					name: faker.string.alpha({ length: { min: 5, max: 15 } })
				});
			}
			await tx.insert(categories).values(categoriesToInsert);

			// 3. Generate and insert brands.
			console.log(`👨‍👩‍👧‍👦 Creating ${count} brands...`);
			const brandsToInsert: Array<Object> = [];
			for (let i = 0; i < count; i++) {
				brandsToInsert.push({
					name: faker.company.name,
					desc: faker.string.alpha({ length: { min: 40, max: 100 } })
				});
			}
			await tx.insert(brands).values(brandsToInsert);


			// 4. Generate and insert products, each linked to a random category and brand.

			const insertedCategories = await tx.select({ id: categories.id }).from(categories);
			const catIds = insertedCategories.map(c => c.id);

			const insertedBrands = await tx.select({ id: brands.id }).from(brands);
			const brandIds = insertedBrands.map(b => b.id);

			console.log(`📝 Creating ${(count + 10)} products for each user...`);
			const productsToInsert: Array<Object> = [];
			for (let i = 0; i < (count + 10); i++) {

				const randCategory = (catIds) ? catIds[Math.floor(Math.random() * catIds.length)] : null;
				const randBrand = (brandIds) ? brandIds[Math.floor(Math.random() * brandIds.length)] : null;

				productsToInsert.push({
					name: faker.commerce.productName(),
					desc: faker.lorem.paragraph({ min: 2, max: 6 }),
					category_id: randCategory,
					brand_id: randBrand,
				});
			}
			await tx.insert(products).values(productsToInsert);
		});

		console.log('✅ Database seeding completed successfully!');
		process.exit(0); // Exit the process with success code
	} catch (error) {
		console.error('❌ Database seeding failed:', error);
		process.exit(1); // Exit with an error code
	}
}

// Execute the seeding function
seed(db); // TODO: use cli parameters, delete existing data or not ?
