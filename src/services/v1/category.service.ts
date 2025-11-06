import db from "@src/db/db.ts";
import { categories } from "@src/db/models/categories";
import { Category } from "@src/db/types";
import { and, eq, ilike, inArray, isNull, or } from "drizzle-orm";

export async function getCategories(params?: Record<string, any>): Promise<Category[]> {
    let withOptions: Record<string, any> = {};
    let whereOptions;

    if (params) {
        [withOptions, whereOptions] = applyQueryParams(params);
    }

    return await db?.query.categories.findMany({ with: withOptions, where: whereOptions });
}

export async function getCategoryById(id: number, params?: Record<string, any>) {
    let withOptions: Record<string, any> = {};

    if (params) {
        withOptions = applyQueryParams(params);
    }

    return await db?.query.categories.findFirst({ where: eq(categories.id, id), with: withOptions });
}

function applyQueryParams(params: Record<string, any>) {
    const withOptions: Record<string, any> = {};
    let whereOptions: any;

    // [____handling images____]
    if ('images' in params || 'image' in params || 'img' in params) {
        withOptions.image = true;
    }

    // [____handle children____]
    let childrenParamValue: any;
    
    if ('children' in params) childrenParamValue = params.children; // plural
    if ('child' in params) childrenParamValue = params.child; // singular

    if (childrenParamValue !== undefined) {
        // in case children are requested, include only parent categories
        // children will be nested in there parents
        whereOptions = and(isNull(categories.parentId));

        const requestedCount = parseInt(childrenParamValue);

        if (!isNaN(requestedCount) && requestedCount >= 1) {
            console.log("category children is a number");
            withOptions.children = { limit: Math.min(requestedCount, 10) };
        } else {
            console.log("category children is NOT a number, setting a default of 5 children");
            withOptions.children = { limit: 5 };
        }

        if ('images' in params || 'image' in params || 'img' in params) {
            withOptions.children.with = { image: true }
        }
    }

    // [____handle names____]
    let categoryNamesParamValue: string|undefined;
    if ('name' in params) categoryNamesParamValue = params.name;
    if ('names' in params) categoryNamesParamValue = params.names;
    
    if (categoryNamesParamValue !== undefined) {
        const categoryNames = categoryNamesParamValue.split(',');

        const conditions = categoryNames.map(name => 
            ilike(categories.name, `%${name}%`)
        )
        whereOptions = and(or(...conditions));
    }

    return [withOptions, whereOptions];
}