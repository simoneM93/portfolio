'use client';
import { usePdfModal } from '@/lib/usePdfModal';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

export default function PdfIframeModal() {
    const { pdfUrl, certName, iconUrl, close } = usePdfModal();

    return (
        <Dialog open={!!pdfUrl} onOpenChange={(open) => !open && close()}>
            <DialogContent className="sm:max-w-6xl w-[calc(100%-2rem)] h-[90dvh] p-0 gap-0 flex flex-col overflow-hidden rounded-2xl">
                <div className="flex items-center gap-4 p-4 md:p-6 pr-14 border-b border-border/50 shrink-0">
                    {iconUrl && (
                        <Image
                            src={iconUrl}
                            alt=""
                            width={40}
                            height={40}
                            className="object-cover rounded-lg shrink-0"
                        />
                    )}
                    <DialogTitle className="text-lg md:text-xl font-bold truncate">{certName}</DialogTitle>
                    <DialogDescription className="sr-only">Certificate PDF preview</DialogDescription>
                </div>

                {pdfUrl && (
                    <iframe
                        // ponytail: Google viewer kept because mobile browsers don't render PDFs in iframes
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
                        title={certName ? `${certName} certificate PDF` : 'Certificate PDF'}
                        className="flex-1 w-full border-0 bg-muted/30"
                        allowFullScreen
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
