import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod"
import { schema } from "src/db/schema"
import xss from "xss";

//: (columnSchema) => columnSchema.transform((item) => xss(item)),

export const cartSelectSchema = createSelectSchema(schema.carts, {
	name: (columnSchema) => columnSchema.transform((item) => xss(item)),
});
export type CartSelectSchema = z.infer<typeof cartSelectSchema>;

export const cartInsertSchema = createInsertSchema(schema.carts, {
	name: (columnSchema) => columnSchema.transform((item) => xss(item)),
})
export type CartInsertSchema = z.infer<typeof cartInsertSchema>;

export const cartUpdateSchema = createUpdateSchema(schema.carts, {
	name: (columnSchema) => columnSchema.transform((item) => xss(item)),
})
export type CartUpdateSchema = z.infer<typeof cartUpdateSchema>;
