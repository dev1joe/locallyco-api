ALTER TABLE "products" ADD COLUMN "image_url" varchar(256);--> statement-breakpoint
ALTER TABLE "product_sku" ADD COLUMN "images" varchar[];