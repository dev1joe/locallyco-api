import { pgTable } from "drizzle-orm/pg-core";
import { integer, varchar } from "drizzle-orm/pg-core";
import timestamps from "../common/columns/timestamps.ts";

import productSku from "./product_sku.ts"

const productImage = pgTable("product_image", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	productSkuId: integer("product_sku_id").references(() => productSku.id),
	image: varchar({ length: 256 }),
	...timestamps
});

export default productImage;