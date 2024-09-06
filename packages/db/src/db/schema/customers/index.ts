import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { usersTable } from "../users";

export const billingStatusEnum = pgEnum("status", [
  "ACTIVE",
  "CANCELED",
  "INCOMPLETE",
  "INCOMPLETE_EXPIRED",
  "PAST_DUE",
  "PAUSED",
  "TRIALING",
  "UNPAID",
]);

export const pricingPlanTypeEnum = pgEnum("plan", [
  "FREE",
  "PREMIUM",
  "ENTERPRISE",
]);

export const customers = pgTable("customers", {
  userId: uuid("userId")
    .references(() => usersTable.id, {
      onDelete: "cascade",
    })
    .primaryKey(),
  customerId: text("customerId").notNull(),
  status: billingStatusEnum("status"),
  plan: pricingPlanTypeEnum("plan"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const insertCustomerSchema = createInsertSchema(customers);
export const selectCustomerSchema = createSelectSchema(customers);

export type InsertCustomer = typeof customers.$inferInsert;
export type SelectCustomer = typeof customers.$inferSelect;
