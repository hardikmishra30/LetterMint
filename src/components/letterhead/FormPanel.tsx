import React, { useCallback } from 'react';
import { LetterheadState } from '@/types/letterhead';
import { Moon, Sun } from 'lucide-react';

interface FormPanelProps {
  state: LetterheadState;
  updateField: <K extends keyof LetterheadState>(key: K, value: LetterheadState[K]) => void;
  loadExample: () => void;
  clearAll: () => void;
  handleLogoUpload: (file: File) => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

const stylePresets: { value: LetterheadState['style']; label: string }[] = [
  { value: 'corporate', label: 'Corporate' },
  { value: 'startup', label: 'Startup' },
  { value: 'creative', label: 'Creative' },
];

export default function FormPanel({
  state, updateField, loadExample, clearAll, handleLogoUpload, darkMode, onToggleDark,
}: FormPanelProps) {
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleLogoUpload(file);
  }, [handleLogoUpload]);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleLogoUpload(file);
  }, [handleLogoUpload]);

  return (
    <aside className="w-full lg:w-[450px] bg-studio-panel border-r border-studio-panel-border h-screen overflow-y-auto no-print shrink-0">
      {/* Header */}
      <header className="p-6 border-b border-border flex justify-between items-center sticky top-0 z-20 backdrop-blur-md" style={{ backgroundColor: 'var(--studio-header-blur, hsl(var(--studio-panel)))' }}>
        <div>
          <p className="text-xs text-bold text-studio-label uppercase tracking-widest font-semibold">Letterhead Studio</p>
        </div>
        <button onClick={onToggleDark} className="p-2 hover:bg-muted rounded-full transition-colors" aria-label="Toggle dark mode">
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>

      <form className="p-6 space-y-8 pb-32" onSubmit={e => e.preventDefault()}>
        {/* Identity */}
        <section className="space-y-4">
          <h3 className="studio-section-title">Identity</h3>
          <div className="space-y-3">
            <div>
              <label className="studio-label">Company Name</label>
              <input className="studio-input" placeholder="Acme Corp" value={state.companyName} onChange={e => updateField('companyName', e.target.value)} />
            </div>
            <div>
              <label className="studio-label">Tagline / Slogan</label>
              <input className="studio-input" placeholder="Future of Logistics" value={state.tagline} onChange={e => updateField('tagline', e.target.value)} />
            </div>
            <div>
              <label className="studio-label">Logo (max 500KB)</label>
              <div
                onDrop={onDrop}
                onDragOver={e => e.preventDefault()}
                onClick={() => document.getElementById('logo-input')?.click()}
                className="border-2 border-dashed border-studio-field-border rounded-xl p-4 text-center hover:border-muted-foreground transition-colors cursor-pointer"
              >
                {state.logo ? (
                  <img src={state.logo} alt="Logo" className="max-h-16 mx-auto" />
                ) : (
                  <p className="text-xs text-studio-label">Click or drag PNG / SVG / JPG</p>
                )}
                <input type="file" id="logo-input" className="hidden" accept="image/png,image/svg+xml,image/jpeg" onChange={onFileChange} />
              </div>
              {state.logo && (
                <button type="button" onClick={() => updateField('logo', null)} className="text-xs text-destructive mt-1 hover:underline">Remove logo</button>
              )}
            </div>
          </div>
        </section>

        {/* Contact & Address */}
        <section className="space-y-4">
          <h3 className="studio-section-title">Contact & Address</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <input className="studio-input" placeholder="Address Line 1" value={state.address1} onChange={e => updateField('address1', e.target.value)} />
            </div>
            <div className="col-span-2">
              <input className="studio-input" placeholder="Address Line 2" value={state.address2} onChange={e => updateField('address2', e.target.value)} />
            </div>
            <input className="studio-input" placeholder="City" value={state.city} onChange={e => updateField('city', e.target.value)} />
            <input className="studio-input" placeholder="State" value={state.state} onChange={e => updateField('state', e.target.value)} />
            <input className="studio-input" placeholder="PIN / ZIP" value={state.pin} onChange={e => updateField('pin', e.target.value)} />
            <input className="studio-input" placeholder="Phone" value={state.phone} onChange={e => updateField('phone', e.target.value)} />
            <input className="studio-input" placeholder="Email" value={state.email} onChange={e => updateField('email', e.target.value)} />
            <input className="studio-input" placeholder="Website" value={state.website} onChange={e => updateField('website', e.target.value)} />
            <div className="col-span-2">
              <input className="studio-input" placeholder="GST / VAT Number (optional)" value={state.gstVat} onChange={e => updateField('gstVat', e.target.value)} />
            </div>
          </div>
        </section>

        {/* Visual Style */}
        <section className="space-y-4">
          <h3 className="studio-section-title">Visual Style</h3>
          <div className="space-y-4">
            <div>
              <label className="studio-label">Primary Brand Color</label>
              <input type="color" value={state.brandColor} onChange={e => updateField('brandColor', e.target.value)} className="w-full h-10 rounded-lg cursor-pointer border border-studio-field-border" />
            </div>
            <div>
              <label className="studio-label">Preset Template</label>
              <div className="grid grid-cols-3 gap-2">
                {stylePresets.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => updateField('style', value)}
                    className={`px-2 py-2 rounded border text-xs font-medium transition-colors ${
                      state.style === value
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:bg-muted'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <button type="button" onClick={loadExample} className="flex-1 px-4 py-2 text-xs font-bold border border-border rounded-lg hover:bg-muted transition-colors">
            Load Example
          </button>
          <button type="button" onClick={clearAll} className="flex-1 px-4 py-2 text-xs font-bold border border-destructive/20 text-destructive rounded-lg hover:bg-destructive/5 transition-colors">
            Clear All
          </button>
        </div>
      </form>
    </aside>
  );
}
