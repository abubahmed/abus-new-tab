import { pgTable, uuid, varchar, text, integer, timestamp, jsonb } from "drizzle-orm/pg-core";

export const singleTabs = pgTable("bookmarks", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  url: text("url").notNull(),
  color: varchar("color", { length: 20 }).notNull().default("blue"),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const tabGroups = pgTable("tab_groups", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  color: varchar("color", { length: 20 }).notNull().default("blue"),
  tabs: jsonb("tabs").notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
