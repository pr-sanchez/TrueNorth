import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'

import { NotesList } from '../components/notes-list'
const notes = require('./notes.json')

describe('NotesList Component', () => {
    it('should show list of notes', () => {
        const wrapper = shallow(<NotesList notes={notes} />)
        expect(wrapper.find('.list-group-item'), 'List must have .list-group-item element for each note').to.have.lengthOf(notes.length)
    })

    it('should call onSelect function after note was clicked', () => {
        const onSelect = sinon.spy()
        const wrapper = mount(<NotesList notes={notes} onSelect={onSelect} />)
        const item = wrapper.find('.list-group-item').at(1)
        item.simulate('click')

        expect(onSelect).to.have.been.calledWith(notes[1])
    })

    it('should add `active` class to a note after it was selected', () => {
        const note = notes[1]
        const wrapper = mount(<NotesList notes={notes} selected={note} />)

        const item = wrapper.find('.list-group-item').at(1)
        expect(item, `expected selected note to have 'active' class`).to.have.className('active')
    })
})
