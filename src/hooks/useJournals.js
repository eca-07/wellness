import { useState, useEffect } from 'react';

const DEFAULT_JOURNAL = () => ({
  id: Date.now().toString(),
  date: new Date().toISOString(),
  title: '',
  entry: '',
  gratitudes: [],
  negativeEnergy: {
    thoughts: '',
    concerns: '',
    stressors: '',
    letGo: ''
  }
});

export function useJournals() {
  const [journals, setJournals] = useState(() => {
    const saved = localStorage.getItem('wellness_journals');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    localStorage.setItem('wellness_journals', JSON.stringify(journals));
  }, [journals]);

  const currentJournal = journals.find(j => j.id === currentId) || null;

  const createNew = () => {
    const newJ = DEFAULT_JOURNAL();
    setJournals(prev => [newJ, ...prev]);
    setCurrentId(newJ.id);
  };

  const selectJournal = (id) => {
    setCurrentId(id);
  };

  const updateCurrent = (updates) => {
    if (!currentId) return;
    setJournals(prev => prev.map(j => 
      j.id === currentId ? { ...j, ...updates } : j
    ));
  };
  
  const deleteJournal = (id) => {
    setJournals(prev => prev.filter(j => j.id !== id));
    if (currentId === id) setCurrentId(null);
  };

  return {
    journals,
    currentJournal,
    currentId,
    createNew,
    selectJournal,
    updateCurrent,
    deleteJournal
  };
}
