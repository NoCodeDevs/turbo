import { pgSchema, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgSchema("auth").table("users", {
  id: uuid("id").primaryKey(),
});
