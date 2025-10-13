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
import { productSkus } from './models/productSkus.ts';
import { productImages } from './models/productImages.ts';
import { reviews } from './models/reviews.ts';

// --- Define your seed data here ---
// This data is structured to respect the foreign key dependencies of your schema.
type InsertAddress = InferInsertModel<typeof addresses>;
type InsertCategory = InferInsertModel<typeof categories>;
type InsertBrands = InferInsertModel<typeof brands>;
type InsertCustomer = InferInsertModel<typeof customers>;
type InsertPromo = InferInsertModel<typeof promoCodes>;
type InsertPayment = InferInsertModel<typeof payments>;
type InsertProducts = InferInsertModel<typeof products>;
type InsertProductSku = InferInsertModel<typeof productSkus>;
type InsertReview = InferInsertModel<typeof reviews>;
type InsertOrder = InferInsertModel<typeof orders>;
type InsertCart = InferInsertModel<typeof carts>;
type InsertCartItem = InferInsertModel<typeof cartItems>;
type InsertOrderItem = InferInsertModel<typeof orderItems>;
type InsertProductImages = InferInsertModel<typeof productImages>;
type InsertReturnItem = InferInsertModel<typeof returnItems>;
type InsertShipment = InferInsertModel<typeof shipments>;

type SeedData = {
	addresses: InsertAddress[];
	category: InsertCategory[];
	promoCodes: InsertPromo[];
	customer: InsertCustomer[];
	brands: InsertBrands[];
	products: InsertProducts[];
	payments: InsertPayment[];
	productSkus: InsertProductSku[];
	review: InsertReview[];
	orderItem: InsertOrderItem[];
	productImages: InsertProductImages[];
	returnItems: InsertReturnItem[];
	carts: InsertCart[];
	cartItems: InsertCartItem[];
	order: InsertOrder[];
	shipment: InsertShipment[];
};

const seedData: SeedData = {
	// Level 1: Tables with no foreign key dependencies
	addresses: [
		{ country: 'USA', governorate: 'California', district: 'Silicon Valley', street: '123 Tech St', building: 'A', floor: 10, apartment: 101 },
		{ country: 'UK', governorate: 'London', district: 'Westminster', street: '456 Art St', building: 'B', floor: 5, apartment: 502 },
	] as InsertAddress[],
	category: [
		{ name: 'Electronics', description: 'Gadgets and electronic devices.', attributes: { 'type': 'electronic' } },
		{ name: 'Apparel', description: 'Clothing and accessories.', attributes: { 'type': 'apparel' } },
	] as InsertCategory[],
	promoCodes: [
		{ key: 'SAVE10', percentage: 10 },
		{ key: 'FREESHIP', percentage: 100 },
	] as InsertPromo[],

	// Level 2: Depends on Level 1 (addresses, category, promoCodes)
	customer: [
		{ fname: 'John', lname: 'Doe' },
		{ fname: 'Jane', lname: 'Doe' },
		{ fname: 'John', lname: 'Smith' },
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
			attributes: [{ "name": "size", "type": "integer", "values": ["27", "32"] }]
		},
		{
			name: 'Cotton Hoodie',
			imageUrl: 'https://placehold.co/600x400/fff/000',
			description: 'A comfortable and stylish hoodie.',
			reviewCount: 8,
			averageRating: "3.62",
			attributes: [
				{
					"name": "size",
					"type": "string",
					"values": [
						"s",
						"m",
						"l",
						"xl",
					]
				},
				{
					"name": "color",
					"type": "string",
					"values": [
						"#f00",
						"#0f0",
						"#00f",
						"#000",
					]
				}
			]
		},
		{
			name: 'Awesome Hoodie',
			// imageUrl: 'https://placehold.co/600x400/fff/000',
			description: 'A comfortable and stylish hoodie.',
			attributes: []
		}
	] as InsertProducts[],
	payments: [
		{ promoId: 1, priceCent: 12000, type: 'Credit Card', status: 1 },
		{ promoId: 2, priceCent: 8000, type: 'PayPal', status: 1 },
	] as InsertPayment[],

	// Level 4: Depends on Products, Payment, Customer, etc.
	productSkus: [
		// monitor SKUs
		{ productId: 0, skuCode: 'MONITOR-UHD-GRAY', attributes: { 'size': '27' }, quantity: 50, priceCent: 35000, images: ['https://prd.place/400?id=5&p=40'] },

		// Hoodie SKUs
		{ productId: 1, skuCode: 'HOODIE-COT-S-BLK', attributes: { 'color': '#000', 'size': 'S' }, quantity: 211, priceCent: 5500, images: ['https://placehold.co/600x400/fff/000?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-M-BLK', attributes: { 'color': '#000', 'size': 'M' }, quantity: 107, priceCent: 5500, images: ['https://placehold.co/600x400/fff/000?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-L-BLK', attributes: { 'color': '#000', 'size': 'L' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/000?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-XL-BLK', attributes: { 'color': '#000', 'size': 'XL' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/000?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-S-RED', attributes: { 'color': '#f00', 'size': 'S' }, quantity: 211, priceCent: 5500, images: ['https://placehold.co/600x400/fff/f00?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-M-RED', attributes: { 'color': '#f00', 'size': 'M' }, quantity: 107, priceCent: 5500, images: ['https://placehold.co/600x400/fff/f00?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-L-RED', attributes: { 'color': '#f00', 'size': 'L' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/f00?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-XL-RED', attributes: { 'color': '#f00', 'size': 'XL' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/f00?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-S-GRN', attributes: { 'color': '#0f0', 'size': 'S' }, quantity: 211, priceCent: 5500, images: ['https://placehold.co/600x400/fff/0f0?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-M-GRN', attributes: { 'color': '#0f0', 'size': 'M' }, quantity: 107, priceCent: 5500, images: ['https://placehold.co/600x400/fff/0f0?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-L-GRN', attributes: { 'color': '#0f0', 'size': 'L' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/0f0?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-XL-GRN', attributes: { 'color': '#0f0', 'size': 'XL' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/0f0?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-S-BLU', attributes: { 'color': '#00f', 'size': 'S' }, quantity: 211, priceCent: 5500, images: ['https://placehold.co/600x400/fff/00f?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-M-BLU', attributes: { 'color': '#00f', 'size': 'M' }, quantity: 107, priceCent: 5500, images: ['https://placehold.co/600x400/fff/00f?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-L-BLU', attributes: { 'color': '#00f', 'size': 'L' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/00f?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-XL-BLU', attributes: { 'color': '#00f', 'size': 'XL' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/00f?text=T-shirt'] },
	] as InsertProductSku[],
	review: [
		// monitor reviews
		{ customerId: 0, productId: 0, rate: 5, comment: 'This monitor is a game changer!' },
		{ customerId: 3, productId: 0, rate: 4, comment: 'A solid monitor.' },
		{ customerId: 0, productId: 0, rate: 3, comment: `A nice monitor, but would've been better with 044 Hz.` },
		{ customerId: 2, productId: 0, rate: 3, comment: `Good Monitor!` },
		{ customerId: 3, productId: 0, rate: 4, comment: `Nice Monitor!` },
		{ customerId: 1, productId: 0, rate: 4, comment: `Amazing Monitor!` },

		// hoodie reviews
		{ customerId: 1, productId: 1, rate: 3, comment: 'Very basic hoodie.' },
		{ customerId: 3, productId: 1, rate: 4, comment: 'Comfortable fit, good material.' },
		{ customerId: 0, productId: 1, rate: 4, comment: 'This hoodie looks COOL!' },
		{ customerId: 1, productId: 1, rate: 4, comment: 'Amazing Hoodie' },
		{ customerId: 2, productId: 1, rate: 4, comment: 'Can you add a purple one?' },
		{ customerId: 2, productId: 1, rate: 4, comment: 'Nice Hoodie, shipped quickly!' },
		{ customerId: 0, productId: 1, rate: 4, comment: 'Good Hoodie' },
		{ customerId: 0, productId: 1, rate: 2, comment: `Did't like the material, there are better materials out in the market.` },
	] as InsertReview[],

	// These arrays were missing; add minimal valid entries matching the DB models
	orderItem: [
		{ quantity: 1, itemPriceCent: 35000 },
	] as InferInsertModel<typeof orderItems>[],
	productImages: [
		{ image: 'https://example.com/images/monitor-uhd.jpg' },
	] as InsertProductImages[],
	returnItems: [
		{ quantity: 0 },
	] as InsertReturnItem[],

	// Level 5: Depends on Product SKU, Order, etc.
	carts: [
		{ name: 'John Doe\'s Cart', status: 1 },
		{ name: 'Mary Jane\'s Cart', status: 1 },
		{ name: 'Bob Marley\'s Cart', status: 1 },
	] as InsertCart[],
	order: [
		{}, // Will be linked to a customer, addresses, and payments
	] as InsertOrder[],
	shipment: [
		{ stage: 1, estimatedTime: 5, status: 1 },
	] as InsertShipment[],

	cartItems: [
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
			await tx.delete(productImages);
			await tx.delete(returnItems);
			await tx.delete(carts);
			await tx.delete(orderItems);
			await tx.delete(shipments);
			await tx.delete(reviews);
			await tx.delete(productSkus);
			await tx.delete(products);
			await tx.delete(orders);
			await tx.delete(payments);
			await tx.delete(customers);
			await tx.delete(brands);
			await tx.delete(promoCodes);
			await tx.delete(categories);
			await tx.delete(addresses);
			await tx.delete(cartItems);

			console.log('Existing data deleted.');

			console.log('Inserting new data...');
			// IMPORTANT: Insert in the correct order to satisfy foreign key constraints.
			// E.g., addresses must exist before customers can reference them.
			const addressesResult = await tx.insert(addresses).values(seedData.addresses).returning({ id: addresses.id });
			const categoriesResult = await tx.insert(categories).values(seedData.category).returning({ id: categories.id });
			const promosResult = await tx.insert(promoCodes).values(seedData.promoCodes).returning({ id: promoCodes.id });

			const seededCustomers = seedData.customer.map(c => ({ ...c, addressId: addressesResult[0].id }));
			const customersResult = await tx.insert(customers).values(seededCustomers).returning({ id: customers.id });

			const seededBrands = seedData.brands.map(b => ({ ...b, categoryId: categoriesResult[0].id, addresses: addressesResult[0].id }));
			const brandsResult = await tx.insert(brands).values(seededBrands).returning({ id: brands.id });

			const seededProducts = seedData.products.map(p => ({ ...p, categoryId: categoriesResult[0].id, brandId: brandsResult[0].id }));
			const productsResult = await tx.insert(products).values(seededProducts).returning({ id: products.id });

			const seededPayments = seedData.payments.map(p => ({ ...p, promoId: promosResult[0].id }));
			const paymentsResult = await tx.insert(payments).values(seededPayments).returning({ id: payments.id });

			const seededOrders = seedData.order.map(o => ({ ...o, customerId: customersResult[0].id, addressId: addressesResult[0].id, paymentId: paymentsResult[0].id }));
			const ordersResult = await tx.insert(orders).values(seededOrders).returning({ id: orders.id });

			const seededCarts = seedData.carts.map(c => ({ ...c, customerId: customersResult[0].id }));
			const cartsResult = await tx.insert(carts).values(seededCarts).returning({ id: carts.id });

			const seededCartsItem = seedData.cartItems.map((c, index) => (
				{ cartId: cartsResult[index].id, ...c }
			));
			await tx.insert(cartItems).values(seededCartsItem);


			// Seeding SKUs
			let seededProductSkus = seedData.productSkus.map(sku => ({ ...sku, productId: productsResult[sku.productId].id }));
			// seededProductSkus[0].productId = productsResult[0].id;
			const productSkusResult = await tx.insert(productSkus).values(seededProductSkus).returning({ id: productSkus.id });

			// Seeding Reviews
			const seededReviews = seedData.review.map(r => ({ ...r, productId: productsResult[r.productId].id, customerId: customersResult[r.customerId].id }));
			await tx.insert(reviews).values(seededReviews);

			const seededOrderItems = seedData.orderItem.map(oi => ({ ...oi, orderId: ordersResult[0].id, productId: productsResult[0].id }));
			const orderItemsResult = await tx.insert(orderItems).values(seededOrderItems).returning({ id: orderItems.id });

			const seededShipments = seedData.shipment.map(s => ({ ...s, orderId: ordersResult[0].id }));
			await tx.insert(shipments).values(seededShipments);

			const seededProductImages = seedData.productImages.map(pi => ({ ...pi, productSkuId: productSkusResult[0].id }));
			await tx.insert(productImages).values(seededProductImages);

			const seededReturnItems = seedData.returnItems.map(ri => ({ ...ri, orderItemId: orderItemsResult[0].id }));
			await tx.insert(returnItems).values(seededReturnItems);

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
