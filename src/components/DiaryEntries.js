// src/components/DiaryEntries.js
import React from 'react';
import './DiaryEntries.css';

const DiaryEntries = ({ entries, onEdit, onDelete }) => {
  return (
    <div className="diary-entries">
      <h2>Diary Entries</h2>
      <ul>
        {entries.map((entry, index) => (
          <li key={index} className="entry-item staggered-fade-in">
            <span className="entry-text">{entry.text}</span>
            <span className="entry-timestamp">{entry.timestamp}</span>
            <span className="entry-actions">
              <button onClick={() => onEdit(index)}>Edit</button>
              <button onClick={() => onDelete(index)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaryEntries;
