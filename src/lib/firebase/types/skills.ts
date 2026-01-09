export interface CategorySkills {
    id: string;
    category: string;
    order: number;
    skills: Skill[];
}

export interface Skill {
    name: string;
    level: number;
    certifications: Certification[] | null;
    icon: Icon;
}

export interface Icon {
    icon_lib: string;
    icon_name: string;
    label: string;
}

export interface Certification {
    certUrl: string;
    issued: string;
    issuer: string;
    name: string;
    color: string;
    icon_url: string;
    pdf_url: string;
}