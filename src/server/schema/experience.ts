import { integer, text, uuid } from "drizzle-orm/pg-core";
import { portfolio } from "./shared";
import { InferSelectModel } from "drizzle-orm";

export const Experiences = portfolio.table('experiences', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type').notNull(),
  title: text('title').notNull(),
  org: text('org').notNull(),
  period: text('period').notNull(),
  bullets: text('bullets').array().notNull(),
  order: integer('order').notNull(),
});

export type Experience = InferSelectModel<typeof Experiences>;