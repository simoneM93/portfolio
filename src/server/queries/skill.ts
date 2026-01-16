import { eq } from 'drizzle-orm';

import { db } from "../db";
import { Categories } from "../schema/category";
import { Skill, Skills } from "../schema/skill";
import { Certifications } from "../schema/certification";
import { CategoryWithSkillsAndCerts } from "../types/CategoryWithSkillsAndCerts";

export async function getSkills({ limit }: { limit: number }): Promise<Skill[]> {
    return await db.select().from(Skills).limit(limit);
};

export async function getCategoriesWithSkillsAndCerts(): Promise<CategoryWithSkillsAndCerts[]> {
    const categories = await db.select().from(Categories).orderBy(Categories.order);

    const result = await Promise.all(
        categories.map(async (category) => {
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