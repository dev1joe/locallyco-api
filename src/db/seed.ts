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
import {
	InsertAddress, InsertCategory, InsertPromo, InsertCustomer, InsertBrands, InsertProducts, InsertPayment,
	InsertProductSku, InsertReview, InsertOrderItem, InsertProductImages, InsertReturnItem, InsertCart,
	InsertCartItem, InsertOrder, InsertShipment, InsertDiscounts, InsertProductDiscount,
	InsertCategoryDiscounts
} from './types.ts';

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
import { productDiscounts } from './models/productDiscounts.ts';
import { discounts } from './models/discounts.ts';
import { categoryDiscounts } from './models/categoryDiscounts.ts';

// --- Define your seed data here ---
// This data is structured to respect the foreign key dependencies of your schema.

type SeedData = {
	addresses: InsertAddress[];
	category: InsertCategory[];
	discounts: InsertDiscounts[];
	promoCodes: InsertPromo[];
	customer: InsertCustomer[];
	brands: InsertBrands[];
	categoryDiscounts: InsertCategoryDiscounts[];
	products: InsertProducts[];
	payments: InsertPayment[];
	productSkus: InsertProductSku[];
	productDiscounts: InsertProductDiscount[];
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
		{ name: 'Winter Collection', description: 'Stylish Winter', attributes: { 'type': 'apparel' } },
		{ name: 'Summer Collection', description: 'Stylish Winter', attributes: { 'type': 'apparel' } },
		{ name: 'Shoes', description: 'Some Nice Shoes', attributes: { 'type': 'apparel' } },
		{ name: 'random category', description: 'Just a random category', attributes: { 'type': 'apparel' } },
	] as InsertCategory[],
	discounts: [
		{ name: 'save30', type: 'percentage', value: 30, isActive: true, appliesToType: 'all', minPurchaseAmountCents: 100000, startDate: new Date('2025-9-1'), endDate: new Date('2026-2-30') },
		{ name: 'winter sale', type: 'percentage', value: 10, isActive: true, appliesToType: 'category', minPurchaseAmountCents: 0, startDate: new Date('2025-10-1'), endDate: new Date('2026-2-30') },
		{ name: 'summer sale', type: 'percentage', value: 10, isActive: true, appliesToType: 'category', minPurchaseAmountCents: 0, startDate: new Date('2026-5-1'), endDate: new Date('2026-10-1') },
		{ name: 'random sale', type: 'amount', value: 5000, isActive: true, appliesToType: 'category', minPurchaseAmountCents: 0, startDate: new Date('2025-5-1'), endDate: new Date('2027-10-1') }, // fixed amount scenario
	] as InsertDiscounts[],

	// Level 2: Depends on Level 1 (addresses, category, promoCodes)
	promoCodes: [
		{ discountId: 0, code: 'SAVE30', maxUseGlobal: -1, useCountGlobal: 0, maxUsePerCustomer: 1, isStackable: true },
	] as InsertPromo[],
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
	categoryDiscounts: [
		{ categoryId: 2, discountId: 1},
		{ categoryId: 3, discountId: 2},
	] as InsertCategoryDiscounts[],

	// Level 3: Depends on Level 2 (brands, customer, etc.)
	products: [
		{
			categoryId: 0,
			name: 'Ultra HD Monitor',
			imageUrl: 'https://prd.place/400?id=5&p=40',
			description: 'A monitor with stunning clarity.',
			reviewCount: 6,
			averageRating: "3.83",
			attributes: [{ "name": "size", "type": "integer", "values": ["27"] }] // single attribute value scenario
		},
		{
			categoryId: 2,
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
			categoryId: 2,
			name: 'Awesome Hoodie',
			imageUrl: 'https://placehold.co/600x400/fff/000',
			description: 'A comfortable and stylish hoodie.',
			attributes: []
		},
		{ // no discount scenario & no review scenario
			categoryId: 4,
			name: 'Amazing Air Jordan Shoes',
			imageUrl: 'https://placehold.co/600x400/fff/000',
			description: 'All day comfort with the new Air Jordans',
			attributes: [
				{
					"name": "size",
					"type": "string",
					"values": [
						"40",
						"42",
						"44",
						"46",
						"48",
					]
				},
				{
					"name": "color",
					"type": "string",
					"values": [
						"#f00",
						"#00f",
					]
				}
			]
		},
		{
			categoryId: 5,
			name: 'Random Product',
			imageUrl: 'https://farm4.staticflickr.com/3049/2327691528_f060ee2d1f.jpg',
			description: 'Just a random product',
			reviewCount: 6,
			averageRating: "3.83",
			attributes: [{ "name": "size", "type": "integer", "values": ["random"] }] // single attribute value scenario
		},
	] as InsertProducts[],
	payments: [
		{ promoId: 0, priceCent: 12000, type: 'Credit Card', status: 1 },
	] as InsertPayment[],

	// Level 4: Depends on Products, Payment, Customer, etc.
	productSkus: [
		// monitor SKUs
		{ productId: 0, skuCode: 'MONITOR-UHD-GRAY', attributes: { 'size': '27' }, quantity: 50, priceCent: 35000, images: ['https://prd.place/400?id=5&p=40'] },

		// Hoodie SKUs
		{ productId: 1, skuCode: 'HOODIE-COT-S-BLK', attributes: { 'color': '#000', 'size': 'S' }, quantity: 80, priceCent: 5500, images: ['https://placehold.co/600x400/fff/000?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-M-BLK', attributes: { 'color': '#000', 'size': 'M' }, quantity: 54, priceCent: 5500, images: ['https://placehold.co/600x400/fff/000?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-L-BLK', attributes: { 'color': '#000', 'size': 'L' }, quantity: 21, priceCent: 5500, images: ['https://placehold.co/600x400/fff/000?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-XL-BLK', attributes: { 'color': '#000', 'size': 'XL' }, quantity: 12, priceCent: 5500, images: ['https://placehold.co/600x400/fff/000?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-S-RED', attributes: { 'color': '#f00', 'size': 'S' }, quantity: 211, priceCent: 5500, images: ['https://placehold.co/600x400/fff/f00?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-M-RED', attributes: { 'color': '#f00', 'size': 'M' }, quantity: 107, priceCent: 5500, images: ['https://placehold.co/600x400/fff/f00?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-L-RED', attributes: { 'color': '#f00', 'size': 'L' }, quantity: 13, priceCent: 5500, images: ['https://placehold.co/600x400/fff/f00?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-XL-RED', attributes: { 'color': '#f00', 'size': 'XL' }, quantity: 0, priceCent: 5500, images: ['https://placehold.co/600x400/fff/f00?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-S-GRN', attributes: { 'color': '#0f0', 'size': 'S' }, quantity: 211, priceCent: 5500, images: ['https://placehold.co/600x400/fff/0f0?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-M-GRN', attributes: { 'color': '#0f0', 'size': 'M' }, quantity: 107, priceCent: 5500, images: ['https://placehold.co/600x400/fff/0f0?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-L-GRN', attributes: { 'color': '#0f0', 'size': 'L' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/0f0?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-XL-GRN', attributes: { 'color': '#0f0', 'size': 'XL' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/0f0?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-S-BLU', attributes: { 'color': '#00f', 'size': 'S' }, quantity: 211, priceCent: 5500, images: ['https://placehold.co/600x400/fff/00f?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-M-BLU', attributes: { 'color': '#00f', 'size': 'M' }, quantity: 107, priceCent: 5500, images: ['https://placehold.co/600x400/fff/00f?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-L-BLU', attributes: { 'color': '#00f', 'size': 'L' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/00f?text=T-shirt'] },
		{ productId: 1, skuCode: 'HOODIE-COT-XL-BLU', attributes: { 'color': '#00f', 'size': 'XL' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/00f?text=T-shirt'] },

		// Air Jordans SKUs
		// different price per SKU scenario
		// SKU not in stock scenario
		{ productId: 3, skuCode: 'JR-40-blu', attributes: { 'color': '#00f', 'size': '40' }, quantity: 19, priceCent: 1500000, images: ['https://placehold.co/600x400/fff/00f?text=Air-Jordans'] },
		{ productId: 3, skuCode: 'JR-42-blu', attributes: { 'color': '#00f', 'size': '42' }, quantity: 5, priceCent: 1500000, images: ['https://placehold.co/600x400/fff/00f?text=Air-Jordans'] },
		{ productId: 3, skuCode: 'JR-44-blu', attributes: { 'color': '#00f', 'size': '44' }, quantity: 0, priceCent: 1500000, images: ['https://placehold.co/600x400/fff/00f?text=Air-Jordans'] },
		{ productId: 3, skuCode: 'JR-46-blu', attributes: { 'color': '#00f', 'size': '46' }, quantity: 0, priceCent: 1500000, images: ['https://placehold.co/600x400/fff/00f?text=Air-Jordans'] },
		{ productId: 3, skuCode: 'JR-48-blu', attributes: { 'color': '#00f', 'size': '48' }, quantity: 10, priceCent: 1500000, images: ['https://placehold.co/600x400/fff/00f?text=Air-Jordans'] },
		{ productId: 3, skuCode: 'JR-40-red', attributes: { 'color': '#f00', 'size': '40' }, quantity: 22, priceCent: 1800000, images: ['https://placehold.co/600x400/fff/f00?text=Air-Jordans'] },
		{ productId: 3, skuCode: 'JR-42-red', attributes: { 'color': '#f00', 'size': '42' }, quantity: 1, priceCent: 1800000, images: ['https://placehold.co/600x400/fff/f00?text=Air-Jordans'] },
		{ productId: 3, skuCode: 'JR-44-red', attributes: { 'color': '#f00', 'size': '44' }, quantity: 0, priceCent: 1800000, images: ['https://placehold.co/600x400/fff/f00?text=Air-Jordans'] },
		{ productId: 3, skuCode: 'JR-46-red', attributes: { 'color': '#f00', 'size': '46' }, quantity: 4, priceCent: 1800000, images: ['https://placehold.co/600x400/fff/f00?text=Air-Jordans'] },
		{ productId: 3, skuCode: 'JR-48-red', attributes: { 'color': '#f00', 'size': '48' }, quantity: 9, priceCent: 1800000, images: ['https://placehold.co/600x400/fff/f00?text=Air-Jordans'] },
		{ productId: 3, skuCode: 'JR-40-blk', attributes: { 'color': '#000', 'size': '40' }, quantity: 22, priceCent: 1500000, images: ['https://placehold.co/600x400/fff/000?text=Air-Jordans'] },
		{ productId: 3, skuCode: 'JR-42-blk', attributes: { 'color': '#000', 'size': '42' }, quantity: 1, priceCent: 1500000, images: ['https://placehold.co/600x400/fff/000?text=Air-Jordans'] },
		{ productId: 3, skuCode: 'JR-44-blk', attributes: { 'color': '#000', 'size': '44' }, quantity: 0, priceCent: 1500000, images: ['https://placehold.co/600x400/fff/000?text=Air-Jordans'] },
		{ productId: 3, skuCode: 'JR-46-blk', attributes: { 'color': '#000', 'size': '46' }, quantity: 4, priceCent: 1500000, images: ['https://placehold.co/600x400/fff/000?text=Air-Jordans'] },
		{ productId: 3, skuCode: 'JR-48-blk', attributes: { 'color': '#000', 'size': '48' }, quantity: 9, priceCent: 1500000, images: ['https://placehold.co/600x400/fff/000?text=Air-Jordans'] },

		// Random Product SKUs
		{ productId: 4, skuCode: 'rand', attributes: { 'size': 'random' }, quantity: 9, priceCent: 10000, images: ['https://placehold.co/600x400/fff/000?text=Random-Product'] },
	] as InsertProductSku[],
	productDiscounts: [
		{ discountId: 0, productId: 0 },
		{ discountId: 3, productId: 4},
	] as InsertProductDiscount[],
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

		// Air Jordans reviews
		// no reviews scenario
	] as InsertReview[],

	// These arrays were missing; add minimal valid entries matching the DB models
	orderItem: [
		{ quantity: 1, itemPriceCent: 35000 },
	] as InsertOrderItem[],
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
			await tx.delete(productDiscounts);
			await tx.delete(discounts);

			console.log('Existing data deleted.');

			console.log('Inserting new data...');
			// IMPORTANT: Insert in the correct order to satisfy foreign key constraints.
			// E.g., addresses must exist before customers can reference them.
			const addressesResult = await tx.insert(addresses).values(seedData.addresses).returning({ id: addresses.id });
			const categoriesResult = await tx.insert(categories).values(seedData.category).returning({ id: categories.id });
			const discountsResult = await tx.insert(discounts).values(seedData.discounts).returning({ id: discounts.id });

			const seedPromo = seedData.promoCodes.map(p => ({...p, discountId: discountsResult[p.discountId].id }));
			const promosResult = await tx.insert(promoCodes).values(seedPromo).returning({ id: promoCodes.id });
			const seededCustomers = seedData.customer.map(c => ({ ...c, addressId: addressesResult[0].id }));
			const customersResult = await tx.insert(customers).values(seededCustomers).returning({ id: customers.id });

			const seededBrands = seedData.brands.map(b => ({ ...b, categoryId: categoriesResult[0].id, addresses: addressesResult[0].id }));
			const brandsResult = await tx.insert(brands).values(seededBrands).returning({ id: brands.id });

			const seedCategoryDiscounts = seedData.categoryDiscounts.map(d => ({ ...d, categoryId: categoriesResult[d.categoryId].id, discountId: discountsResult[d.discountId].id }));
			await tx.insert(categoryDiscounts).values(seedCategoryDiscounts);

			const seededProducts = seedData.products.map(p => ({ ...p, categoryId: categoriesResult[p.categoryId].id, brandId: brandsResult[0].id }));
			const productsResult = await tx.insert(products).values(seededProducts).returning({ id: products.id });

			const seededPayments = seedData.payments.map(p => ({ ...p, promoId: promosResult[0].id }));
			const paymentsResult = await tx.insert(payments).values(seededPayments).returning({ id: payments.id });

			const seededOrders = seedData.order.map(o => ({ ...o, customerId: customersResult[0].id, addressId: addressesResult[0].id, paymentId: paymentsResult[0].id }));
			const ordersResult = await tx.insert(orders).values(seededOrders).returning({ id: orders.id });

			const seededCarts = seedData.carts.map(c => ({ ...c, customerId: customersResult[0].id }));
			await tx.insert(carts).values(seededCarts).returning({ id: carts.id });

			// const seededCartsItem = seedData.cartItems.map((c, index) => (
			// 	{ ...c, cartId: cartsResult[index].id }
			// ));
			// await tx.insert(cartItems).values(seededCartsItem);

			// Seeding SKUs
			let seededProductSkus = seedData.productSkus.map(sku => ({ ...sku, productId: productsResult[sku.productId].id }));
			// seededProductSkus[0].productId = productsResult[0].id;
			const productSkusResult = await tx.insert(productSkus).values(seededProductSkus).returning({ id: productSkus.id });

			// seeding ProductDiscounts
			let seededProductDiscounts = seedData.productDiscounts.map(dis => ({ ...dis, productId: productsResult[dis.productId].id, discountId: discountsResult[dis.discountId].id }));
			await tx.insert(productDiscounts).values(seededProductDiscounts);

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
