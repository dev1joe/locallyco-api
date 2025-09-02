import { jsonb, pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import product from "./product.ts"

const product_sku = pgTable(
	"product_sku",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		product_id: integer().references(() => product.id),
		sku_code: varchar({ length: 256 }),
		attributes: jsonb(),
		quantity: integer(),
		price_cent: integer(),
		...timestamps
	},
);

export default product_sku;
