import React, { useEffect, useState } from "react";

import { NotesList } from "./notes-list";
import { NoteForm } from "./note-form";

function App({ service }) {
  //  //////////////////////////////////
  //  //////////////////////////////////
  //  ///////// PRIVATE METHODS ////////
  //  //////////////////////////////////
  //  //////////////////////////////////

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

  async function newNote() {
    service.saveNote(defaultNote);

    const notes = await service.getNotes();
    const lastNote = notes[notes.length - 1];

    setNotes(notes);
    onSelect(lastNote);
  }

  //  //////////////////////////////////
  //  //////////////////////////////////
  //  //////// EVENT HANDLERS //////////
  //  //////////////////////////////////
  //  //////////////////////////////////

  function onSelect(note) {
    setSelectedNote(note);
  }

  function onSubmit(note) {
    service.saveNote(note);
    getNotes();
  }

  function onChange(note) {
    setSelectedNote({ ...selected, ...note });
  }

  function onCancel() {
    setSelectedNote(defaultNote);
  }

  //  //////////////////////////////////
  //  //////////////////////////////////
  //  ////////// RENDERERS /////////////
  //  //////////////////////////////////
  //  //////////////////////////////////

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
