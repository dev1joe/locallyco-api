ALTER TABLE "product_sku" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "review" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "review_count" integer;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "average_rating" numeric(3, 2);