import type { Request, Response } from "express";
import * as DS from "@src/services/v1/discount.service.ts"

export async function getDiscounts(req: Request, res: Response) {
    try {
        const queryParams = req.query;
        console.log("discount query params", queryParams);
        const discounts = await DS.getDiscounts(queryParams)

        if (! discounts || discounts.length < 1) {
            return res.status(404).json({ message: "No Discounts found"});
        }
        
        return res.json({ "result": discounts });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Failed to retrieve discounts"});
    }
}