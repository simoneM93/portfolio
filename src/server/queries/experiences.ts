import "server-only";

import { unstable_cache } from "next/cache";

import { db } from "../db";
import { Experience, Experiences } from "../schema/experience";
import { desc } from "drizzle-orm";

export const getExperiences = unstable_cache(
  async (): Promise<Experience[]> => {
    const result = await db.select().from(Experiences).orderBy(desc(Experiences.order));
    return result;
  },
  ["experiences-data"],
  {
    tags: ["experiences"],
  }
);