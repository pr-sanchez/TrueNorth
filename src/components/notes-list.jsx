import React from 'react'

export class NotesList extends React.Component{

    static defaultProps = {
        notes: []
    }

    render(){
        return <div className="list-group">
            <div className="list-group-item active">Active note example</div>
            <div className="list-group-item">Inactive note example</div>
        </div>
    }
}
