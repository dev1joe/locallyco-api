import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod"
import { schema } from "src/db/schema"
import xss from "xss";

//: (columnSchema) => columnSchema.transform((item) => xss(item)),

export const productsSelectSchema = createSelectSchema(schema.products, {
	name: (columnSchema) => columnSchema.transform((item) => xss(item)),
	description: (columnSchema) => columnSchema.transform((item) => xss(item)),
	imageUrl: (columnSchema) => columnSchema.transform((item) => xss(item)),
});
export type ProductsSelectSchema = z.infer<typeof productsSelectSchema>;

export const productsInsertSchema = createInsertSchema(schema.products, {
	name: (columnSchema) => columnSchema.transform((item) => xss(item)),
	description: (columnSchema) => columnSchema.transform((item) => xss(item)),
	imageUrl: (columnSchema) => columnSchema.transform((item) => xss(item)),
})
export type ProductsInsertSchema = z.infer<typeof productsInsertSchema>;

export const productsUpdateSchema = createUpdateSchema(schema.products, {
	name: (columnSchema) => columnSchema.transform((item) => xss(item)),
	description: (columnSchema) => columnSchema.transform((item) => xss(item)),
	imageUrl: (columnSchema) => columnSchema.transform((item) => xss(item)),
})
export type ProductsUpdateSchema = z.infer<typeof productsUpdateSchema>;
