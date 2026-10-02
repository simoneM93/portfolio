import { getExperiences } from "@/server/queries/experiences";
import ExperienceItem from "../ExperienceItem";
import { PERSON_ID, SITE_URL } from "@/lib/seo";

export const revalidate = 86400;

export default async function Experience() {
  const experiences = await getExperiences();

  const workEntries = experiences.filter((e) => e.type === 'work');
  const educationEntries = experiences.filter((e) => e.type === 'education');

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID, // same node as the ProfilePage Person
    name: 'Simone Marano',
    url: SITE_URL,
    hasOccupation: workEntries.map((e) => ({
      '@type': 'OrganizationRole',
      roleName: e.title,
      description: e.bullets.join(' '),
      worksFor: { '@type': 'Organization', name: e.org },
    })),
    alumniOf: educationEntries.map((e) => ({
      '@type': 'EducationalOrganization',
      name: e.org,
    })),
  };

  return (
    <section id="experience" className="py-16 md:py-24 px-4 scroll-mt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center">
        Experience & Education
      </h2>

      <div className="max-w-3xl mx-auto space-y-10 md:space-y-14">
        {experiences.map((experience) => (
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
