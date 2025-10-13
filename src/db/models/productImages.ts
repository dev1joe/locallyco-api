import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../common/columns/timestamps.ts";

import { productSkus } from "./productSkus.ts"

export const productImages = pgTable("product_images", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	productSkuId: integer().references(() => productSkus.id),
	image: varchar({ length: 256 }),
	...timestamps
});
