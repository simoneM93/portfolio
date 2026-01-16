import { db } from "../db";
import { eq } from 'drizzle-orm';
import { Contacts } from "../schema/contact";
import { Profile, Profiles } from "../schema/profile";
import { ProfileWithContact } from "../types/ProfileWithContact";

export async function getProfile(): Promise<Profile> {
    return (await db.select().from(Profiles))[0];
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