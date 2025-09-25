import { Router, type Response, type Request } from "express";

import {
	brandSelectSchema,
	brandInsertSchema,
	brandUpdateSchema,
} from "@src/validators/v1/brands";
import db from "@src/db/db";
import brands from "@src/db/models/brand";
import { eq } from "drizzle-orm";
import z from "zod";

export const brandRouter = Router();

brandRouter.get("/", async (req: Request, res: Response) => {
	let rawbrands;

	try {
		rawbrands = await db.select().from(brands);
	} catch (e: unknown) {
		if (e instanceof Error) {
			return res.status(500).json({ error: e.message });
		} else {
			return res.status(500).json({ error: "internal database error" });
		}
	}

	const parsedbrands = await brandSelectSchema.array().safeParseAsync(rawbrands);

	if (!parsedbrands.success) {
		return res.status(500).json({ error: parsedbrands.error.message });
	}

	return res.json({ "result": parsedbrands.data });
});

brandRouter.get("/:id", async (req: Request, res: Response) => {
	let rawbrands;
	const id = await z.coerce.number().safeParseAsync(req.params.id);
	if (!id.success) {
		return res.status(500).json({ error: id.error.message });
	}

	try {
		rawbrands = await db.select().from(brands).where(eq(brands.id, id.data));
	} catch (e: unknown) {
		if (e instanceof Error) {
			return res.status(500).json({ error: e.message });
		} else {
			return res.status(500).json({ error: "internal database error" });
		}
	}

	const parsedbrands = await brandSelectSchema.array().safeParseAsync(rawbrands);

	if (!parsedbrands.success) {
		return res.status(500).json({ error: parsedbrands.error.message });
	}

	return res.json({ "result": parsedbrands.data });
});
