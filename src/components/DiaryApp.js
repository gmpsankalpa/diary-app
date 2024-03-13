// src/components/DiaryApp.js
import React, { useState, useEffect } from 'react';
import DiaryForm from './DiaryForm';
import DiaryEntries from './DiaryEntries';
import './AuthenticationPage.css'; // Import the main CSS file for styling

const DiaryApp = () => {
  // Load data from localStorage on component mount
  const initialEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
  const [entries, setEntries] = useState(initialEntries);
  const [editingIndex, setEditingIndex] = useState(null);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  // Save data to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSaveEntry = (newEntry) => {
    if (authenticated) {
      if (editingIndex !== null) {
        const updatedEntries = [...entries];
        updatedEntries[editingIndex] = newEntry;
        setEntries(updatedEntries);
        setEditingIndex(null);
      } else {
        setEntries([...entries, newEntry]);
      }
    }
  };

  const handleEditEntry = (index) => {
    if (authenticated) {
      setEditingIndex(index);
    }
  };

  const handleDeleteEntry = (index) => {
    if (authenticated) {
      setEntries(entries.filter((_, i) => i !== index));
      setEditingIndex(null);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Reset incorrect password message when the user starts typing a new password
    setIncorrectPassword(false);
  };

  const handleAuthenticate = () => {
    const correctPassword = '1234'; // Change this to your desired password
    if (password === correctPassword) {
      setAuthenticated(true);
    } else {
      setIncorrectPassword(true);
    }
  };

  return (
    <div className="diary-app-container">
      {!authenticated ? (
        <div className="authentication-container">
          <h2>Diary Authentication</h2>
          <label htmlFor="password">Enter Password: </label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
          {incorrectPassword && <p className="incorrect-password-message">Incorrect password. Try again.</p>}
          <button onClick={handleAuthenticate}>Authenticate</button>
        </div>
      ) : (
        <div>
          <DiaryForm onSave={handleSaveEntry} editingEntry={editingIndex !== null ? entries[editingIndex] : null} />
          <DiaryEntries entries={entries} onEdit={handleEditEntry} onDelete={handleDeleteEntry} />
        </div>
      )}
    </div>
  );
};

export default DiaryApp;
