'use client';
import { FileText } from 'lucide-react';
import { usePdfModal } from '@/lib/usePdfModal';

interface Props {
    pdfUrl: string;
    certName: string;
    iconUrl: string;
}

export default function ViewCertButton({ pdfUrl, certName, iconUrl }: Props) {
    const openPdf = usePdfModal(state => state.open);

    return (
        <button
            onClick={() => openPdf(pdfUrl, certName, iconUrl)}
            className="cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-border hover:bg-muted text-foreground font-medium rounded-lg transition-colors text-sm"
        >
            <FileText className="h-4 w-4" aria-hidden="true" /> View certificate
        </button>
    );
}
