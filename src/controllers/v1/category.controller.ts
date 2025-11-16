import type { Request, Response } from "express";
import * as CS from "@src/services/v1/category.service.ts";
import * as DS from "@src/services/v1/discount.service.ts";

export async function getCategories(req: Request, res: Response) {
    try {
        const categories = await CS.getCategories(req.query);
        return res.json({ result: categories });
    } catch(e) {
        console.log(e);
        return res.status(500).json({ error: "Failed to retrieve categories" })
    }
}

export async function getCategoryById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    if(isNaN(id)) {
        return res.status(400).json({ error: "Invalid Category ID" });
    }

    try {
        const category = await CS.getCategoryById(id, req.query);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        return res.json({ result: category });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Failed to retrieve category" });
    }
}

export async function getCategoryDiscounts(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if(isNaN(id)) {
        return res.status(400).json({ error: "Invalid Category ID"});
    }

    try {
        const category = await CS.getCategoryById(id);
        if(! category) {
            return res.status(404).json({ error: "Category not found"});
        }

        const discounts = await DS.getCategoryDiscounts(id);

        if(!discounts || discounts.length < 1) {
            return res.status(404).json({ error: "Category discounts not found"});
        }

        return res.json({ result: discounts });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Failed to retrieve category discounts"});
    }
}