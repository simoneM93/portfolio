'use client';

import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2 } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export default function PdfViewer({ url, title }: { url: string; title: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>();
    const [numPages, setNumPages] = useState(0);

    // Fit pages to the modal width, re-render on resize
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="flex-1 min-h-0 overflow-y-auto bg-muted/30 p-2 md:p-4" aria-label={title}>
            {!!width && (
                <Document
                    file={url}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    loading={
                        <p className="flex items-center justify-center gap-2 py-24 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading certificate…
                        </p>
                    }
                    error={
                        <p className="py-24 text-center text-sm text-muted-foreground">
                            Unable to load the certificate.{' '}
                            <a href={url} target="_blank" rel="noopener noreferrer" className="text-foreground underline">Open PDF</a>
                        </p>
                    }
                    className="flex flex-col items-center gap-4"
                >
                    {Array.from({ length: numPages }, (_, i) => (
                        <Page
                            key={i}
                            pageNumber={i + 1}
                            width={width}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="shadow-lg rounded-md overflow-hidden"
                        />
                    ))}
                </Document>
            )}
        </div>
    );
}
