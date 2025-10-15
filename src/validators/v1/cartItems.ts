import { createSelectSchema, createInsertSchema, createUpdateSchema, BuildRefine, NoUnknownKeys } from "drizzle-zod";
import { z } from "zod"
import { schema } from "src/db/schema"

export const cartItemSelectSchema = createSelectSchema(schema.cartItem, {
	quantity: (columnSchema) => columnSchema.min(1).max(50)
});
export type CartItemSelectSchema = z.infer<typeof cartItemSelectSchema>;

export const cartItemInsertSchema = createInsertSchema(schema.cartItem, {
	quantity: (columnSchema) => columnSchema.min(1).max(50)
})
export type CartItemInsertSchema = z.infer<typeof cartItemInsertSchema>;

export const cartItemUpdateSchema = createUpdateSchema(schema.cartItem, {
	quantity: (columnSchema) => columnSchema.min(1).max(50)
})
export type CartItemUpdateSchema = z.infer<typeof cartItemUpdateSchema>;
