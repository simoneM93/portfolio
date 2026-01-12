import { Badge } from '@/components/ui/badge';

interface CertBadgeProps {
  cert: string;
  issuer: string;
}

export function CertBadge({ cert, issuer }: CertBadgeProps) {
  return (
    <Badge variant="secondary" className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 border border-orange-500/40 text-xs font-semibold">
      <span className="mr-1">📜</span>
      {cert} ({issuer})
    </Badge>
  );
}
