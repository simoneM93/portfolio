// Terminal-prompt monogram: ">" + "SM". Strokes use currentColor, prompt stays emerald (matches the "Open to remote" dot).
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 11l4.5 5L3 21" className="stroke-emerald-400" />
      <path
        stroke="currentColor"
        d="M20 12.5c-.8-1.6-2.2-2.5-3.9-2.5-2.2 0-3.6 1.2-3.6 3 0 4 7.6 2.2 7.6 6 0 1.9-1.6 3-3.9 3-1.8 0-3.3-.9-4-2.4"
      />
      <path stroke="currentColor" d="M23.5 22V10l3.25 6.5L30 10v12" />
    </svg>
  );
}
