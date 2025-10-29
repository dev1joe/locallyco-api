import { reset, seed } from "drizzle-seed"
import db from "./db.ts"
import { schema } from "./schema.ts"

async function main() {

	await reset(db, schema);

	// consult "https://orm.drizzle.team/docs/seed-functions#phonenumber" for seeding the user's phone number
	await seed(db, schema, { seed: 123 }).refine((f) => ({

		cartItems: {
			columns: {
				quantity: f.int({ minValue: 1, maxValue: 50, isUnique: false })
			},
		},

		categories: {
			count: 10,
			defaultColumns: false,
			columns: {
				name: f.city(),
				description: f.loremIpsum(),
			}
		},

		brands: {
			count: 10,
			defaultColumns: false,
			columns: {
				name: f.companyName(),
				description: f.loremIpsum(),
				categoryId: f.int({ minValue: 1, maxValue: 10 }),
			}
		},

		discounts: {
			count: 20,
			defaultColumns: false,
			columns: {
				name: f.valuesFromArray({ values: Array.from({ length: 10 }, (_, i) => `Sample Discount ${i + 1}`) }),
				type: f.valuesFromArray({ values: ['percentage', 'fixed_amount'] }),
				value: f.int({ minValue: 5, maxValue: 50 }),
				isActive: f.boolean(),
				appliesToType: f.valuesFromArray({ values: ['product', 'category', 'brand', 'cart'] }),
				startDate: f.date({ minDate: new Date('2025-08-01'), maxDate: new Date('2025-09-31') }),
				endDate: f.date({ minDate: new Date('2025-10-10'), maxDate: new Date('2025-12-31') }),
				minPurchaseAmountCents: f.int({ minValue: 0, maxValue: 5000 }),
			},
			with: {
				productDiscounts: [{
					weight: 1,
					count: 1,
					defaultColumns: false,
					columns: {
						discountId: f.int({ minValue: 1, maxValue: 50, isUnique: true }),
						productId: f.int({ minValue: 1, maxValue: 10 }),
					},
				},],
				discountBrand: [{
					weight: 1,
					count: 1,
					defaultColumns: false,
					columns: {
						discountId: f.int({ minValue: 1, maxValue: 50, isUnique: true }),
						brandId: f.int({ minValue: 1, maxValue: 10 })
					}
				},],
				categoryDiscounts: [{
					weight: 1,
					count: 1,
					defaultColumns: false,
					columns: {
						discountId: f.int({ minValue: 1, maxValue: 50, isUnique: true }),
						categoryId: f.int({ minValue: 1, maxValue: 10, isUnique: true })
					}
				},],
			}
		}
	}));

	await seed(db, schema, { seed: 1234 }).refine((f) => ({
		products: {
			count: 2,
			defaultColumns: false,
			columns: {
				name: f.valuesFromArray({ values: Array.from({ length: 5 }, (_, i) => `Sample Hoodie ${i + 1}`) }),
				description: f.loremIpsum(),
				imageUrl: f.valuesFromArray({ values: ['https://placehold.co/600x400/fff/000'] }),
				averageRating: f.number({ minValue: 1, maxValue: 5, precision: 10 }),
				reviewCount: f.number({ minValue: 0, maxValue: 1000 }),
				attributes: f.valuesFromArray({
					values: [`[{ "name": "size", "type": "string", "values": ["s", "m", "l", "xl"] }, { "name": "color", "type": "string", "values": ["#f00", "#0f0", "#00f", "#000"] }]`]
				}),
			},
			with: {
				productSkus: [
					{ weight: (1 / 16), count: 1, defaultColumns: false, columns: { attributes: { 'color': '#000', 'size': 'S' }, quantity: 211, priceCent: 5500, images: ['https://placehold.co/600x400/fff/000?text=T-shirt'] } },
					{ weight: (1 / 16), count: 1, defaultColumns: false, columns: { attributes: { 'color': '#000', 'size': 'M' }, quantity: 107, priceCent: 5500, images: ['https://placehold.co/600x400/fff/000?text=T-shirt'] } },
					{ weight: (1 / 16), count: 1, defaultColumns: false, columns: { attributes: { 'color': '#000', 'size': 'L' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/000?text=T-shirt'] } },
					{ weight: (1 / 16), count: 1, defaultColumns: false, columns: { attributes: { 'color': '#000', 'size': 'XL' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/000?text=T-shirt'] } },
					{ weight: (1 / 16), count: 1, defaultColumns: false, columns: { attributes: { 'color': '#f00', 'size': 'S' }, quantity: 211, priceCent: 5500, images: ['https://placehold.co/600x400/fff/f00?text=T-shirt'] } },
					{ weight: (1 / 16), count: 1, defaultColumns: false, columns: { attributes: { 'color': '#f00', 'size': 'M' }, quantity: 107, priceCent: 5500, images: ['https://placehold.co/600x400/fff/f00?text=T-shirt'] } },
					{ weight: (1 / 16), count: 1, defaultColumns: false, columns: { attributes: { 'color': '#f00', 'size': 'L' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/f00?text=T-shirt'] } },
					{ weight: (1 / 16), count: 1, defaultColumns: false, columns: { attributes: { 'color': '#f00', 'size': 'XL' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/f00?text=T-shirt'] } },
					{ weight: (1 / 16), count: 1, defaultColumns: false, columns: { attributes: { 'color': '#0f0', 'size': 'S' }, quantity: 211, priceCent: 5500, images: ['https://placehold.co/600x400/fff/0f0?text=T-shirt'] } },
					{ weight: (1 / 16), count: 1, defaultColumns: false, columns: { attributes: { 'color': '#0f0', 'size': 'M' }, quantity: 107, priceCent: 5500, images: ['https://placehold.co/600x400/fff/0f0?text=T-shirt'] } },
					{ weight: (1 / 16), count: 1, defaultColumns: false, columns: { attributes: { 'color': '#0f0', 'size': 'L' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/0f0?text=T-shirt'] } },
					{ weight: (1 / 16), count: 1, defaultColumns: false, columns: { attributes: { 'color': '#0f0', 'size': 'XL' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/0f0?text=T-shirt'] } },
					{ weight: (1 / 16), count: 1, defaultColumns: false, columns: { attributes: { 'color': '#00f', 'size': 'S' }, quantity: 211, priceCent: 5500, images: ['https://placehold.co/600x400/fff/00f?text=T-shirt'] } },
					{ weight: (1 / 16), count: 1, defaultColumns: false, columns: { attributes: { 'color': '#00f', 'size': 'M' }, quantity: 107, priceCent: 5500, images: ['https://placehold.co/600x400/fff/00f?text=T-shirt'] } },
					{ weight: (1 / 16), count: 1, defaultColumns: false, columns: { attributes: { 'color': '#00f', 'size': 'L' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/00f?text=T-shirt'] } },
					{ weight: (1 / 16), count: 1, defaultColumns: false, columns: { attributes: { 'color': '#00f', 'size': 'XL' }, quantity: 112, priceCent: 5500, images: ['https://placehold.co/600x400/fff/00f?text=T-shirt'] } },
				],
				reviews: [
					{ weight: (1 / 8), count: 1, defaultColumns: false, columns: { rate: 3, comment: 'Very basic hoodie.' } },
					{ weight: (1 / 8), count: 1, defaultColumns: false, columns: { rate: 4, comment: 'Comfortable fit, good material.' } },
					{ weight: (1 / 8), count: 1, defaultColumns: false, columns: { rate: 4, comment: 'This hoodie looks COOL!' } },
					{ weight: (1 / 8), count: 1, defaultColumns: false, columns: { rate: 4, comment: 'Amazing Hoodie' } },
					{ weight: (1 / 8), count: 1, defaultColumns: false, columns: { rate: 4, comment: 'Can you add a purple one?' } },
					{ weight: (1 / 8), count: 1, defaultColumns: false, columns: { rate: 4, comment: 'Nice Hoodie, shipped quickly!' } },
					{ weight: (1 / 8), count: 1, defaultColumns: false, columns: { rate: 4, comment: 'Good Hoodie' } },
					{ weight: (1 / 8), count: 1, defaultColumns: false, columns: { rate: 2, comment: `Did't like the material, there are better materials out in the market.` } },
				]
			}
		}
	}));

	await seed(db, schema, { seed: 12345 }).refine((f) => ({
		products: {
			count: 2,
			defaultColumns: false,
			columns: {
				name: f.valuesFromArray({ values: Array.from({ length: 5 }, (_, i) => `Sample Product ${i + 1}`) }),
				description: f.loremIpsum(),
				imageUrl: f.valuesFromArray({ values: ['https://placehold.co/600x400/fff/000'] }),
				averageRating: f.number({ minValue: 1, maxValue: 5, precision: 10 }),
				reviewCount: f.number({ minValue: 0, maxValue: 1000 }),
				attributes: f.valuesFromArray({ values: [`[{ "name": "size", "type": "integer", "values": ["27", "32"] }]`] }),
			},
			with: {
				productSkus: [{
					weight: 1,
					count: 3,
					columns: {
						skuCode: 'MONITOR-UHD-GRAY',
						attributes: { 'size': '27' },
						quantity: 50,
						priceCent: 35000,
						images: ['https://prd.place/400?id=5&p=40']
					}
				}],
				reviews: [
					{ weight: (1 / 6), count: 1, defaultColumns: false, columns: { rate: 5, comment: 'This monitor is a game changer!' } },
					{ weight: (1 / 6), count: 1, defaultColumns: false, columns: { rate: 4, comment: 'A solid monitor.' } },
					{ weight: (1 / 6), count: 1, defaultColumns: false, columns: { rate: 3, comment: `A nice monitor, but would've been better with 044 Hz.` } },
					{ weight: (1 / 6), count: 1, defaultColumns: false, columns: { rate: 3, comment: `Good Monitor!` } },
					{ weight: (1 / 6), count: 1, defaultColumns: false, columns: { rate: 4, comment: `Nice Monitor!` } },
					{ weight: (1 / 6), count: 1, defaultColumns: false, columns: { rate: 4, comment: `Amazing Monitor!` } }
				]
			}
		}
	}));
}


main();
