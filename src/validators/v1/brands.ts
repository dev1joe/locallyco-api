import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod"
import xss from "xss";

import { schema } from "@src/db/schema";

export const brandSelectSchema = createSelectSchema(schema.brands, {
	name: (columnSchema) => columnSchema.transform((item) => xss(item)),
	description: (columnSchema) => columnSchema.transform((item) => xss(item)),
});
export type BrandSelectSchema = z.infer<typeof brandSelectSchema>;

export const brandInsertSchema = createInsertSchema(schema.brands, {
	name: (columnSchema) => columnSchema.transform((item) => xss(item)),
	description: (columnSchema) => columnSchema.transform((item) => xss(item)),
});
export type BrandInsertSchema = z.infer<typeof brandInsertSchema>;

export const brandUpdateSchema = createUpdateSchema(schema.brands, {
	name: (columnSchema) => columnSchema.transform((item) => xss(item)),
	description: (columnSchema) => columnSchema.transform((item) => xss(item)),
});
export type BrandUpdateSchema = z.infer<typeof brandUpdateSchema>;
