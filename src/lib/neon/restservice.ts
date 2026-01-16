import { db } from "./db";
import { Categories, CategoryWithSkillsAndCerts, Certifications, Contact, Contacts, Profile, Profiles, ProfileWithContact, Skill, Skills } from "./types/schema";
import { eq, sql } from 'drizzle-orm';

export async function getProfile(): Promise<Profile> {
    return (await db.select().from(Profiles))[0];
};

export async function getContact(): Promise<Contact> {
    return (await db.select().from(Contacts))[0];
};

export async function getProfileWithContact(): Promise<ProfileWithContact> {
    const result = await db
        .select({
            profile: Profiles,
            contact: Contacts,
        })
        .from(Profiles)
        .leftJoin(Contacts, eq(Profiles.id, Contacts.profile_id))
        .limit(1);

    const profileWithContact = result[0];

    return {
        profile: profileWithContact.profile,
        contact: profileWithContact.contact ?? null
    };
}

export async function getSkills({ limit }: { limit: number }): Promise<Skill[]> {
    return await db.select().from(Skills).limit(limit);
};

export async function getCategoriesWithSkillsAndCerts(): Promise<CategoryWithSkillsAndCerts[]> {
    const categories = await db.select().from(Categories).orderBy(Categories.order);

    const result = await Promise.all(
        categories.map(async (category) => {
            // Skills di questa category
            const skills = await db
                .select()
                .from(Skills)
                .where(eq(Skills.category_id, category.id));

            const skillsWithCerts = await Promise.all(
                skills.map(async (skill) => ({
                    skill,
                    certifications: await db
                        .select()
                        .from(Certifications)
                        .where(eq(Certifications.skill_id, skill.id))
                }))
            );

            return {
                category,
                skills: skillsWithCerts
            };
        })
    );

    return result;
}