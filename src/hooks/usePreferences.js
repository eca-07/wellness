import { useState, useEffect } from 'react';

const DEFAULT_PREFS = {
  mode: 'light',
  theme: 'nature',
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: '16px',
  customBgColor: '',
  customTextColor: '',
};

export function usePreferences() {
  const [prefs, setPrefs] = useState(() => {
    const saved = localStorage.getItem('wellness_prefs');
    return saved ? JSON.parse(saved) : DEFAULT_PREFS;
  });

  useEffect(() => {
    localStorage.setItem('wellness_prefs', JSON.stringify(prefs));
    
    // Apply themes to document
    document.documentElement.setAttribute('data-theme', prefs.theme);
    document.documentElement.setAttribute('data-mode', prefs.mode);
    
    // Apply custom styles
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--font-family', prefs.fontFamily);
    rootStyle.setProperty('--font-size', prefs.fontSize);
    
    if (prefs.theme === 'custom') {
      if (prefs.customBgColor) rootStyle.setProperty('--bg-color', prefs.customBgColor);
      if (prefs.customTextColor) rootStyle.setProperty('--text-color', prefs.customTextColor);
    } else {
      rootStyle.removeProperty('--bg-color');
      rootStyle.removeProperty('--text-color');
    }
  }, [prefs]);

  const updatePrefs = (updates) => {
    setPrefs(prev => ({ ...prev, ...updates }));
  };

  return { prefs, updatePrefs };
}
