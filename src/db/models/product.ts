import { pgTable as table } from "drizzle-orm/pg-core";
import { integer, varchar, jsonb } from "drizzle-orm/pg-core";

import category from "./category.ts";
import brands from "./brand.ts";
import timestamps from "../common/columns/timestamps.ts";

const products = table("products", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	categoryId: integer("category_id").references(() => category.id, { onDelete: "cascade" }), // TODO: what to do on update ??
	brandId: integer("brand_id").references(() => brands.id, { onDelete: "cascade" }),
	name: varchar({ length: 256 }),
	description: varchar({ length: 1000 }),
	...timestamps,

	// New Columns
	versioning: jsonb(),
	imageUrl: varchar("image_url", { length: 256 }),
});

export default products;