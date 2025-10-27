import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { products } from "./models/products";
import { productSkus } from "./models/productSkus";
import { brands } from './models/brands.ts';
import { shipments } from './models/shipments.ts';
import { orders } from './models/orders.ts';
import { orderItems } from './models/orderItems.ts';
import { returnItems } from './models/returnItems.ts';
import { payments } from './models/payments.ts';
import { promoCodes } from './models/promoCodes.ts';
import { customers } from './models/customers.ts';
import { carts } from './models/carts.ts';
import { cartItems } from './models/cartItems.ts';
import { categories } from './models/categories.ts';
import { addresses } from './models/addresses.ts';
import { productImages } from './models/productImages.ts';
import { reviews } from './models/reviews.ts';
import { discounts } from "./models/discounts";
import { productDiscounts } from "./models/productDiscounts.ts";
import { categoryDiscounts } from "./models/categoryDiscounts.ts";

export type Category = InferSelectModel<typeof categories>;
export type InsertCategory = InferInsertModel<typeof categories>;

export type CategoryDiscount = InferSelectModel<typeof categoryDiscounts>
export type InsertCategoryDiscounts = InferInsertModel<typeof categoryDiscounts>

export type InsertBrands = InferInsertModel<typeof brands>;

export type InsertDiscounts = InferInsertModel<typeof discounts>;

export type Product = InferSelectModel<typeof products>;
export type InsertProducts = InferInsertModel<typeof products>;

export type ProductSku = InferSelectModel<typeof productSkus>;
export type InsertProductSku = InferInsertModel<typeof productSkus>;

export type ProductDiscount = InferSelectModel<typeof productDiscounts>
export type InsertProductDiscount = InferInsertModel<typeof productDiscounts>


export type InsertAddress = InferInsertModel<typeof addresses>;
export type InsertCustomer = InferInsertModel<typeof customers>;
export type InsertPromo = InferInsertModel<typeof promoCodes>;
export type InsertPayment = InferInsertModel<typeof payments>;
export type InsertReview = InferInsertModel<typeof reviews>;
export type InsertOrder = InferInsertModel<typeof orders>;
export type InsertCart = InferInsertModel<typeof carts>;
export type InsertCartItem = InferInsertModel<typeof cartItems>;
export type InsertOrderItem = InferInsertModel<typeof orderItems>;
export type InsertProductImages = InferInsertModel<typeof productImages>;
export type InsertReturnItem = InferInsertModel<typeof returnItems>;
export type InsertShipment = InferInsertModel<typeof shipments>;