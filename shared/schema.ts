import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(), // This will be the email
  password: text("password").notNull(),
  role: text("role", { enum: ["admin", "farmer", "retailer"] }).notNull().default("retailer"),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  farmName: text("farm_name"), // Only for farmers
  shopName: text("shop_name"), // Only for retailers
  isApproved: boolean("is_approved").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true, 
  createdAt: true, 
  isApproved: true // Admin controls this, or defaults to false
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
