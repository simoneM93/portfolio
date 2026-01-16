import "server-only";

import { unstable_cache } from "next/cache";

import { db } from "../db";
import { Categories } from "../schema/category";
import { Skill, Skills } from "../schema/skill";
import { Certifications } from "../schema/certification";
import { CategoryWithSkillsAndCerts } from "../types/CategoryWithSkillsAndCerts";

export const getSkills = unstable_cache(
    async ({ limit }: { limit: number }): Promise<Skill[]> => {
        return db.select().from(Skills).limit(limit);
    },
    ["skills-list"],
    {
        tags: ["skills"],
    }
);

export const getCategoriesWithSkillsAndCerts = unstable_cache(
    async (): Promise<CategoryWithSkillsAndCerts[]> => {
        const categories = await db
            .select()
            .from(Categories)
            .orderBy(Categories.order);

        const skills = await db.select().from(Skills);
        const certifications = await db.select().from(Certifications);

        return categories.map((category) => {
            const categorySkills = skills.filter(
                (s) => s.category_id === category.id
            );

            return {
                category,
                skills: categorySkills.map((skill) => ({
                    skill,
                    certifications: certifications.filter(
                        (c) => c.skill_id === skill.id
                    ),
                })),
            };
        });
    },
    ["categories-with-skills-and-certs"],
    {
        tags: ["categories", "skills", "certifications"],
    }
);