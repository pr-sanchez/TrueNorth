import React, { useEffect, useState } from "react";

import { NotesList } from "./notes-list";
import { NoteForm } from "./note-form";

function App({ service }) {
  // // Notes Service Object

  const defaultNote = {
    id: "",
    title: "",
    text: "",
  };

  const [notes, setNotes] = useState([]);
  const [selected, setSelectedNote] = useState(defaultNote);

  async function getNotes() {
    const notes = await service.getNotes();

    setNotes(notes);
  }

  // (!) Get notes from service
  useEffect(() => {
    getNotes();
  }, []);

  // Select new empty note
  async function newNote() {
    service.saveNote(defaultNote);
    const notes = await service.getNotes();
    setNotes(notes);

    const lastNote = notes[notes.length - 1];

    onSelect(lastNote);
  }

  // Set note as selected
  function onSelect(note) {
    setSelectedNote(note);
  }

  // Save note to service
  function onSubmit(note) {
    service.saveNote(note);
    getNotes();
  }

  function onChange(note) {
    setSelectedNote({ ...selected, ...note });
  }

  // Unselect note
  function onCancel() {
    setSelectedNote(defaultNote);
  }

  function renderNewNoteButton() {
    if (selected.id !== "") {
      return null;
    }

    return (
      <div id="new-note">
        <button onClick={newNote}>New Note</button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>React notes</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <NotesList notes={notes} onSelect={onSelect} selected={selected} />
        </div>
        <div className="col-md-8">
          <NoteForm
            note={selected}
            onSubmit={onSubmit}
            onChange={onChange}
            onCancel={onCancel}
          />

          {renderNewNoteButton()}
        </div>
      </div>
    </div>
  );
}

export { App };
