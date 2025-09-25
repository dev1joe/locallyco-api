import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod"
import xss from "xss";

import brand from "src/db/models/brand.ts"


export const brandSelectSchema = createSelectSchema(brand, {
	name: (schema) => schema.transform((item) => xss(item)),
	description: (schema) => schema.transform((item) => xss(item)),
});
export type BrandSelectSchema = z.infer<typeof brandSelectSchema>;

export const brandInsertSchema = createInsertSchema(brand, {
	name: (schema) => schema.transform((item) => xss(item)),
	description: (schema) => schema.transform((item) => xss(item)),
});
export type BrandInsertSchema = z.infer<typeof brandInsertSchema>;

export const brandUpdateSchema = createUpdateSchema(brand, {
	name: (schema) => schema.transform((item) => xss(item)),
	description: (schema) => schema.transform((item) => xss(item)),
});
export type BrandUpdateSchema = z.infer<typeof brandUpdateSchema>;
