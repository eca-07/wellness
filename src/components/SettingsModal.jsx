import React from 'react';
import { X } from 'lucide-react';

export function SettingsModal({ prefs, updatePrefs, onClose }) {
  const themes = [
    { id: 'nature', label: '🌿 Nature' },
    { id: 'midnight', label: '🌙 Midnight' },
    { id: 'serenity', label: '🌸 Serenity' },
    { id: 'cloud', label: '☁️ Cloud' },
    { id: 'sunrise', label: '☀️ Sunrise' },
    { id: 'custom', label: '🎨 Custom' },
  ];

  const fonts = [
    { id: "'Inter', system-ui, sans-serif", label: 'Sans-serif (Inter)' },
    { id: "'Merriweather', serif", label: 'Serif (Merriweather)' },
    { id: "'Fira Code', monospace", label: 'Monospace' },
    { id: "'Caveat', cursive", label: 'Handwriting' },
  ];

  return (
    <div style={modalOverlayStyle}>
      <div className="glass-panel" style={modalStyle}>
        <div className="header">
          <h2>Personalization</h2>
          <button className="btn-icon" onClick={onClose}><X /></button>
        </div>
        
        <div className="flex-col" style={{ gap: '1.5rem', marginTop: '1rem' }}>
          <div>
            <label style={labelStyle}>Theme</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {themes.map(t => (
                <button 
                  key={t.id} 
                  className={prefs.theme === t.id ? 'btn-primary' : 'btn-secondary'}
                  onClick={() => updatePrefs({ theme: t.id })}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="mode" 
                checked={prefs.mode === 'light'} 
                onChange={() => updatePrefs({ mode: 'light' })}
              />
              Light Mode
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="mode" 
                checked={prefs.mode === 'dark'} 
                onChange={() => updatePrefs({ mode: 'dark' })}
              />
              Dark Mode
            </label>
          </div>

          <div>
            <label style={labelStyle}>Font</label>
            <select 
              className="input-field" 
              value={prefs.fontFamily}
              onChange={(e) => updatePrefs({ fontFamily: e.target.value })}
            >
              {fonts.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Font Size</label>
            <input 
              type="range" 
              min="12" max="24" 
              value={parseInt(prefs.fontSize)} 
              onChange={(e) => updatePrefs({ fontSize: `${e.target.value}px` })}
              style={{ width: '100%' }}
            />
            <div style={{ textAlign: 'center' }}>{prefs.fontSize}</div>
          </div>

          {prefs.theme === 'custom' && (
            <div className="flex-row" style={{ justifyContent: 'space-around', padding: '1rem', background: 'var(--surface-color)', borderRadius: '8px' }}>
              <div className="flex-col" style={{ alignItems: 'center', gap: '0.5rem' }}>
                <label>Background</label>
                <input 
                  type="color" 
                  className="color-picker"
                  value={prefs.customBgColor || '#ffffff'}
                  onChange={(e) => updatePrefs({ customBgColor: e.target.value })}
                />
              </div>
              <div className="flex-col" style={{ alignItems: 'center', gap: '0.5rem' }}>
                <label>Text</label>
                <input 
                  type="color" 
                  className="color-picker"
                  value={prefs.customTextColor || '#000000'}
                  onChange={(e) => updatePrefs({ customTextColor: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(4px)'
};

const modalStyle = {
  width: '90%',
  maxWidth: '500px',
  maxHeight: '90vh',
  overflowY: 'auto',
  margin: 'auto'
};

const labelStyle = {
  display: 'block',
  fontWeight: 600,
  marginBottom: '0.5rem'
};
