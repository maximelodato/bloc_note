import React from 'react';

function NoteList({ notes, onSelectNote, onAddNote, onDeleteNote }) {
  return (
    <div className="note-list">
      {/* Bouton pour ajouter une nouvelle note */}
      <button onClick={onAddNote} className="add-note-button">Nouvelle Note</button>

      {/* Vérification que `notes` est défini et est un tableau */}
      {notes && notes.length > 0 ? (
        <ul>
          {notes.map((note, index) => (
            <li key={index} className="note-item">
              <div onClick={() => onSelectNote(index)} className="note-content">
                <h3>{note.title}</h3>
                <p>{note.content ? note.content.split(' ').slice(0, 15).join(' ') : 'Pas de contenu'}...</p>
              </div>
              <button onClick={() => onDeleteNote(index)} className="delete-note-button">
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-notes-message">Aucune note disponible</p>
      )}
    </div>
  );
}

export default NoteList;
