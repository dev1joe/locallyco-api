import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { products } from "./models/products";
import { productSkus } from "./models/productSkus";

export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;

export type ProductSku = InferSelectModel<typeof productSkus>;
export type NewProductSku = InferInsertModel<typeof productSkus>;