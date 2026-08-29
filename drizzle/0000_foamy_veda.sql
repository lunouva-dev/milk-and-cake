CREATE TABLE `order_requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`event_date` text NOT NULL,
	`occasion` text NOT NULL,
	`quantity` integer NOT NULL,
	`flavor` text NOT NULL,
	`fulfillment` text NOT NULL,
	`budget` text NOT NULL,
	`theme` text DEFAULT '' NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_order_requests_created_at` ON `order_requests` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_order_requests_status` ON `order_requests` (`status`);--> statement-breakpoint
CREATE TABLE `site_admins` (
	`user_id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`claimed_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
