'use client';
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
            className="cursor-pointer px-3 py-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-secondary/20 backdrop-blur-sm text-sm flex gap-1 justify-center"
        >
            📄 Show Certification
        </button>
    );
}
