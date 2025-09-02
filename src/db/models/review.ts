import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import product from "./product.ts"

// TODO: add user and link it with review table

const review = pgTable(
	"review",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		product_id: integer().references(() => product.id),
		// user_id: integer().references(() =>),
		rate: integer(),
		comment: varchar({ length: 1000 }),
		...timestamps
	},
);

export default review;
