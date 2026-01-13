import { profileCDoc, skillsCollection } from "./firebase-admin";
import { Profile } from "./types/profile";
import { CategorySkills } from "./types/skills";

export async function getSkills(): Promise<CategorySkills[]> {
    const snapshot = await skillsCollection.orderBy("order").get();

    const skills = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

    return skills as CategorySkills[];
}

export async function getProfile(): Promise<Profile> {
    const profileSnap = await profileCDoc.get();
    
    if (!profileSnap.exists) {
        throw new Error('Profilo non trovato');
    }
    
    return {
        id: profileSnap.id,
        ...profileSnap.data(),
    } as Profile;
}