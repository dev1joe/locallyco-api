import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod"
import { schema } from "src/db/schema"

export const cartItemSelectSchema = createSelectSchema(schema.cartItem);
export type CartItemSelectSchema = z.infer<typeof cartItemSelectSchema>;

export const cartItemInsertSchema = createInsertSchema(schema.cartItem)
export type CartItemInsertSchema = z.infer<typeof cartItemInsertSchema>;

export const cartItemUpdateSchema = createUpdateSchema(schema.cartItem)
export type CartItemUpdateSchema = z.infer<typeof cartItemUpdateSchema>;
