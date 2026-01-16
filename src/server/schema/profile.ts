import { text, uuid } from "drizzle-orm/pg-core";
import { portfolio } from "./shared";
import { InferSelectModel } from "drizzle-orm";

export const Profiles = portfolio.table('profiles', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    surname: text('surname').notNull(),
    image_url: text('image_url'),
});

export type Profile = InferSelectModel<typeof Profiles>;