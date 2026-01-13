export interface Profile {
    id: string;
    name: string;
    surname: string;
    birthday: string;
    Contact: Contact;
}

export interface Contact {
    email: string;
    phone: string;
    telegram_url: string;
    whatsapp_url: string;
    facebook_url: string;
    instagram_url: string;
    linkedin_url: string;
}