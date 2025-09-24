import { jsonb, pgTable, integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import product from "./product.ts"

const productSku = pgTable("product_sku", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	productId: integer("product_id").references(() => product.id),
	skuCode: varchar("sku_code", { length: 256 }),
	attributes: jsonb(),
	quantity: integer(),
	priceCent: integer("price_cent"),
	...timestamps,

	// New Columns
	images: varchar().array()
});

export default productSku;