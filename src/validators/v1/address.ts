import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod"
import xss from "xss";

import { schema } from "@src/db/schema";

export const addressSelectSchema = createSelectSchema(schema.address, {
	country: (columnSchema) => columnSchema.transform((item) => xss(item)),
	governorate: (columnSchema) => columnSchema.transform((item) => xss(item)),
	district: (columnSchema) => columnSchema.transform((item) => xss(item)),
	street: (columnSchema) => columnSchema.transform((item) => xss(item)),
	building: (columnSchema) => columnSchema.transform((item) => xss(item)),
});
export type addressSelectSchema = z.infer<typeof addressSelectSchema>;

export const addressInsertSchema = createInsertSchema(schema.address, {
	country: (columnSchema) => columnSchema.transform((item) => xss(item)),
	governorate: (columnSchema) => columnSchema.transform((item) => xss(item)),
	district: (columnSchema) => columnSchema.transform((item) => xss(item)),
	street: (columnSchema) => columnSchema.transform((item) => xss(item)),
	building: (columnSchema) => columnSchema.transform((item) => xss(item)),
});
export type addressInsertSchema = z.infer<typeof addressInsertSchema>;

export const addressUpdateSchema = createUpdateSchema(schema.address, {
	country: (columnSchema) => columnSchema.transform((item) => xss(item)),
	governorate: (columnSchema) => columnSchema.transform((item) => xss(item)),
	district: (columnSchema) => columnSchema.transform((item) => xss(item)),
	street: (columnSchema) => columnSchema.transform((item) => xss(item)),
	building: (columnSchema) => columnSchema.transform((item) => xss(item)),
});
export type addressUpdateSchema = z.infer<typeof addressUpdateSchema>;
