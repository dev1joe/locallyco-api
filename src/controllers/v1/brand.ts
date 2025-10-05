import { Router, type Response, type Request } from "express";

import {
	brandSelectSchema,
	brandInsertSchema,
	brandUpdateSchema,
} from "@src/validators/v1/brands";
import db from "@src/db/db";
import { brands } from "@src/db/models/brands";
import { eq } from "drizzle-orm";
import z from "zod";

export const brandRouter = Router();


async function to<T>(p: Promise<T>): Promise<
	{ success: true, data: T } |
	{ success: false, error: Error }
> {
	return p
		.then<{ success: true, data: T }>((d) => {
			return { success: true, data: d }
		})
		.catch<{ success: false, error: Error }>((err: unknown) => {
			if (err instanceof Error) {
				return { success: false, error: err }
			}
			return { success: false, error: Error(String(err)) }
		}
		);
}

brandRouter.get("/", async (req: Request, res: Response) => {

	const rawbrands = await to(db.select().from(brands));
	if (!rawbrands.success) {
		return res.status(500).json({ error: rawbrands.error.message });
	}

	const parsedbrands = await brandSelectSchema.array().safeParseAsync(rawbrands.data);
	if (!parsedbrands.success) {
		return res.status(500).json({ error: parsedbrands.error.message });
	}

	return res.json({ "result": parsedbrands.data });
});

brandRouter.get("/:id", async (req: Request, res: Response) => {
	const id = await z.coerce.number().safeParseAsync(req.params.id);
	if (!id.success) {
		return res.status(500).json({ error: id.error.message });
	}

	const rawbrands = await to(db.select().from(brands).where(eq(brands.id, id.data)));
	if (!rawbrands.success) {
		return res.status(500).json({ error: rawbrands.error.message });
	}

	const parsedbrands = await brandSelectSchema.array().safeParseAsync(rawbrands.data);
	if (!parsedbrands.success) {
		return res.status(500).json({ error: parsedbrands.error.message });
	}

	return res.json({ "result": parsedbrands.data });
});

brandRouter.post("/", async (req: Request, res: Response) => {

	const parsedbrands = await brandInsertSchema.array().safeParseAsync(req.body);
	if (!parsedbrands.success) {
		return res.status(400).json({
			success: false,
			error: parsedbrands.error.message,
		});
	}

	try {
		await db.insert(brands).values(parsedbrands.data);
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

brandRouter.put("/:id", async (req: Request, res: Response) => {

	const id = await z.coerce.number().safeParseAsync(req.params.id);
	if (!id.success) {
		return res.status(400).json({ error: id.error.message });
	}

	const parsedbrands = await brandUpdateSchema.safeParseAsync(req.body);
	if (!parsedbrands.success) {
		return res.status(400).json({ error: parsedbrands.error.message });
	}

	try {
		await db.update(brands).set(parsedbrands.data).where(eq(brands.id, id.data));
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

brandRouter.delete("/:id", async (req: Request, res: Response) => {
	try {
		const id = await z.coerce.number().safeParseAsync(req.params.id);
		if (!id.success) {
			return res.status(400).json({ error: id.error.message });
		}

		const deletedId = await db
			.delete(brands)
			.where(eq(brands.id, id.data))
			.returning({ deleteId: brands.id });

		if (deletedId.length === 0) {
			return res.status(404).json({
				success: false,
				error: "Brand not found",
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
