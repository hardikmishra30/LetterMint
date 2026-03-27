import React, { useRef, useEffect, useState } from 'react';
import { LetterheadState } from '@/types/letterhead';
import { Phone, Mail, Globe } from 'lucide-react';

interface Props {
  state: LetterheadState;
}





export default function LetterheadPreview({ state }: Props) {
  const paperRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    function updateScale() {
      if (!wrapperRef.current) return;
      const parent = wrapperRef.current.parentElement;
      if (!parent) return;
      const availW = parent.clientWidth - 80;
      const availH = parent.clientHeight - 80;
      const paperW = 794; // 210mm at 96dpi
      const paperH = 1123; // 297mm at 96dpi
      const s = Math.min(availW / paperW, availH / paperH, 0.85);
      setScale(Math.max(s, 0.25));
    }
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const styleClass = `style-${state.style}`;
  const activeSocials = Object.entries(state.socials).filter(([, v]) => v).map(([k]) => k);
  const addressParts = [state.address1, state.address2].filter(Boolean).join(', ');
  const locationParts = [state.city, state.state, state.pin].filter(Boolean).join(', ');

  return (
    <div ref={wrapperRef} className="flex items-start justify-center w-full h-full pt-8 lg:pt-0 lg:items-center">
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
        <div ref={paperRef} id="letterhead-paper" className={`a4-paper ${styleClass}`}>
          {/* Watermark */}
          {state.logo && (
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                backgroundImage: `url(${state.logo})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '40%',
                opacity: 0.06,
                mixBlendMode: 'multiply',
              }}
            />
          )}

          {/* Header */}
          <header className="relative z-10 flex justify-between items-start">
            <div>
              <h2 className="text-4xl font-bold tracking-tighter leading-none mb-0.5" style={{ color: state.brandColor }}>
                {state.companyName || 'Company Name'}
              </h2>
              <p className="text-sm font-medium opacity-60 uppercase tracking-widest">
                {state.tagline || 'Tagline'}
              </p>
            </div>
            {state.logo && (
              <div className="h-16 w-32 flex justify-end items-start">
                <img src={state.logo} alt="Logo" className="max-h-full max-w-full object-contain" />
              </div>
            )}
          </header>

          {/* Address & Contact - vertical stack */}
          <div className="relative z-10 mt-4 pb-4 border-b" style={{ borderColor: `${state.brandColor}20`, fontSize: '10pt' }}>
            {(addressParts || locationParts) && (
              <p className="opacity-70">{[addressParts, locationParts].filter(Boolean).join(', ')}</p>
            )}
            {(state.phone || state.email || state.website) && (
              <p className="mt-1 opacity-70 flex items-center gap-4 flex-wrap">
                {state.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 opacity-50" />{state.phone}</span>}
                {state.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3 opacity-50" />{state.email}</span>}
                {state.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3 opacity-50" />{state.website}</span>}
              </p>
            )}
          </div>

          {/* Clean body - no placeholder lines */}
          <div className="flex-1 relative z-10" />

          {/* Minimal footer - GST only */}
          {state.gstVat && (
            <footer className="relative z-10 pt-4 mt-auto border-t" style={{ borderColor: `${state.brandColor}10`, fontSize: '8pt', color: '#94a3b8' }}>
              <p>GST/VAT: {state.gstVat}</p>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
}
