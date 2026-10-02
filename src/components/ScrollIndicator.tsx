'use client';

import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator({ targetId }: { targetId: string }) {
  const handleScroll = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleScroll}
      aria-label={`Scroll to ${targetId}`}
      className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce motion-reduce:animate-none opacity-60 hover:opacity-100 transition-opacity hover:cursor-pointer"
    >
      <ChevronDown className="h-8 w-8 text-muted-foreground" />
    </button>
  );
}
