CREATE TABLE "brand_discounts" (
	"discount_id" integer NOT NULL,
	"brand_id" integer NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "brand_discounts_discount_id_brand_id_pk" PRIMARY KEY("discount_id","brand_id")
);
--> statement-breakpoint
CREATE TABLE "category_discounts" (
	"discount_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "category_discounts_discount_id_category_id_pk" PRIMARY KEY("discount_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "discounts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "discounts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(256),
	"type" varchar(100) NOT NULL,
	"value" integer NOT NULL,
	"start_date" timestamp,
	"end_date" timestamp,
	"is_active" boolean DEFAULT true,
	"applies_to_type" varchar(100),
	"min_purchase_amount_cents" integer,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "product_discounts" (
	"discount_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "product_discounts_discount_id_product_id_pk" PRIMARY KEY("discount_id","product_id")
);
--> statement-breakpoint
ALTER TABLE "promo_codes" RENAME COLUMN "key" TO "code";--> statement-breakpoint
ALTER TABLE "promo_codes" ADD COLUMN "discount_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "promo_codes" ADD COLUMN "max_use_global" integer;--> statement-breakpoint
ALTER TABLE "promo_codes" ADD COLUMN "use_count_global" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "promo_codes" ADD COLUMN "max_use_per_customer" integer;--> statement-breakpoint
ALTER TABLE "promo_codes" ADD COLUMN "is_stackable" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "brand_discounts" ADD CONSTRAINT "brand_discounts_discount_id_discounts_id_fk" FOREIGN KEY ("discount_id") REFERENCES "public"."discounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brand_discounts" ADD CONSTRAINT "brand_discounts_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_discounts" ADD CONSTRAINT "category_discounts_discount_id_discounts_id_fk" FOREIGN KEY ("discount_id") REFERENCES "public"."discounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_discounts" ADD CONSTRAINT "category_discounts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_discounts" ADD CONSTRAINT "product_discounts_discount_id_discounts_id_fk" FOREIGN KEY ("discount_id") REFERENCES "public"."discounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_discounts" ADD CONSTRAINT "product_discounts_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promo_codes" ADD CONSTRAINT "promo_codes_discount_id_discounts_id_fk" FOREIGN KEY ("discount_id") REFERENCES "public"."discounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "promo_codes" DROP COLUMN "percentage";