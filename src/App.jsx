import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { JournalEditor } from './components/JournalEditor';
import { SettingsModal } from './components/SettingsModal';
import { usePreferences } from './hooks/usePreferences';
import { useJournals } from './hooks/useJournals';

function App() {
  const { prefs, updatePrefs } = usePreferences();
  const { 
    journals, 
    currentJournal, 
    currentId, 
    createNew, 
    selectJournal, 
    updateCurrent, 
    deleteJournal 
  } = useJournals();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="app-container" style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <Sidebar 
        journals={journals} 
        currentId={currentId}
        selectJournal={selectJournal} 
        createNew={createNew} 
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      <JournalEditor 
        journal={currentJournal}
        updateJournal={updateCurrent}
        deleteJournal={deleteJournal}
      />

      {isSettingsOpen && (
        <SettingsModal 
          prefs={prefs} 
          updatePrefs={updatePrefs} 
          onClose={() => setIsSettingsOpen(false)} 
        />
      )}
    </div>
  );
}

export default App;
