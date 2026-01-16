import "server-only";

import { unstable_cache } from "next/cache";

import { db } from "../db";
import { eq } from 'drizzle-orm';
import { Contacts } from "../schema/contact";
import { Profile, Profiles } from "../schema/profile";
import { ProfileWithContact } from "../types/ProfileWithContact";

export const getProfile = unstable_cache(
    async (): Promise<Profile> => {
        const result = await db.select().from(Profiles);
        return result[0];
    },
    ["profile-data"],
    {
        tags: ["profile"],
    }
);

export const getProfileWithContact = unstable_cache(
    async (): Promise<ProfileWithContact> => {
        const result = await db
            .select({
                profile: Profiles,
                contact: Contacts,
            })
            .from(Profiles)
            .leftJoin(Contacts, eq(Profiles.id, Contacts.profile_id))
            .limit(1);

        const row = result[0];

        return {
            profile: row.profile,
            contact: row.contact ?? null,
        };
    },
    ["profile-with-contact"],
    {
        tags: ["profile", "contact"],
    }
);