import { reset, seed } from "drizzle-seed"
import db from "./db.ts"
import { schema } from "./schema.ts"

async function main() {

	await reset(db, schema);

	await seed(db, schema, { seed: 123 }).refine((funcs) => ({
		cartItems: {
			columns: {
				quantity: funcs.int({ minValue: 1, maxValue: 50, isUnique: false })
			}
		}
	}));

}

main();
