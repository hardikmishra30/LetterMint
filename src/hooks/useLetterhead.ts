import { useState, useCallback, useEffect } from 'react';
import { LetterheadState, defaultState, exampleState } from '@/types/letterhead';

const STORAGE_KEY = 'press_design_state';

export function useLetterhead() {
  const [state, setState] = useState<LetterheadState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...defaultState, ...JSON.parse(saved) };
    } catch {}
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const updateField = useCallback(<K extends keyof LetterheadState>(key: K, value: LetterheadState[K]) => {
    setState(prev => ({ ...prev, [key]: value }));
  }, []);

  const toggleSocial = useCallback((key: keyof LetterheadState['socials']) => {
    setState(prev => ({
      ...prev,
      socials: { ...prev.socials, [key]: !prev.socials[key] },
    }));
  }, []);

  const loadExample = useCallback(() => {
    setState(exampleState);
  }, []);

  const clearAll = useCallback(() => {
    setState({
      ...defaultState,
      companyName: '',
      tagline: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      pin: '',
      phone: '',
      email: '',
      website: '',
      gstVat: '',
      logo: null,
      brandColor: '#0f172a',
      style: 'corporate',
      socials: { linkedin: false, facebook: false, twitter: false, instagram: false },
    });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const handleLogoUpload = useCallback((file: File) => {
    if (file.size > 500 * 1024) {
      alert('Logo must be under 500KB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      updateField('logo', e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [updateField]);

  return { state, updateField, toggleSocial, loadExample, clearAll, handleLogoUpload };
}
