CREATE TABLE "category_images" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "category_images_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"url" varchar NOT NULL,
	"height" integer DEFAULT 400,
	"label_position" varchar DEFAULT 'center'
);
--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "image_id" integer;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_image_id_category_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."category_images"("id") ON DELETE no action ON UPDATE no action;