import React from "react";

const defaultProps = {
  notes: [],
  selectedNote: {},
  onSelect: () => console.log("onSelect"),
};

function NotesList({ notes, selectedNote, onSelect }) {
  function NotesItem({ note }) {
    function handleNoteClick() {
      onSelect(note);
    }

    let className = "list-group-item";

    if (note.id === selectedNote.id) {
      className = className.concat(" ", "active");
    }

    return (
      <div className={className} onClick={handleNoteClick}>
        {note.title}
      </div>
    );
  }

  function renderNotes() {
    if (notes.length > 0 === false) {
      return null;
    }

    const mappedNotes = notes.map((note) => {
      return (
        <NotesItem
          key={note.id}
          note={note}
          selectedNote={selectedNote}
          onSelect={onSelect}
        />
      );
    });

    return mappedNotes;
  }

  return <div className="list-group">{renderNotes()}</div>;
}

NotesList.defaultProps = defaultProps;

export { NotesList };
