import { InferSelectModel } from "drizzle-orm";
import { integer, pgSchema, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";

export const portfolio = pgSchema("portfolio");

export const Profiles = portfolio.table('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  surname: text('surname').notNull(),
  image_url:text('image_url'),
});

export const Contacts = portfolio.table('contacts', {
  id: uuid('id').primaryKey(),
  profile_id: uuid('profile_id'),
  email: text('email').notNull(),
  facebook_url: text('facebook_url').notNull(),
  instagram_url: text('instagram_url').notNull(),
  linkedin_url: text('linkedin_url').notNull(),
  phone: text('phone').notNull(),
  telegram_url: text('telegram_url').notNull(),
  whatsapp_url: text('whatsapp_url').notNull(),
});

export const Categories = portfolio.table('categories', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  order: integer('order').notNull(),
});

export const Skills = portfolio.table('skills', {
  id: uuid('id').primaryKey(),
  level: integer('level').notNull(),
  name: text('name').notNull(),
  category_id: uuid('category_id'),
});

export const Certifications = portfolio.table('certifications', {
  id: uuid('id').primaryKey(),
  color: text('color').notNull(),
  icon_url: text('icon_url').notNull(),
  issued: text('issued').notNull(),
  issuer: text('issuer').notNull(),
  name: text('name').notNull(),
  pdf_url: text('pdf_url').notNull(),
  verify_url: text('verify_url').notNull(),
  skill_id: uuid('skill_id'),
});

export type Profile = InferSelectModel<typeof Profiles>;
export type Contact = InferSelectModel<typeof Contacts>;
export type Category = InferSelectModel<typeof Categories>
export type Skill = InferSelectModel<typeof Skills>;
export type Certification = InferSelectModel<typeof Certifications>

export interface CategoryWithSkillsAndCerts {
  category: Category;
  skills: Array<{
    skill: Skill;
    certifications: Certification[];
  }>;
}

export interface ProfileWithContact {
  profile: Profile;
  contact: Contact | null;
}