import { getExperiences } from "@/server/queries/experiences";
import ExperienceItem from "../ExperienceItem";

export const revalidate = 86400;

export default async function Experience() {
  const expiriences = await getExperiences();

  return (
    <section id="experience" className="py-16 md:py-24 px-4 scroll-mt-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center">
        Experience & Education
      </h2>

      <div className="max-w-3xl mx-auto space-y-10 md:space-y-14">
        {expiriences.map((experience) => (
          <ExperienceItem
            key={experience.id}
            type={experience.type}
            title={experience.title}
            org={experience.org}
            period={experience.period}
            bullets={experience.bullets}
          />
        ))}
      </div>
    </section>
  );
}
