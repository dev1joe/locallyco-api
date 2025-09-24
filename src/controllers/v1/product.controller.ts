import * as E from "express";
import * as PS from "../../services/v1/product.service.ts";
import * as SS from "../../services/v1/sku.service.ts";
import { validationResult, matchedData } from "express-validator";

export async function getProducts(req: E.Request, res: E.Response) {
    try {
        const products = await PS.getProducts();

        if (!products) {
            return res.status(500).json({ error: "Failed to retrieve products" });
        }

        return res.json({ "result": products });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Failed to retrieve products" });
    }
}

export async function getProductById(req: E.Request, res: E.Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
    }

    try {
        const product = await PS.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.json({ "result": product });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Failed to retrieve product" });
    }
}

export async function getProductVersions(req: E.Request, res: E.Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
    }

    try {
        const product = await PS.getProductById(id);
        if(! product) {
            return res.status(404).json({ error: "Product not found"});
        }

        const versions = await SS.getSkuByProductId(id);

        if (! versions) {
            return res.status(404).json({error: "Product versions not found"});
        }

        return res.json({ result: versions });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Failed to retrieve product versions" });
    }
}

export async function createProduct(req: E.Request, res: E.Response) {
    try {
        const valResult = validationResult(req);
        if (!valResult.isEmpty()) {
            return res.status(400).json({ errors: valResult.array() });
        }

        await PS.createProduct(matchedData(req, { locations: ["body"] }));
        return res.status(201).json({ message: "Product created successfully" });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Failed to create product" });
    }
}

export async function updateProduct(req: E.Request, res: E.Response) {
    try {
        const id = parseInt(req.params.id);
        if(isNaN(id)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        const valResult = validationResult(req);
        if (!valResult.isEmpty()) {
            return res.status(400).json({ errors: valResult.array() });
        }

        await PS.updateProduct(id, matchedData(req, { locations: ["body"] }));
        return res.status(201).json({ message: "Product updated successfully" });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Failed to update product" });
    }
}

export async function deleteProduct(req: E.Request, res: E.Response) {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid product ID" });
    }

    try {
        const product = await PS.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        await PS.deleteProduct(id);

        return res.json({ message: "Product deleted successfully" });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Failed to delete product" });
    }
}