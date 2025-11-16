import { Router, type Response, type Request } from "express";
import { eq } from "drizzle-orm";
import z from "zod";

import {
	brandSelectSchema,
	brandInsertSchema,
	brandUpdateSchema,
} from "@src/validators/v1/brands";
import db from "@src/db/db";
import { schema } from "@src/db/schema";
import { to } from "src/utils/to"
import { ApiResponse } from "src/types/v1/response";

export const brandRouter = Router();

// brandRouter.get("/", async (req: Request, res: Response) => {
//
// 	const rawBrands = await to(db.select().from(schema.brands));
// 	if (!rawBrands.success) {
// 		return res.status(500).json({ error: rawBrands.error.message });
// 	}
//
// 	const parsedBrands = await brandSelectSchema.array().safeParseAsync(rawBrands);
//
// 	if (!parsedBrands.success) {
// 		return res.status(500).json({ error: parsedBrands.error.message });
// 	}
//
// 	return res.json({ "result": parsedBrands.data });
// });

brandRouter.get("/:brandId", async (req: Request, res: Response<ApiResponse>) => {

	// Parse parameters
	const paramsSchema = z.object({
		brandId: z.coerce.number(),
	})

	const parsedParams = await paramsSchema.safeParseAsync(req.params);

	if (!parsedParams.success) {
		return res.status(500).json({
			success: false,
			error: parsedParams.error.message
		});
	}

	const { brandId } = parsedParams.data;

	// query and validator need to be finished
	// Query
	const rawBrands = await to(db.query.brands.findFirst({
		where: eq(schema.brands.id, brandId),
		with: {


		}

	}));

	if (!rawBrands.success) {
		return res.status(500).json({
			success: false,
			error: rawBrands.error.message
		});
	}

	const validationSchema = z.strictObject({


	});

	const parsedBrands = await validationSchema.safeParseAsync(rawBrands.data);

	if (!parsedBrands.success) {
		return res.status(500).json({
			success: false,
			error: parsedBrands.error.message
		});
	}

	// Retrun results
	return res.status(200).json({
		success: true,
		result: parsedBrands.data
	});
});

// see better-auth docs to get user
brandRouter.post("/", async (req: Request, res: Response) => {

	const parsedBrands = await brandInsertSchema.array().safeParseAsync(req.body);
	if (!parsedBrands.success) {
		return res.status(400).json({
			success: false,
			error: parsedBrands.error.message,
		});
	}

	try {
		await db.insert(schema.brands).values(parsedBrands.data);
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

brandRouter.put("/:brandId", async (req: Request, res: Response) => {

	const id = await z.coerce.number().safeParseAsync(req.params.id);
	if (!id.success) {
		return res.status(400).json({ error: id.error.message });
	}

	const parsedBrands = await brandUpdateSchema.safeParseAsync(req.body);
	if (!parsedBrands.success) {
		return res.status(400).json({ error: parsedBrands.error.message });
	}

	try {
		await db.update(schema.brands).set(parsedBrands.data).where(eq(schema.brands.id, id.data));
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

brandRouter.delete("/:brandId", async (req: Request, res: Response) => {
	try {
		const id = await z.coerce.number().safeParseAsync(req.params.id);
		if (!id.success) {
			return res.status(400).json({ error: id.error.message });
		}

		const deletedId = await db
			.delete(schema.brands)
			.where(eq(schema.brands.id, id.data))
			.returning({ deleteId: schema.brands.id });

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
