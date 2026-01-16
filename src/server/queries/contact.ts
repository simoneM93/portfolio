import { db } from "../db";
import { Contact, Contacts } from "../schema/contact";

export async function getContact(): Promise<Contact> {
    return (await db.select().from(Contacts))[0];
};