import { create } from 'zustand';

interface PdfModalState {
  pdfUrl: string | null;
  certName: string | null;
  iconUrl: string | null;
  open: (url: string, certName: string, iconUrl: string) => void;
  close: () => void;
}

export const usePdfModal = create<PdfModalState>((set) => ({
  pdfUrl: null,
  certName: null,
  iconUrl: null,
  open: (url: string, certName: string, iconUrl: string) => set({ pdfUrl: url, certName, iconUrl }),
  close: () => set({ pdfUrl: null }),
}));
