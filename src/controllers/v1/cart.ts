import { Router, type Response, type Request } from "express";
import { eq, and, sql } from "drizzle-orm";
import z from "zod";

import {
	cartSelectSchema,
	cartInsertSchema,
	cartUpdateSchema,
} from "src/validators/v1/carts";

import { productsSelectSchema } from "src/validators/v1/products"
import { cartItemSelectSchema } from "src/validators/v1/cartItems"
import db from "@src/db/db";
import { schema } from "@src/db/schema";
import { to } from "src/utils/to"
import { ApiResponse } from "@src/types/v1/response";
import { cartItemRouter } from "./cartItem";

export const cartRouter = Router({ mergeParams: true });
cartRouter.use("/:cartId", cartItemRouter);

// Get all user carts with cart items
cartRouter.get("/", async (req: Request, res: Response<ApiResponse>) => {

	// Parse parameters
	const paramsSchema = z.object({
		customerId: z.coerce.number(),
	})

	const parsedParams = await paramsSchema.safeParseAsync(req.params)
	if (!parsedParams.success) {
		return res.status(500).json({
			success: false,
			error: parsedParams.error.issues,
		});
	}

	const { customerId } = parsedParams.data

	// Query
	const rawCarts = await to(db.query.carts.findMany({
		where: eq(schema.carts.customerId, customerId),
		with: {
			cartItems: {
				with: { product: true }
			}
		},
	}))

	if (!rawCarts.success) {
		return res.status(500).json({
			success: false,
			error: rawCarts.error.message,
		});
	}

	const validationSchema = z.strictObject({
		...cartSelectSchema.shape,
		cartItems: z.strictObject({
			...cartItemSelectSchema.shape,
			product: productsSelectSchema,
		}).array(),
	}).array()

	const parsedCarts = await validationSchema.safeParseAsync(rawCarts.data);

	if (!parsedCarts.success) {
		return res.status(500).json({
			success: false,
			error: parsedCarts.error.issues,
		});
	}

	// const imgURL = parsedCarts.data.map((cart) => {
	// 	return cart.cartItems.map((cartItem) => {
	// 		return "http://products/images/".concat(cartItem.product.imageUrl as string)
	// 	})
	// })
	return res.json({
		success: true,
		result: parsedCarts.data,
	});
});
// no query for a specific cart

// make a new user cart
cartRouter.post("/", async (req: Request, res: Response<ApiResponse>) => {

	// Parse parameters
	const paramsSchema = z.object({
		customerId: z.coerce.number(),
	})

	const parsedParams = await paramsSchema.safeParseAsync(req.params);

	if (!parsedParams.success) {
		return res.status(400).json({
			success: false,
			error: parsedParams.error.issues,
		});
	}

	const { customerId } = parsedParams.data

	// Parse body
	const parsedcarts = await cartInsertSchema.safeParseAsync({ customerId: customerId, ...req.body });
	if (!parsedcarts.success) {
		return res.status(400).json({
			success: false,
			error: parsedcarts.error.issues,
		});
	}

	// Query
	const newCartId = await to(db
		.insert(schema.carts)
		.values({
			customerId: parsedcarts.data.customerId,
			name: parsedcarts.data.name,
			status: parsedcarts.data.status,
		})
		.returning({ id: schema.carts.id })
	);

	if (!newCartId.success) {
		return res.status(500).json({
			success: false,
			error: newCartId.error.message,
		});
	}

	// Return results
	return res.json({
		success: true,
		result: newCartId.data,
	});
});

// update name and/or status of cart
cartRouter.put("/:cartId", async (req: Request, res: Response<ApiResponse>) => {
	// Parse parameters
	const paramsSchema = z.object({
		cartId: z.coerce.number(),
		customerId: z.coerce.number(),
	})

	const parsedParams = await paramsSchema.safeParseAsync(req.params.id);

	if (!parsedParams.success) {
		return res.status(400).json({
			success: false,
			error: parsedParams.error.issues,
		});
	}

	const { cartId, customerId } = parsedParams.data

	// Parse body
	const parsedcarts = await cartUpdateSchema.safeParseAsync(req.body);
	if (!parsedcarts.success) {
		return res.status(400).json({
			success: false,
			error: parsedcarts.error.issues,
		});
	}

	// Query
	const newCartId = await to(db
		.update(schema.carts)
		.set({
			name: parsedcarts.data.name,
			status: parsedcarts.data.status,
			updatedAt: sql`NOW()`
		})
		.where(and(eq(schema.carts.id, cartId), eq(schema.carts.customerId, customerId)))
		.returning({ id: schema.carts.id })
	);

	if (!newCartId.success) {
		return res.status(500).json({
			success: false,
			error: newCartId.error.message,
		});
	}

	if (newCartId.data.length === 0) {
		return res.status(404).json({
			success: false,
			error: "cart not found",
		});
	}


	// Return result
	return res.json({
		success: true,
		result: newCartId.data,
	});
});

// not soft delete
// delete the whole user cart
cartRouter.delete("/:cartId", async (req: Request, res: Response<ApiResponse>) => {

	// Parse parameters
	const paramsSchema = z.object({
		cartId: z.coerce.number(),
		customerId: z.coerce.number(),
	})

	const parsedParams = await paramsSchema.safeParseAsync(req.params.id);

	if (!parsedParams.success) {
		return res.status(400).json({
			success: false,
			error: parsedParams.error.issues,
		});
	}

	const { cartId, customerId } = parsedParams.data

	// Query
	const deletedId = await to(db
		.delete(schema.carts)
		.where(and(eq(schema.carts.id, cartId), eq(schema.carts.customerId, customerId)))
		.returning({ id: schema.carts.id })
	);

	if (!deletedId.success) {
		return res.json({
			success: false,
			error: deletedId.error.message,
		});
	}

	if (deletedId.data.length === 0) {
		return res.status(404).json({
			success: false,
			error: "cart not found",
		});
	}

	// Return result
	return res.json({
		success: true,
		result: deletedId.data,
	});
});
