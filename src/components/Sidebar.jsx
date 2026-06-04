import React from 'react';
import { Plus, Settings, Calendar } from 'lucide-react';

export function Sidebar({ journals, currentId, selectJournal, createNew, onOpenSettings }) {
  return (
    <div className="glass-panel flex-col" style={{ width: '300px', flexShrink: 0, height: 'calc(100vh - 4rem)', position: 'sticky', top: '2rem' }}>
      <div className="header" style={{ marginBottom: 0 }}>
        <h2>Wellness</h2>
        <button className="btn-icon" onClick={onOpenSettings} title="Settings">
          <Settings size={20} />
        </button>
      </div>
      
      <button className="btn-primary flex-row" style={{ justifyContent: 'center' }} onClick={createNew}>
        <Plus size={20} />
        New Entry
      </button>

      <div style={{ marginTop: '1rem', flex: 1, overflowY: 'auto' }} className="flex-col">
        {journals.map(j => (
          <div 
            key={j.id} 
            className="list-item"
            style={{ 
              cursor: 'pointer',
              borderColor: currentId === j.id ? 'var(--accent-color)' : 'var(--border-color)',
              backgroundColor: currentId === j.id ? 'var(--surface-color)' : 'var(--bg-color)',
              transition: 'all 0.2s ease'
            }}
            onClick={() => selectJournal(j.id)}
          >
            <div className="flex-col" style={{ gap: '0.25rem' }}>
              <div style={{ fontWeight: 600 }}>{j.title || 'Untitled Entry'}</div>
              <div className="flex-row" style={{ fontSize: '0.85em', opacity: 0.8, gap: '0.25rem' }}>
                <Calendar size={14} />
                {new Date(j.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
        {journals.length === 0 && (
          <div style={{ textAlign: 'center', opacity: 0.6, marginTop: '2rem' }}>
            No entries yet. Start writing!
          </div>
        )}
      </div>
    </div>
  );
}
