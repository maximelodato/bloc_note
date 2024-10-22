import React, { useState, useEffect } from 'react';
import MarkdownInput from './MarkdownInput';
import NoteDisplay from './NoteDisplay';
import NoteList from './NoteList';
import './style/main.scss';

function App() {
  // Charger les notes depuis le localStorage
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // Index de la note actuellement sélectionnée
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);

  // État pour gérer l'affichage du pop-up
  const [showPopup, setShowPopup] = useState(false);

  // Ajouter une nouvelle note
  const addNewNote = () => {
    const newNote = { title: 'Nouvelle Note', content: '' };
    setNotes([...notes, newNote]);
    setCurrentNoteIndex(notes.length);
  };

  // Supprimer une note
  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, noteIndex) => noteIndex !== index);
    setNotes(updatedNotes);

    // Ajuster l'index si nécessaire après suppression
    if (index === currentNoteIndex) {
      setCurrentNoteIndex(0);
    } else if (index < currentNoteIndex) {
      setCurrentNoteIndex(currentNoteIndex - 1);
    }
  };

  // Mettre à jour le contenu de la note actuelle (sans sauvegarder)
  const updateCurrentNoteContent = (newContent) => {
    const updatedNotes = [...notes];
    updatedNotes[currentNoteIndex] = {
      ...updatedNotes[currentNoteIndex],
      content: newContent,
    };
    setNotes(updatedNotes);
  };

  // Mettre à jour le titre de la note actuelle (sans sauvegarder)
  const updateCurrentNoteTitle = (newTitle) => {
    const updatedNotes = [...notes];
    updatedNotes[currentNoteIndex] = {
      ...updatedNotes[currentNoteIndex],
      title: newTitle,
    };
    setNotes(updatedNotes);
  };

  // Sauvegarder la note et afficher un pop-up
  const handleSave = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
    setShowPopup(true); // Afficher le pop-up

    // Masquer le pop-up après 3 secondes
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  // Obtenir la note actuelle en toute sécurité
  const currentNote = notes[currentNoteIndex] || { title: '', content: '' };

  return (
    <div className="container">
      <NoteList
        notes={notes}
        onSelectNote={setCurrentNoteIndex}
        onAddNote={addNewNote}
        onDeleteNote={deleteNote}
      />
      <div className="main-content">
        <NoteDisplay markdownText={currentNote.content} />
        <MarkdownInput
          markdownText={currentNote.content}
          onMarkdownChange={updateCurrentNoteContent}
          title={currentNote.title}
          onTitleChange={updateCurrentNoteTitle}
          onSave={handleSave} // Appel de la fonction de sauvegarde au clic
        />
        {/* Affichage du pop-up si `showPopup` est true */}
        {showPopup && <div className="popup">Note sauvegardée avec succès !</div>}
      </div>
    </div>
  );
}

export default App;
