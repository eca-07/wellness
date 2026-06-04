import React from 'react';
import { Trash2, Plus } from 'lucide-react';

export function JournalEditor({ journal, updateJournal, deleteJournal }) {
  if (!journal) {
    return (
      <div className="glass-panel" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6, height: 'calc(100vh - 4rem)' }}>
        Select an entry or create a new one to start writing.
      </div>
    );
  }

  const handleTitleChange = (e) => updateJournal({ title: e.target.value });
  const handleEntryChange = (e) => updateJournal({ entry: e.target.value });
  
  const addGratitude = () => {
    updateJournal({ gratitudes: [...journal.gratitudes, ''] });
  };
  const updateGratitude = (index, value) => {
    const newG = [...journal.gratitudes];
    newG[index] = value;
    updateJournal({ gratitudes: newG });
  };
  const removeGratitude = (index) => {
    const newG = journal.gratitudes.filter((_, i) => i !== index);
    updateJournal({ gratitudes: newG });
  };

  const handleNegativeChange = (field, value) => {
    updateJournal({ negativeEnergy: { ...journal.negativeEnergy, [field]: value } });
  };

  return (
    <div className="glass-panel" style={{ flex: 1, overflowY: 'auto', height: 'calc(100vh - 4rem)' }}>
      <div className="header">
        <input 
          type="text" 
          value={journal.title} 
          onChange={handleTitleChange}
          placeholder="Journal Title (Optional)"
          style={{ fontSize: '1.5em', fontWeight: 600, background: 'transparent', border: 'none', color: 'inherit', width: '100%', outline: 'none' }}
        />
        <button className="btn-icon" onClick={() => deleteJournal(journal.id)} style={{ color: '#e74c3c', flexShrink: 0 }} title="Delete Entry">
          <Trash2 size={20} />
        </button>
      </div>
      
      <div style={{ opacity: 0.7, marginBottom: '2rem' }}>
        {new Date(journal.date).toLocaleString()}
      </div>

      <div className="flex-col" style={{ gap: '2rem' }}>
        <section>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📖</span> Daily Journal
          </h3>
          <textarea 
            className="input-field" 
            placeholder="How are you feeling today?" 
            value={journal.entry}
            onChange={handleEntryChange}
            style={{ minHeight: '200px' }}
          />
        </section>

        <section>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🙏</span> Gratitude
          </h3>
          <div className="flex-col" style={{ gap: '0.5rem' }}>
            {journal.gratitudes.map((g, i) => (
              <div key={i} className="flex-row">
                <input 
                  type="text" 
                  className="input-field" 
                  style={{ marginBottom: 0 }}
                  value={g} 
                  onChange={(e) => updateGratitude(i, e.target.value)}
                  placeholder="I am grateful for..."
                />
                <button className="btn-icon" onClick={() => removeGratitude(i)}><Trash2 size={16}/></button>
              </div>
            ))}
            <button className="btn-secondary flex-row" style={{ width: 'fit-content' }} onClick={addGratitude}>
              <Plus size={16} /> Add Gratitude
            </button>
          </div>
        </section>

        <section>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>💨</span> Negative Energy Release
          </h3>
          <div className="flex-col">
            <textarea 
              className="input-field" 
              placeholder="What thoughts or feelings would you like to release today?" 
              value={journal.negativeEnergy.thoughts}
              onChange={(e) => handleNegativeChange('thoughts', e.target.value)}
            />
            <textarea 
              className="input-field" 
              placeholder="I am worried about..." 
              value={journal.negativeEnergy.concerns}
              onChange={(e) => handleNegativeChange('concerns', e.target.value)}
            />
            <textarea 
              className="input-field" 
              placeholder="I feel frustrated because..." 
              value={journal.negativeEnergy.stressors}
              onChange={(e) => handleNegativeChange('stressors', e.target.value)}
            />
            <textarea 
              className="input-field" 
              placeholder="I want to let go of..." 
              value={journal.negativeEnergy.letGo}
              onChange={(e) => handleNegativeChange('letGo', e.target.value)}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
