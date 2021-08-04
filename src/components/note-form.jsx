import React from "react";

const defaultProps = {
  note: {
    title: "",
    text: "",
  },

  onChange: () => console.log("onChange"),
  onSubmit: () => console.log("onSubmit"),
  onCancel: () => console.log("onCancel"),
};

function NoteForm({ note, onChange, onSubmit, onCancel }) {
  //  //////////////////////////////////
  //  //////////////////////////////////
  //  ///////// PRIVATE METHODS ////////
  //  //////////////////////////////////
  //  //////////////////////////////////

  const { title, text } = note;

  //  //////////////////////////////////
  //  //////////////////////////////////
  //  //////// EVENT HANDLERS //////////
  //  //////////////////////////////////
  //  //////////////////////////////////

  function handleSubmitNote(event) {
    event.preventDefault();
    onSubmit(note);
  }

  //  //////////////////////////////////
  //  //////////////////////////////////
  //  ////////// RENDERERS /////////////
  //  //////////////////////////////////
  //  //////////////////////////////////

  return (
    <form onSubmit={handleSubmitNote}>
      <div className="form-group">
        <label>Title:</label>
        <input
          className="form-control"
          name="title"
          value={title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Note:</label>
        <textarea
          className="form-control"
          name="text"
          value={text}
          onChange={(e) => onChange({ text: e.target.value })}
        />
      </div>

      <div className="form-group">
        <input
          id="cancel-note"
          type="button"
          className="btn btn-default pull-right"
          value="Cancel"
          onClick={onCancel}
        />
        <input
          id="save-note"
          type="submit"
          className="btn btn-default pull-right"
          value="Save"
        />
      </div>
    </form>
  );
}

NoteForm.defaultProps = defaultProps;
export { NoteForm };
