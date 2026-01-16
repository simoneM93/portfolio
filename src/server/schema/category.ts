import { integer, text, uuid } from "drizzle-orm/pg-core";
import { portfolio } from "./shared";
import { InferSelectModel } from "drizzle-orm";

export const Categories = portfolio.table('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  order: integer('order').notNull(),
});

export type Category = InferSelectModel<typeof Categories>