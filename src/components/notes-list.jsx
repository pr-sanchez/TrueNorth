import React from "react";

const defaultProps = {
  notes: [],
  selected: {},
  onSelect: () => console.log("onSelect"),
};

function NotesList({ notes, selected, onSelect }) {
  //  //////////////////////////////////
  //  //////////////////////////////////
  //  ////////// RENDERERS /////////////
  //  //////////////////////////////////
  //  //////////////////////////////////

  function renderNotes() {
    if (notes.length > 0 === false) {
      return null;
    }

    const mappedNotes = notes.map((note) => {
      return (
        <div
          key={note.id}
          className={
            note.id === selected.id
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onSelect(note)}
        >
          {note.title}
        </div>
      );
    });

    return mappedNotes;
  }

  return <div className="list-group">{renderNotes()}</div>;
}

NotesList.defaultProps = defaultProps;
export { NotesList };
