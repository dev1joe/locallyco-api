import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import product_sku from "./product_sku.ts"

const product_image = pgTable(
	"product_image",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		product_sku_id: integer().references(() => product_sku.id),
		image: varchar({ length: 256 }),
		...timestamps
	},
);

export default product_image;
