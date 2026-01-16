import { Contact } from "../schema/contact";
import { Profile } from "../schema/profile";

export interface ProfileWithContact {
  profile: Profile;
  contact: Contact | null;
}