import "server-only";

import { unstable_cache } from "next/cache";

import { db } from "../db";
import { Contact, Contacts } from "../schema/contact";

export const getContact = unstable_cache(
  async (): Promise<Contact> => {
    const result = await db.select().from(Contacts).limit(1);
    return result[0];
  },
  ["contact-data"],
  {
    tags: ["contact"],
  }
);