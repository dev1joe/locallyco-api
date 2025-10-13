import db from "@src/db/db";
import { reviews } from "@src/db/models/reviews";

export async function getProductRatingStats(productId: number) {
    const result = await db?.execute(`
        SELECT rate, COUNT(*)::int AS count
        FROM reviews
        WHERE product_id = ${productId}
        GROUP BY rate
        ORDER BY rate DESC
    `);

    if (!result) return null;

    const total = result.rows.reduce((sum, r) => sum + Number(r.count), 0) || 0;

    const stats = [5, 4, 3, 2, 1].map(rate => {
        const row = result.rows.find((r) => r.rate === rate);
        if (!row) return { rate, percent: 0 };
        
        const percent = (row.count && total > 0) ? (Number(row.count) / total) * 100 : 0;
        return { rate, percent };
    });

    return stats;
}

export function createReview(productId: number) {
    // TODO: make sure to increase the product's reviews count and recalculate the average rating
}