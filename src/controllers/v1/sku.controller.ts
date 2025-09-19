import * as E from "express";
import * as SS from "../../services/v1/sku.service.ts";
import { validationResult, matchedData } from "express-validator";

export async function getSkus(req: E.Request, res: E.Response) {
    try {
        const sku = await SS.getSku();

        if (!sku) {
            return res.status(500).json({ error: "Failed to retrieve sku" });
        }

        return res.json({ "result": sku });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Failed to retrieve sku" });
    }
}

export async function getSkuById(req: E.Request, res: E.Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid sku ID" });
    }

    try {
        const sku = await SS.getSkuById(id);
        if (!sku) {
            return res.status(404).json({ error: "Sku not found" });
        }

        return res.json({ "result": sku });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Failed to retrieve sku" });
    }
}

export async function createSku(req: E.Request, res: E.Response) {
    try {
        const valResult = validationResult(req);
        if (!valResult.isEmpty()) {
            return res.status(400).json({ errors: valResult.array() });
        }

        await SS.createSku(matchedData(req, { locations: ["body"] }));
        return res.status(201).json({ message: "Sku created successfully" });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Failed to create sku" });
    }
}

export async function updateSku(req: E.Request, res: E.Response) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid sku ID" });
        }

        const valResult = validationResult(req);
        if (!valResult.isEmpty()) {
            return res.status(400).json({ errors: valResult.array() });
        }

        await SS.updateSku(id, matchedData(req, { locations: ["body"] }));
        return res.status(201).json({ message: "Sku updated successfully" });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Failed to update sku" });
    }
}

export async function deleteSku(req: E.Request, res: E.Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid sku ID" });
    }

    try {
        const sku = await SS.getSkuById(id);
        if (!sku) {
            return res.status(404).json({ error: "Sku not found" });
        }

        await SS.deleteSku(id);

        return res.json({ message: "Sku deleted successfully" });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Failed to delete sku" });
    }
}