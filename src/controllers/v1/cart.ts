import { Router, type Response, type Request } from "express";
import { eq } from "drizzle-orm";
import z from "zod";

import {
	cartSelectSchema,
	cartInsertSchema,
	cartUpdateSchema,
} from "src/validators/v1/carts";

import {
	productsSelectSchema,
	productsInsertSchema,
	productsUpdateSchema
} from "src/validators/v1/products"

import {
	cartItemSelectSchema,
	cartItemInsertSchema,
	cartItemUpdateSchema
} from "src/validators/v1/cartItems"
import db from "@src/db/db";
import { schema } from "@src/db/schema";
import { to } from "src/utils/to"


export const cartRouter = Router({ mergeParams: true });

cartRouter.get("/", async (req: Request, res: Response) => {

	const rawcustomerId = await z.coerce.number().safeParseAsync(req.params.customerId)
	if (!rawcustomerId.success) {
		return res.status(500).json({ error: rawcustomerId.error.issues, hello: "hello" });
	}
	const customerId = rawcustomerId.data

	const rawCarts = await to(db.query.cart.findMany({
		with: {
			cartItems: {
				with: { product: true }
			}
		},
		where: eq(schema.cart.customerId, customerId)
	}))

	if (!rawCarts.success) {
		return res.status(500).json({ error: rawCarts.error.message });
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
		return res.status(500).json({ error: parsedCarts.error.issues });
	}

	// const imgURL = parsedCarts.data.map((cart) => {
	// 	return cart.cartItems.map((cartItem) => {
	// 		return "http://products/images/".concat(cartItem.product.imageUrl as string)
	// 	})
	// })
	return res.json({ result: parsedCarts.data, });
});

cartRouter.post("/:cartId", async (req: Request, res: Response) => {

	const parsedcarts = await cartInsertSchema.array().safeParseAsync(req.body);
	if (!parsedcarts.success) {
		return res.status(400).json({
			success: false,
			error: parsedcarts.error.issues,
		});
	}

	try {
		await db.insert(schema.cart).values(parsedcarts.data);
	} catch (e: unknown) {
		if (e instanceof Error) {
			return res.status(500).json({
				success: false,
				error: e.message,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: "internal database error",
			});
		}
	}

	return res.json({ success: true });
});

cartRouter.put("/:id", async (req: Request, res: Response) => {

	const id = await z.coerce.number().safeParseAsync(req.params.id);
	if (!id.success) {
		return res.status(400).json({ error: id.error.issues });
	}

	const parsedcarts = await cartUpdateSchema.safeParseAsync(req.body);
	if (!parsedcarts.success) {
		return res.status(400).json({ error: parsedcarts.error.issues });
	}

	try {
		await db.update(schema.cart).set(parsedcarts.data).where(eq(schema.cart.id, id.data));
	} catch (e: unknown) {
		if (e instanceof Error) {
			return res.status(500).json({
				success: false,
				error: e.message,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: "internal database error",
			});
		}
	}

	return res.json({ success: true });
});

cartRouter.delete("/:id", async (req: Request, res: Response) => {
	try {
		const id = await z.coerce.number().safeParseAsync(req.params.id);
		if (!id.success) {
			return res.status(400).json({ error: id.error.issues });
		}

		const deletedId = await db
			.delete(schema.cart)
			.where(eq(schema.cart.id, id.data))
			.returning({ deleteId: schema.cart.id });

		if (deletedId.length === 0) {
			return res.status(404).json({
				success: false,
				error: "cart not found",
			});
		}
		return res.json({ success: true });
	} catch (e: unknown) {
		if (e instanceof Error) {
			return res.status(500).json({
				success: false,
				error: e.message,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: "internal database error",
			});
		}
	}
});
