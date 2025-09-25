import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod"
import xss from "xss";

import { brands } from "src/db/models/brands.ts"


export const brandSelectSchema = createSelectSchema(brands, {
	name: (schema) => schema.transform((item) => xss(item)),
	description: (schema) => schema.transform((item) => xss(item)),
});
export type BrandSelectSchema = z.infer<typeof brandSelectSchema>;

export const brandInsertSchema = createInsertSchema(brands, {
	name: (schema) => schema.transform((item) => xss(item)),
	description: (schema) => schema.transform((item) => xss(item)),
});
export type BrandInsertSchema = z.infer<typeof brandInsertSchema>;

export const brandUpdateSchema = createUpdateSchema(brands, {
	name: (schema) => schema.transform((item) => xss(item)),
	description: (schema) => schema.transform((item) => xss(item)),
});
export type BrandUpdateSchema = z.infer<typeof brandUpdateSchema>;
