import { Router, type Response, type Request } from "express";
import { and, eq, exists, sql } from "drizzle-orm";
import z from "zod"

import {
	cartItemInsertSchema,
	cartItemUpdateSchema,
} from "@src/validators/v1/cartItems";
import { schema } from "@src/db/schema";
import db from "@src/db/db";
import { to } from "@src/utils/to"
import { ApiResponse } from "@src/types/v1/response";


export const cartItemRouter = Router({ mergeParams: true })

const getCustomerCartQuery = (customerId: number, cartId: number) => {
	return db
		.select({ id: schema.carts.id })
		.from(schema.carts)
		.where(and(
			eq(schema.carts.customerId, customerId),
			eq(schema.carts.id, cartId)
		)
		)
}

// make new cart item entry
cartItemRouter.post("/", async (req: Request, res: Response<ApiResponse>) => {
	// Parse parameters
	const paramsSchema = z.object({
		customerId: z.coerce.number(),
		cartId: z.coerce.number(),
	})

	const parsedParams = await paramsSchema.safeParseAsync(req.params);

	if (!parsedParams.success) {
		return res.status(400).json({
			success: false,
			error: parsedParams.error.issues,
		});
	}

	const { cartId, customerId } = parsedParams.data

	// Parse body
	const parsedCartItems = await cartItemInsertSchema.safeParseAsync({
		cartId: cartId,
		customerId: customerId,
		...req.body
	});

	if (!parsedCartItems.success) {
		return res.status(400).json({
			success: false,
			error: parsedCartItems.error.issues,
		});
	}

	// Query
	const updatedId = await to(db.transaction(async (tx) => {

		const userCartId = await getCustomerCartQuery(customerId, cartId)

		if (userCartId.length === 0) {
			tx.rollback()
		}

		const id = await tx
			.insert(schema.cartItems)
			.values({
				cartId: parsedCartItems.data.cartId,
				productId: parsedCartItems.data.productId,
				quantity: parsedCartItems.data.quantity,
			})
			.returning({ id: schema.cartItems.id })

		return id
	}));

	if (!updatedId.success) {
		return res.json({
			success: false,
			error: updatedId.error.message,
		});
	}

	// Return result
	return res.json({
		success: true,
		result: updatedId.data,
	});
})

// update cart item quantity
cartItemRouter.put("/:cartItemId", async (req: Request, res: Response<ApiResponse>) => {

	const paramsSchema = z.object({
		customerId: z.coerce.number(),
		cartId: z.coerce.number(),
		cartItemId: z.coerce.number(),
	})

	const parsedParams = await paramsSchema.safeParseAsync(req.params);

	if (!parsedParams.success) {
		return res.status(400).json({
			success: false,
			error: parsedParams.error.issues,
		});
	}

	const { cartId, cartItemId, customerId } = parsedParams.data

	const parsedCartItems = await cartItemUpdateSchema.safeParseAsync(req.body);

	if (!parsedCartItems.success) {
		return res.status(400).json({
			success: false,
			error: parsedCartItems.error.issues,
		});
	}

	const updatedId = await to(db
		.update(schema.cartItems)
		.set({
			quantity: parsedCartItems.data.quantity,
			updatedAt: sql`NOW()`
		})
		.where(and(
			exists(getCustomerCartQuery(customerId, cartId)),
			eq(schema.cartItems.cartId, cartId),
			eq(schema.cartItems.id, cartItemId),
		))
		.returning({ id: schema.cartItems.id })
	);

	if (!updatedId.success) {
		return res.json({
			success: false,
			error: updatedId.error.message,
		});
	}

	if (updatedId.data.length === 0) {
		return res.status(404).json({
			success: false,
			error: "cart not found",
		});
	}

	return res.json({
		success: true,
		result: updatedId.data,
	});
});

// not soft delete
// delete cartItem in user cart
cartItemRouter.delete("/:cartItemId", async (req: Request, res: Response<ApiResponse>) => {

	// Parse parameters
	const paramsSchema = z.object({
		customerId: z.coerce.number(),
		cartId: z.coerce.number(),
		cartItemId: z.coerce.number(),
	})

	const parsedParams = await paramsSchema.safeParseAsync(req.params);

	if (!parsedParams.success) {
		return res.status(400).json({
			success: false,
			error: parsedParams.error.issues,
		});
	}

	const { cartId, cartItemId, customerId } = parsedParams.data

	// Query
	const deletedId = await to(db
		.delete(schema.cartItems)
		.where(and(
			exists(getCustomerCartQuery(customerId, cartId)),
			eq(schema.cartItems.cartId, cartId),
			eq(schema.cartItems.id, cartItemId),
		))
		.returning({ id: schema.cartItems.id })
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
