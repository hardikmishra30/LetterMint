import { UserButton } from "@clerk/clerk-react";
import { useState, useEffect } from 'react';
import { useLetterhead } from '@/hooks/useLetterhead';
import FormPanel from '@/components/letterhead/FormPanel';
import LetterheadPreview from '@/components/letterhead/LetterheadPreview';
import DownloadActions from '@/components/letterhead/DownloadActions';

export default function Index() {
  const { state, updateField, loadExample, clearAll, handleLogoUpload } = useLetterhead();
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <FormPanel
        state={state}
        updateField={updateField}
        loadExample={loadExample}
        clearAll={clearAll}
        handleLogoUpload={handleLogoUpload}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((d: any) => !d)}
      />
      <main className="flex-1 bg-studio-preview-bg flex flex-col items-center justify-center overflow-hidden relative p-4 lg:p-12 min-h-[60vh] lg:min-h-screen">
        <div className="absolute top-4 right-4">
          <UserButton />
        </div>
        <DownloadActions state={state} />
        <LetterheadPreview state={state} />
      </main>
    </div>
  );
}
