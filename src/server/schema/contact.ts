import { text, uuid } from "drizzle-orm/pg-core";
import { portfolio } from "./shared";
import { InferSelectModel } from "drizzle-orm";

export const Contacts = portfolio.table('contacts', {
  id: uuid('id').primaryKey().defaultRandom(),
  profile_id: uuid('profile_id'),
  email: text('email').notNull(),
  facebook_url: text('facebook_url').notNull(),
  instagram_url: text('instagram_url').notNull(),
  linkedin_url: text('linkedin_url').notNull(),
  phone: text('phone').notNull(),
  telegram_url: text('telegram_url').notNull(),
  whatsapp_url: text('whatsapp_url').notNull(),
});

export type Contact = InferSelectModel<typeof Contacts>;