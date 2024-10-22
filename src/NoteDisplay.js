import React from 'react';
import Showdown from 'showdown';

function NoteDisplay({ markdownText }) {
  const converter = new Showdown.Converter();
  const html = converter.makeHtml(markdownText);

  return (
    <div className="note-display">
      {/* Vérification de la présence de contenu avant d'afficher */}
      {markdownText ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <p className="empty-note-message">Aucune note à afficher pour le moment</p>
      )}
    </div>
  );
}

export default NoteDisplay;
