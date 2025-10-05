import { relations } from "drizzle-orm/relations";
import { brands, products, categories, address, customer, cart, user, order, payment, promo, shipment, reviews, account, cartItem, orderItem, productSku, session, productImage } from "./models/models";

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
	cartItems: many(cartItem),
	orderItems: many(orderItem),
	productSkus: many(productSku),
}));

export const brandsRelations = relations(brands, ({ one, many }) => ({
	products: many(products),
	category: one(categories, {
		fields: [brands.categoryId],
		references: [categories.id]
	}),
	address: one(address, {
		fields: [brands.address],
		references: [address.id]
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

export const addressRelations = relations(address, ({ many }) => ({
	brands: many(brands),
	customers: many(customer),
	orders: many(order),
}));

export const cartRelations = relations(cart, ({ one, many }) => ({
	customer: one(customer, {
		fields: [cart.customerId],
		references: [customer.id]
	}),
	cartItems: many(cartItem),
}));

export const customerRelations = relations(customer, ({ one, many }) => ({
	carts: many(cart),
	address: one(address, {
		fields: [customer.addressId],
		references: [address.id]
	}),
	user: one(user, {
		fields: [customer.userId],
		references: [user.id]
	}),
	orders: many(order),
}));

export const userRelations = relations(user, ({ many }) => ({
	customers: many(customer),
	accounts: many(account),
	sessions: many(session),
}));

export const orderRelations = relations(order, ({ one, many }) => ({
	customer: one(customer, {
		fields: [order.customerId],
		references: [customer.id]
	}),
	address: one(address, {
		fields: [order.addressId],
		references: [address.id]
	}),
	payment: one(payment, {
		fields: [order.paymentId],
		references: [payment.id]
	}),
	shipments: many(shipment),
	orderItems: many(orderItem),
}));

export const paymentRelations = relations(payment, ({ one, many }) => ({
	orders: many(order),
	promo: one(promo, {
		fields: [payment.promoId],
		references: [promo.id]
	}),
}));

export const promoRelations = relations(promo, ({ many }) => ({
	payments: many(payment),
}));

export const shipmentRelations = relations(shipment, ({ one }) => ({
	order: one(order, {
		fields: [shipment.orderId],
		references: [order.id]
	}),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
	product: one(products, {
		fields: [reviews.productId],
		references: [products.id]
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const cartItemRelations = relations(cartItem, ({ one }) => ({
	cart: one(cart, {
		fields: [cartItem.cartId],
		references: [cart.id]
	}),
	product: one(products, {
		fields: [cartItem.productId],
		references: [products.id]
	}),
}));

export const orderItemRelations = relations(orderItem, ({ one }) => ({
	order: one(order, {
		fields: [orderItem.orderId],
		references: [order.id]
	}),
	product: one(products, {
		fields: [orderItem.productId],
		references: [products.id]
	}),
}));

export const productSkuRelations = relations(productSku, ({ one, many }) => ({
	product: one(products, {
		fields: [productSku.productId],
		references: [products.id]
	}),
	productImages: many(productImage),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const productImageRelations = relations(productImage, ({ one }) => ({
	productSku: one(productSku, {
		fields: [productImage.productSkuId],
		references: [productSku.id]
	}),
}));
