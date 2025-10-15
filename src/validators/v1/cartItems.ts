import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod"
import { schema } from "src/db/schema"

export const cartItemSelectSchema = createSelectSchema(schema.cartItems, {
	quantity: (columnSchema) => columnSchema.min(1).max(50)
});
export type CartItemSelectSchema = z.infer<typeof cartItemSelectSchema>;

export const cartItemInsertSchema = createInsertSchema(schema.cartItems, {
	quantity: (columnSchema) => columnSchema.min(1).max(50)
})
export type CartItemInsertSchema = z.infer<typeof cartItemInsertSchema>;

export const cartItemUpdateSchema = createUpdateSchema(schema.cartItems, {
	quantity: (columnSchema) => columnSchema.min(1).max(50)
})
export type CartItemUpdateSchema = z.infer<typeof cartItemUpdateSchema>;
