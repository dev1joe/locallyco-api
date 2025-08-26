ALTER TABLE `brands` ADD `updated_at` timestamp;--> statement-breakpoint
ALTER TABLE `brands` ADD `created_at` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `brands` ADD `deleted_at` timestamp;--> statement-breakpoint
ALTER TABLE `categories` ADD `updated_at` timestamp;--> statement-breakpoint
ALTER TABLE `categories` ADD `created_at` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `categories` ADD `deleted_at` timestamp;--> statement-breakpoint
ALTER TABLE `products` ADD `updated_at` timestamp;--> statement-breakpoint
ALTER TABLE `products` ADD `created_at` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `products` ADD `deleted_at` timestamp;