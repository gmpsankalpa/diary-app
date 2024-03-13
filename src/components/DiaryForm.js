// src/components/DiaryForm.js
import React, { useState, useEffect } from 'react';
import './DiaryForm.css';

const DiaryForm = ({ onSave, editingEntry }) => {
  const [entry, setEntry] = useState('');

  useEffect(() => {
    if (editingEntry) {
      setEntry(editingEntry.text);
    } else {
      setEntry('');
    }
  }, [editingEntry]);

  const handleInputChange = (e) => {
    setEntry(e.target.value);
  };

  const handleSave = () => {
    if (entry.trim() !== '') {
      onSave({
        text: entry,
        timestamp: new Date().toLocaleString(),
      });
      setEntry('');
    }
  };

  return (
    <div className={`diary-form ${editingEntry ? 'editing' : ''} slide-in-up`}>
      <textarea
        placeholder="Write your entry..."
        value={entry}
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>
        {editingEntry ? 'Update Entry' : 'Save Entry'}
      </button>
    </div>
  );
};

export default DiaryForm;
