import db from "@src/db/db.ts";
import df from "@src/db/db.ts"
import { categories } from "@src/db/models/categories";
import { Category } from "@src/db/types";
import { eq } from "drizzle-orm";

export async function getCategories(): Promise<Category[]> {
    return await db?.query.categories.findMany();
}

export async function getCategoryById(id: number) {
    return await db?.query.categories.findFirst({ where: eq(categories.id, id) });
}