import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const orderRequests = sqliteTable("order_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  eventDate: text("event_date").notNull(),
  occasion: text("occasion").notNull(),
  quantity: integer("quantity").notNull(),
  flavor: text("flavor").notNull(),
  fulfillment: text("fulfillment").notNull(),
  budget: text("budget").notNull(),
  theme: text("theme").notNull().default(""),
  notes: text("notes").notNull().default(""),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_order_requests_created_at").on(table.createdAt), index("idx_order_requests_status").on(table.status)]);

export const siteAdmins = sqliteTable("site_admins", {
  userId: text("user_id").primaryKey(),
  email: text("email").notNull(),
  claimedAt: text("claimed_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
