import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { Mail } from 'lucide-react';
import { getContact } from '@/server/queries/contact';

export default async function Footer() {
  const contact = await getContact();

  const links = [
    { href: `https://github.com/${process.env.GITHUB_USERNAME}`, label: 'GitHub', Icon: FaGithub, external: true },
    { href: contact.linkedin_url, label: 'LinkedIn', Icon: FaLinkedin, external: true },
    { href: `mailto:${contact.email}`, label: 'Email', Icon: Mail, external: false },
  ];

  return (
    <footer className="border-t border-border/50 py-8 px-4">
      <div className="container mx-auto max-w-7xl flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Simone Marano · Catania, Italy</p>
        <ul className="flex items-center gap-2">
          {links.map(({ href, label, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={external ? `${label} (opens in new tab)` : label}
                {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                className="flex p-2 rounded-lg hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
