import {decimal, pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";

export const transactionSchema = pgTable("transaction", {
  id: uuid().defaultRandom().primaryKey(),

  acquirer: text("acquirer").notNull(),
  currency: text("currency").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2}).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});