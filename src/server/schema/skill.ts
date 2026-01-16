import { integer, text, uuid } from "drizzle-orm/pg-core";
import { portfolio } from "./shared";
import { InferSelectModel } from "drizzle-orm";

export const Skills = portfolio.table('skills', {
    id: uuid('id').primaryKey().defaultRandom(),
    level: integer('level').notNull(),
    name: text('name').notNull(),
    category_id: uuid('category_id'),
});

export type Skill = InferSelectModel<typeof Skills>;