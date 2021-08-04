import React, { useState } from "react";

import { NotesList } from "./notes-list";
import { NoteForm } from "./note-form";

function App({ service }) {
  // // Notes Service Object
  // this.service = this.props.service;

  const [selectedNote, setSelectedNote] = useState({});

  // this.state = {
  //   notes: [],
  //   selected: null,
  // };

  // (!) Get notes from service

  // Select new empty note
  function newNote() {}

  // Set note as selected
  function onSelect(note) {
    setSelectedNote(note);
  }

  // Save note to service
  function onSubmit(note) {}

  // Unselect note
  function onCancel() {}

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>React notes</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <NotesList
            notes={service.notes}
            onSelect={onSelect}
            selectedNote={selectedNote}
          />
        </div>
        <div className="col-md-8">
          <NoteForm />
          <div id="new-note">
            <button>New Note</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { App };
