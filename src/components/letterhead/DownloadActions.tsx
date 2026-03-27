import React, { useCallback, useState } from 'react';
import { Download, Image, FileCode } from 'lucide-react';
import { LetterheadState } from '@/types/letterhead';

interface Props {
  state: LetterheadState;
}

export default function DownloadActions({ state }: Props) {
  const [loading, setLoading] = useState<string | null>(null);

  const downloadPDF = useCallback(async () => {
    setLoading('pdf');
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const el = document.getElementById('letterhead-paper');
      if (!el) return;
      await html2pdf().set({
        margin: 0,
        filename: `${state.companyName || 'Letterhead'}-Letterhead.pdf`,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          backgroundColor: '#ffffff',
          removeContainer: true,
          allowTaint: true,
          logging: false,
          onclone: (clonedDoc: Document) => {
            clonedDoc.querySelectorAll('.no-print, .online, .credit, [class*="footer-credit"], [class*="credit"], [class*="online"], [class*="watermark"], [class*="powered"]').forEach((e: Element) => e.remove());
            clonedDoc.querySelectorAll('*').forEach((e: Element) => {
              const t = e.textContent || '';
              if (/ONLINE|All Rights Reserved|Powered by|Generated/i.test(t) && !e.querySelector('*')) {
                e.remove();
              }
            });
          },
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
      }).from(el).save();
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setLoading(null);
    }
  }, [state.companyName]);

  const downloadPNG = useCallback(async () => {
    setLoading('png');
    try {
      const { toPng } = await import('html-to-image');
      const el = document.getElementById('letterhead-paper');
      if (!el) return;
      const dataUrl = await toPng(el, { pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `${state.companyName || 'Letterhead'}-Letterhead.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('PNG generation failed:', err);
    } finally {
      setLoading(null);
    }
  }, [state.companyName]);

  const downloadSVG = useCallback(async () => {
    setLoading('svg');
    try {
      const { toSvg } = await import('html-to-image');
      const el = document.getElementById('letterhead-paper');
      if (!el) return;
      const dataUrl = await toSvg(el);
      const link = document.createElement('a');
      link.download = `${state.companyName || 'Letterhead'}-Letterhead.svg`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('SVG generation failed:', err);
    } finally {
      setLoading(null);
    }
  }, [state.companyName]);

  const buttons = [
    { key: 'pdf', label: 'PDF', icon: Download, action: downloadPDF },
    { key: 'png', label: 'PNG', icon: Image, action: downloadPNG },
    { key: 'svg', label: 'SVG', icon: FileCode, action: downloadSVG },
  ];

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30 no-print">
      {buttons.map(({ key, label, icon: Icon, action }) => (
        <button
          key={key}
          onClick={action}
          disabled={loading === key}
          className="flex items-center gap-2 px-5 py-2.5 bg-card text-card-foreground rounded-full font-bold shadow-2xl hover:scale-105 transition-transform disabled:opacity-50 text-sm"
        >
          <Icon className="w-4 h-4" />
          {loading === key ? '...' : label}
        </button>
      ))}
    </div>
  );
}
