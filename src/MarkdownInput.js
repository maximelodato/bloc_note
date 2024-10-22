import React from 'react';

function MarkdownInput({ markdownText, onMarkdownChange, title, onTitleChange, onSave }) {
  const handleContentChange = (event) => {
    onMarkdownChange(event.target.value);
  };

  const handleTitleChange = (event) => {
    onTitleChange(event.target.value);
  };

  return (
    <div className="note-editor">
      {/* Titre de la note */}
      <input 
        type="text" 
        value={title} 
        onChange={handleTitleChange} 
        placeholder="Titre de la note" 
        className="note-title-input"
      />
      
      {/* Contenu de la note */}
      <textarea 
        value={markdownText} 
        onChange={handleContentChange} 
        placeholder="Écrivez votre contenu en Markdown ici..." 
        className="note-content-textarea"
      />

      {/* Bouton pour sauvegarder la note */}
      <button className="save-note-button" onClick={onSave}>
        Sauvegarder
      </button>
    </div>
  );
}

export default MarkdownInput;
