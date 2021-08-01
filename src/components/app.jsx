import React from 'react'

import { NotesList } from './notes-list'
import { NoteForm } from './note-form'

export class App extends React.Component {

    constructor(props) {
        super(props)

        // Notes Service Object
        this.service = this.props.service;

        this.state = {
            notes: [],
            selected: null
        }

    }

    // (!) Get notes from service

    // Select new empty note
    newNote(){

    }

    // Set note as selected
    onSelect(note){

    }

    // Save note to service
    onSubmit(note){

    }

    // Unselect note
    onCancel(){

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>React notes</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <NotesList notes={[]} />
                    </div>
                    <div className="col-md-8">
                        <NoteForm />
                        <div id="new-note"><button>New Note</button></div>
                    </div>
                </div>
            </div>
        )
    }
}
