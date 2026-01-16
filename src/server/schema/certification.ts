import { portfolio } from "./shared";
import { InferSelectModel } from "drizzle-orm";
import { text, uuid } from "drizzle-orm/pg-core";

export const Certifications = portfolio.table('certifications', {
    id: uuid('id').primaryKey().defaultRandom(),
    color: text('color').notNull(),
    icon_url: text('icon_url').notNull(),
    issued: text('issued').notNull(),
    issuer: text('issuer').notNull(),
    name: text('name').notNull(),
    pdf_url: text('pdf_url').notNull(),
    verify_url: text('verify_url').notNull(),
    skill_id: uuid('skill_id'),
});

export type Certification = InferSelectModel<typeof Certifications>