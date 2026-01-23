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
    <div className="relative pl-6 md:pl-8 border-l border-border">
      <span className="absolute -left-1.75 top-2 w-3 h-3 rounded-full bg-primary" />

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

      <span
        className={`inline-block mt-3 text-xs uppercase tracking-widest text-primary ${
          type === 'education'
            ? 'text-secondary'
            : 'text-primary'
        }`}
      >
        {type === 'education' ? 'Education' : 'Work Experience'}
      </span>
    </div>
  );
}
