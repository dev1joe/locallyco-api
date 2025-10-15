ALTER TABLE "cart_items" ALTER COLUMN "cart_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_items" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_items" ALTER COLUMN "quantity" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "carts" ALTER COLUMN "customer_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "carts" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "carts" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "quantity_check" CHECK ("cart_items"."quantity" > 0);