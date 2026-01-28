'use client';
import {useRouter, usePathname} from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import {useTransition} from 'react';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: 'it' | 'en') => {
    startTransition(() => {
      router.replace(pathname, {locale: newLocale});
      router.refresh();
    });
  };

  return (
    <div className="flex bg-background/80 backdrop-blur-sm border border-border/50 rounded-full p-1 shadow-lg">
      <button 
        onClick={() => switchLocale('it')}
        disabled={isPending || locale === 'it'}
        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
          locale === 'it' 
            ? 'bg-primary text-primary-foreground shadow-md' 
            : 'hover:bg-muted text-muted-foreground'
        }`}
      >
        IT
      </button>
      <button 
        onClick={() => switchLocale('en')}
        disabled={isPending || locale === 'en'}
        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
          locale === 'en' 
            ? 'bg-primary text-primary-foreground shadow-md' 
            : 'hover:bg-muted text-muted-foreground'
        }`}
      >
        EN
      </button>
    </div>
  );
}