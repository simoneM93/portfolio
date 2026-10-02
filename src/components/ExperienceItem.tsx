import { Briefcase, GraduationCap } from 'lucide-react';

interface Props {
  type: string;
  title: string;
  org: string;
  period: string;
  bullets: string[];
}

export default function ExperienceItem({
  type,
  title,
  org,
  period,
  bullets,
}: Props) {
  return (
    <li className="relative pl-8 md:pl-10">
      <span className="absolute -left-3 top-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-card border border-border">
        {type === 'education' ? (
          <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" aria-label="Education" />
        ) : (
          <Briefcase className="h-3.5 w-3.5 text-foreground" aria-label="Work" />
        )}
      </span>

      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {period}
      </p>

      <h3 className="mt-1 text-lg md:text-xl font-semibold leading-snug">
        {title}
      </h3>

      <p className="text-sm md:text-base text-muted-foreground">
        {org}
      </p>

      <ul className="mt-3 md:mt-4 space-y-1.5 md:space-y-2 text-sm md:text-base list-disc pl-4 marker:text-muted-foreground">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </li>
  );
}
