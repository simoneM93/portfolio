'use client';
import { usePdfModal } from '@/lib/usePdfModal';
import Image from 'next/image';
import { useEffect } from 'react';

export default function PdfIframeModal() {
    const { pdfUrl, certName, iconUrl, close } = usePdfModal();

    useEffect(() => {
        if (pdfUrl) {
            document.body.classList.add('overflow-hidden');
            document.documentElement.classList.add('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
            document.documentElement.classList.remove('overflow-hidden');
        };
    }, [pdfUrl]);


    if (!pdfUrl) return null;

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md animate-in fade-in-20 zoom-in-95 overscroll-none">
            <div className="bg-background/95 backdrop-blur-xl rounded-3xl shadow-3xl border border-border/50 w-full max-w-6xl max-h-[95vh] flex flex-col min-h-0">

                {/* Header */}
                <div className="p-6 rounded-t-3xl border-b border-border/50 flex items-center justify-between sticky top-0 bg-background z-10 shrink-0">
                    <div className="flex items-center gap-4">
                        <Image
                            src={iconUrl || ''}
                            alt={certName || ''}
                            width={50}
                            height={50}
                            priority
                            className="object-cover brightness-110 saturate-110 rounded-2xl" />
                        <div className="min-w-0">
                            <h3 className="text-xl md:text-2xl font-bold text-foreground truncate">{certName}</h3>
                        </div>
                    </div>
                    <button
                        onClick={close}
                        className="cursor-pointer p-3 rounded-2xl hover:bg-muted/80 backdrop-blur-sm transition-all group hover:scale-110 shrink-0"
                    >
                        <span className="text-xl group-hover:scale-110 transition-transform">✕</span>
                    </button>
                </div>

                {/* PDF Viewer - RIEMPIE 100% */}
                <div className="flex-1 min-h-60 md:min-h-160 h-full relative">
                    <iframe
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
                        className="absolute inset-0 w-full h-full border-0 shadow-2xl bg-linear-to-br from-muted/30 to-transparent"
                        allowFullScreen
                        loading="lazy"
                    />
                </div>

                {/* Footer */}
                <div className="p-6 rounded-b-3xl border-t border-border/50 flex flex-col sm:flex-row gap-3 justify-end bg-linear-to-r from-background/95 to-muted/50 shrink-0">  {/* shrink-0 */}
                    <button
                        onClick={close}
                        className="cursor-pointer w-full sm:w-auto px-8 py-3 bg-linear-to-r from-secondary/90 to-muted/90 hover:from-secondary hover:to-muted text-foreground font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all text-sm"
                    >
                        Chiudi
                    </button>
                </div>
            </div>
        </div>
    );
}
