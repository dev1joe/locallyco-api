import { relations } from "drizzle-orm/relations";
import { brands, products, categories, addresses, customers, carts, user, orders, payments, promoCodes, shipments, reviews, account, cartItems, orderItems, productSkus, session, productImages } from "./models/models";

export const productsRelations = relations(products, ({ one, many }) => ({
	brand: one(brands, {
		fields: [products.brandId],
		references: [brands.id]
	}),
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id]
	}),
	reviews: many(reviews),
	cartItems: many(cartItems),
	orderItems: many(orderItems),
	productSkus: many(productSkus),
}));

export const brandsRelations = relations(brands, ({ one, many }) => ({
	products: many(products),
	category: one(categories, {
		fields: [brands.categoryId],
		references: [categories.id]
	}),
	address: one(addresses, {
		fields: [brands.address],
		references: [addresses.id]
	}),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
	products: many(products),
	brands: many(brands),
	category: one(categories, {
		fields: [categories.parentId],
		references: [categories.id],
		relationName: "categories_parentId_categories_id"
	}),
	categories: many(categories, {
		relationName: "categories_parentId_categories_id"
	}),
}));

export const addressRelations = relations(addresses, ({ many }) => ({
	brands: many(brands),
	customers: many(customers),
	orders: many(orders),
}));

export const cartRelations = relations(carts, ({ one, many }) => ({
	customer: one(customers, {
		fields: [carts.customerId],
		references: [customers.id]
	}),
	cartItems: many(cartItems),
}));

export const customerRelations = relations(customers, ({ one, many }) => ({
	carts: many(carts),
	address: one(addresses, {
		fields: [customers.addressId],
		references: [addresses.id]
	}),
	user: one(user, {
		fields: [customers.userId],
		references: [user.id]
	}),
	orders: many(orders),
	reviews: many(reviews),
}));

export const userRelations = relations(user, ({ many }) => ({
	customers: many(customers),
	account: many(account),
	session: many(session),
}));

export const orderRelations = relations(orders, ({ one, many }) => ({
	customer: one(customers, {
		fields: [orders.customerId],
		references: [customers.id]
	}),
	address: one(addresses, {
		fields: [orders.addressId],
		references: [addresses.id]
	}),
	payment: one(payments, {
		fields: [orders.paymentId],
		references: [payments.id]
	}),
	shipments: many(shipments),
	orderItems: many(orderItems),
}));

export const paymentRelations = relations(payments, ({ one, many }) => ({
	orders: many(orders),
	promo: one(promoCodes, {
		fields: [payments.promoId],
		references: [promoCodes.id]
	}),
}));

export const promoRelations = relations(promoCodes, ({ many }) => ({
	payments: many(payments),
}));

export const shipmentRelations = relations(shipments, ({ one }) => ({
	order: one(orders, {
		fields: [shipments.orderId],
		references: [orders.id]
	}),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
	product: one(products, {
		fields: [reviews.productId],
		references: [products.id]
	}),
	customer: one(customers, {
		fields: [reviews.customerId],
		references: [customers.id]
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const cartItemRelations = relations(cartItems, ({ one }) => ({
	cart: one(carts, {
		fields: [cartItems.cartId],
		references: [carts.id]
	}),
	product: one(products, {
		fields: [cartItems.productId],
		references: [products.id]
	}),
}));

export const orderItemRelations = relations(orderItems, ({ one }) => ({
	order: one(orders, {
		fields: [orderItems.orderId],
		references: [orders.id]
	}),
	product: one(products, {
		fields: [orderItems.productId],
		references: [products.id]
	}),
}));

export const productSkuRelations = relations(productSkus, ({ one, many }) => ({
	product: one(products, {
		fields: [productSkus.productId],
		references: [products.id]
	}),
	productImages: many(productImages),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const productImageRelations = relations(productImages, ({ one }) => ({
	productSku: one(productSkus, {
		fields: [productImages.productSkuId],
		references: [productSkus.id]
	}),
}));
