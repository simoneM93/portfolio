export interface CategorySkills {
    id: string;
    category: string;
    order: number;
    skills: Skill[];
}

export interface Skill {
    name: string;
    level: number;
    certifications: string[] | null;
    icon: Icon;
}

export interface Icon {
    icon_lib: string;
    icon_name: string;
    label: string;
}