import { Briefcase, GraduationCap } from 'lucide-react';

interface Props {
  type: string;
  title: string;
  subtitle?: string;
  org: string;
  period: string;
  bullets: string[];
}

export default function ExperienceItem({
  type,
  title,
  subtitle,
  org,
  period,
  bullets,
}: Props) {
  return (
    <div className="relative pl-8 md:pl-10 border-l border-border">
      <span className="absolute -left-2.5 top-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-card border border-border">
        {type === 'education' ? (
          <GraduationCap className="h-3 w-3 text-secondary" />
        ) : (
          <Briefcase className="h-3 w-3 text-primary" />
        )}
      </span>

      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {period}
      </p>

      <h3 className="mt-1 text-lg md:text-xl font-semibold leading-snug">
        {title}
      </h3>

      {subtitle && (
        <p className="text-sm md:text-base text-primary font-medium">
          {subtitle}
        </p>
      )}

      <p className="text-sm md:text-base text-muted-foreground">
        {org}
      </p>

      <ul className="mt-3 md:mt-4 space-y-1.5 md:space-y-2 text-sm md:text-base list-disc list-inside">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}
