/**
 * @file seed.ts
 * @description This script seeds the database with initial data using Drizzle ORM.
 *
 * Requirements:
 * - Drizzle ORM and Drizzle Kit configured.
 * - `ts-node` and `@faker-js/faker` installed.
 *
 * How to run:
 * `ts-node seed.ts`
 */

import db from './db.ts';
import type { InferInsertModel } from 'drizzle-orm';

import { products } from './models/products.ts';
import { brands } from './models/brands.ts';
import { shipment } from './models/shipment.ts';
import { order } from './models/order.ts';
import { orderItem } from './models/order_item.ts';
import { returnItem } from './models/return_item.ts';
import { payment } from './models/payment.ts';
import { promo } from './models/promo.ts';
import { customer } from './models/customer.ts';
import { cart } from './models/cart.ts';
import { cartItem } from './models/cart_item.ts';
import { categories } from './models/categories.ts';
import { address } from './models/address.ts';
import { productSku } from './models/product_sku.ts';
import { productImage } from './models/product_image.ts';
import { reviews } from './models/reviews.ts';

// --- Define your seed data here ---
// This data is structured to respect the foreign key dependencies of your schema.
type InsertAddress = InferInsertModel<typeof address>;
type InsertCategory = InferInsertModel<typeof categories>;
type InsertBrands = InferInsertModel<typeof brands>;
type InsertCustomer = InferInsertModel<typeof customer>;
type InsertPromo = InferInsertModel<typeof promo>;
type InsertPayment = InferInsertModel<typeof payment>;
type InsertProducts = InferInsertModel<typeof products>;
type InsertProductSku = InferInsertModel<typeof productSku>;
type InsertReview = InferInsertModel<typeof reviews>;
type InsertOrder = InferInsertModel<typeof order>;
type InsertCart = InferInsertModel<typeof cart>;
type InsertCartItem = InferInsertModel<typeof cartItem>;
type InsertOrderItem = InferInsertModel<typeof orderItem>;
type InsertProductImages = InferInsertModel<typeof productImage>;
type InsertReturnItem = InferInsertModel<typeof returnItem>;
type InsertShipment = InferInsertModel<typeof shipment>;

type SeedData = {
	address: InsertAddress[];
	category: InsertCategory[];
	promo: InsertPromo[];
	customer: InsertCustomer[];
	brands: InsertBrands[];
	products: InsertProducts[];
	payment: InsertPayment[];
	productSku: InsertProductSku[];
	review: InsertReview[];
	orderItem: InsertOrderItem[];
	productImage: InsertProductImages[];
	returnItem: InsertReturnItem[];
	cart: InsertCart[];
	cartItem: InsertCartItem[];
	order: InsertOrder[];
	shipment: InsertShipment[];
};

const seedData: SeedData = {
	// Level 1: Tables with no foreign key dependencies
	address: [
		{ country: 'USA', governorate: 'California', district: 'Silicon Valley', street: '123 Tech St', building: 'A', floor: 10, apartment: 101 },
		{ country: 'UK', governorate: 'London', district: 'Westminster', street: '456 Art St', building: 'B', floor: 5, apartment: 502 },
	] as InsertAddress[],
	category: [
		{ name: 'Electronics', description: 'Gadgets and electronic devices.', attributes: { 'type': 'electronic' } },
		{ name: 'Apparel', description: 'Clothing and accessories.', attributes: { 'type': 'apparel' } },
	] as InsertCategory[],
	promo: [
		{ key: 'SAVE10', percentage: 10 },
		{ key: 'FREESHIP', percentage: 100 },
	] as InsertPromo[],

	// Level 2: Depends on Level 1 (address, category, promo)
	customer: [
		{ fname: 'John', lname: 'Doe' },
		{ fname: 'Jane', lname: 'Smith' },
	] as InsertCustomer[],
	brands: [
		{ name: 'Tech Innovations', description: 'Cutting-edge electronics.', },
		{ name: 'Urban Threads', description: 'Modern and sustainable apparel.', },
	] as InsertBrands[],

	// Level 3: Depends on Level 2 (brands, customer, etc.)
	products: [
		{
			name: 'Ultra HD Monitor',
			imageUrl: 'https://prd.place/400?id=5&p=40',
			description: 'A monitor with stunning clarity.',
			reviewCount: 6,
			averageRating: "3.83",
			versioning: { "attributes": { "size": { "type": "integer", "values": ["27", "32"] } } }
		},
		{
			name: 'Cotton Hoodie',
			imageUrl: 'https://placehold.co/600x400/fff/000',
			description: 'A comfortable and stylish hoodie.',
			reviewCount: 8,
			averageRating: "3.62",
			versioning: {
				"attributes": {
					"size": {
						"type": "string",
						"values": [
							"xs",
							"s",
							"m",
							"lg",
							"xl",
							"xxl"
						]
					},
					"color": {
						"type": "string",
						"values": [
							"#ff0000",
							"#54ff00",
							"#007fff",
							"#000",
						]
					}
				}
			}
		},
		{
			name: 'Awsome Hoodie',
			// imageUrl: 'https://placehold.co/600x400/fff/000',
			description: 'A comfortable and stylish hoodie.',
			versioning: {}
		}
	] as InsertProducts[],
	payment: [
		{ promoId: 1, priceCent: 12000, type: 'Credit Card', status: 1 },
		{ promoId: 2, priceCent: 8000, type: 'PayPal', status: 1 },
	] as InsertPayment[],

	// Level 4: Depends on Products, Payment, Customer, etc.
	productSku: [
		// monitor SKUs
		{ productId: 0, skuCode: 'MONITOR-UHD-GRAY', attributes: { 'size': '27' }, quantity: 50, priceCent: 35000, images: ['https://prd.place/400?id=5&p=40'] },

		// Hoodie SKUs
		{ productId: 1, skuCode: 'HOODIE-COT-BLK', attributes: { 'color': '#000', 'size': 'S' }, quantity: 211, priceCent: 5500, images: ['https://placehold.co/600x400/fff/000?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-BLK', attributes: { 'color': '#000', 'size': 'M' }, quantity: 107, priceCent: 5500, images: ['https://placehold.co/600x400/fff/000?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-BLK', attributes: { 'color': '#000', 'size': 'L' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/000?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-RED', attributes: { 'color': '#f00', 'size': 'S' }, quantity: 211, priceCent: 5500, images: ['https://placehold.co/600x400/fff/f00?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-RED', attributes: { 'color': '#f00', 'size': 'M' }, quantity: 107, priceCent: 5500, images: ['https://placehold.co/600x400/fff/f00?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-RED', attributes: { 'color': '#f00', 'size': 'L' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/f00?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-GRN', attributes: { 'color': '#0f0', 'size': 'S' }, quantity: 211, priceCent: 5500, images: ['https://placehold.co/600x400/fff/0f0?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-GRN', attributes: { 'color': '#0f0', 'size': 'M' }, quantity: 107, priceCent: 5500, images: ['https://placehold.co/600x400/fff/0f0?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-GRN', attributes: { 'color': '#0f0', 'size': 'L' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/0f0?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-BLU', attributes: { 'color': '#00f', 'size': 'S' }, quantity: 211, priceCent: 5500, images: ['https://placehold.co/600x400/fff/00f?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-BLU', attributes: { 'color': '#00f', 'size': 'M' }, quantity: 107, priceCent: 5500, images: ['https://placehold.co/600x400/fff/00f?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-BLU', attributes: { 'color': '#00f', 'size': 'L' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/00f?text=T-shirt'] },
	] as InsertProductSku[],
	review: [
		// monitor reviews
		{ productId: 0, rate: 5, comment: 'This monitor is a game changer!' },
		{ productId: 0, rate: 4, comment: 'A solid monitor.' },
		{ productId: 0, rate: 3, comment: `A nice monitor, but would've been better with 044 Hz.` },
		{ productId: 0, rate: 3, comment: `Good Monitor!` },
		{ productId: 0, rate: 4, comment: `Nice Monitor!` },
		{ productId: 0, rate: 4, comment: `Amazing Monitor!` },

		// hoodie reviews
		{ productId: 1, rate: 3, comment: 'Very basic hoodie.' },
		{ productId: 1, rate: 4, comment: 'Comfortable fit, good material.' },
		{ productId: 1, rate: 4, comment: 'This hoodie looks COOL!' },
		{ productId: 1, rate: 4, comment: 'Amazing Hoodie' },
		{ productId: 1, rate: 4, comment: 'Can you add a purple one?' },
		{ productId: 1, rate: 4, comment: 'Nice Hoodie, shipped quickly!' },
		{ productId: 1, rate: 4, comment: 'Good Hoodie' },
		{ productId: 1, rate: 2, comment: `Did't like the material, there are better materials out in the market.` },
	] as InsertReview[],

	// These arrays were missing; add minimal valid entries matching the DB models
	orderItem: [
		{ quantity: 1, itemPriceCent: 35000 },
	] as InferInsertModel<typeof orderItem>[],
	productImage: [
		{ image: 'https://example.com/images/monitor-uhd.jpg' },
	] as InsertProductImages[],
	returnItem: [
		{ quantity: 0 },
	] as InsertReturnItem[],

	// Level 5: Depends on Product SKU, Order, etc.
	cart: [
		{ name: 'John Doe\'s Cart', status: 1 },
		{ name: 'Mary Jane\'s Cart', status: 1 },
		{ name: 'Bob Marley\'s Cart', status: 1 },
	] as InsertCart[],
	order: [
		{}, // Will be linked to a customer, address, and payment
	] as InsertOrder[],
	shipment: [
		{ stage: 1, estimatedTime: 5, status: 1 },
	] as InsertShipment[],

	cartItem: [
		{ quantity: 3 },
		{ quantity: 3 },
		{ quantity: 3 },

	] as InsertCartItem[],
};


/**
 * Seeds the database with the provided data in a single transaction.
 *
 * @param db - The Drizzle database connection.
 * @param schemas - The Drizzle schemas object.
 */
async function seedDatabase() {
	console.log('Starting database seeding...');

	try {
		// We use a transaction to ensure all operations succeed or none of them do.
		await db.transaction(async (tx) => {
			console.log('Deleting existing data...');
			// IMPORTANT: Delete in reverse order of foreign key dependencies
			await tx.delete(productImage);
			await tx.delete(returnItem);
			await tx.delete(cart);
			await tx.delete(orderItem);
			await tx.delete(shipment);
			await tx.delete(reviews);
			await tx.delete(productSku);
			await tx.delete(products);
			await tx.delete(order);
			await tx.delete(payment);
			await tx.delete(customer);
			await tx.delete(brands);
			await tx.delete(promo);
			await tx.delete(categories);
			await tx.delete(address);
			await tx.delete(cartItem);

			console.log('Existing data deleted.');

			console.log('Inserting new data...');
			// IMPORTANT: Insert in the correct order to satisfy foreign key constraints.
			// E.g., addresses must exist before customers can reference them.
			const addressesResult = await tx.insert(address).values(seedData.address).returning({ id: address.id });
			const categoriesResult = await tx.insert(categories).values(seedData.category).returning({ id: categories.id });
			const promosResult = await tx.insert(promo).values(seedData.promo).returning({ id: promo.id });

			const seededCustomers = seedData.customer.map(c => ({ ...c, addressId: addressesResult[0].id }));
			const customersResult = await tx.insert(customer).values(seededCustomers).returning({ id: customer.id });

			const seededBrands = seedData.brands.map(b => ({ ...b, categoryId: categoriesResult[0].id, address: addressesResult[0].id }));
			const brandsResult = await tx.insert(brands).values(seededBrands).returning({ id: brands.id });

			const seededProducts = seedData.products.map(p => ({ ...p, categoryId: categoriesResult[0].id, brandId: brandsResult[0].id }));
			const productsResult = await tx.insert(products).values(seededProducts).returning({ id: products.id });

			const seededPayments = seedData.payment.map(p => ({ ...p, promoId: promosResult[0].id }));
			const paymentsResult = await tx.insert(payment).values(seededPayments).returning({ id: payment.id });

			const seededOrders = seedData.order.map(o => ({ ...o, customerId: customersResult[0].id, addressId: addressesResult[0].id, paymentId: paymentsResult[0].id }));
			const ordersResult = await tx.insert(order).values(seededOrders).returning({ id: order.id });

			const seededCarts = seedData.cart.map(c => ({ ...c, customerId: customersResult[0].id }));
			const cartsResult = await tx.insert(cart).values(seededCarts).returning({ id: cart.id });

			const seededCartsItem = seedData.cartItem.map((c, index) => (
				{ cartId: cartsResult[index].id, ...c }
			));
			await tx.insert(cartItem).values(seededCartsItem);


			// Seeding SKUs
			let seededProductSkus = seedData.productSku.map(sku => ({ ...sku, productId: productsResult[sku.productId].id }));
			// seededProductSkus[0].productId = productsResult[0].id;
			const productSkusResult = await tx.insert(productSku).values(seededProductSkus).returning({ id: productSku.id });

			// Seeding Reviews
			const seededReviews = seedData.review.map(r => ({ ...r, productId: productsResult[r.productId].id }));
			await tx.insert(reviews).values(seededReviews);

			const seededOrderItems = seedData.orderItem.map(oi => ({ ...oi, orderId: ordersResult[0].id, productId: productsResult[0].id }));
			const orderItemsResult = await tx.insert(orderItem).values(seededOrderItems).returning({ id: orderItem.id });

			const seededShipments = seedData.shipment.map(s => ({ ...s, orderId: ordersResult[0].id }));
			await tx.insert(shipment).values(seededShipments);

			const seededProductImages = seedData.productImage.map(pi => ({ ...pi, productSkuId: productSkusResult[0].id }));
			await tx.insert(productImage).values(seededProductImages);

			const seededReturnItems = seedData.returnItem.map(ri => ({ ...ri, orderItemId: orderItemsResult[0].id }));
			await tx.insert(returnItem).values(seededReturnItems);

			console.log('Database seeding complete!');
		});
	} catch (error) {
		console.error('Database seeding failed:', error);
		process.exit(1);
	}
	// finally {
	// 	await client.end();
	// }
}

seedDatabase();
