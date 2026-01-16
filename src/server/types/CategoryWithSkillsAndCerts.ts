import { Category } from "../schema/category";
import { Certification } from "../schema/certification";
import { Skill } from "../schema/skill";

export interface CategoryWithSkillsAndCerts {
  category: Category;
  skills: Array<{
    skill: Skill;
    certifications: Certification[];
  }>;
}