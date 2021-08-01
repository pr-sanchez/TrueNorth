import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import { shallow, mount } from 'enzyme'

import { NoteForm } from '../components/note-form'
const notes = require('./notes.json')

describe('NoteForm Component', () => {
    it('should display title and note form input fields after note is selected', () => {
        const note = notes[1]
        const wrapper = mount(<NoteForm note={note} />)
        expect(wrapper.find('[name="title"]')).to.have.value(note.title)
        expect(wrapper.find('[name="text"]')).to.have.value(note.text)
    })

    it('should call onChange with changed form values', () => {
        const onChange = sinon.spy()
        const note = { title: '', text: '' }
        const wrapper = mount(<NoteForm note={note} onChange={onChange} />)

        const titleInput = wrapper.find('[name="title"]')
        titleInput.instance().value = 'test'
        const noteInput = wrapper.find('[name="text"]')
        noteInput.instance().value = 'test'

        titleInput.simulate('change', { target: titleInput.getDOMNode() })
        expect(onChange).to.have.been.calledWithMatch({ title: 'test' })
        noteInput.simulate('change', { target: noteInput.getDOMNode() })
        expect(onChange).to.have.been.calledWithMatch({ text: 'test' })
    })

    it('should call onSubmit with changed note after the form is submitted', () => {
        const onSubmit = sinon.spy()
        const note = { title: '', text: '' }
        const wrapper = mount(<NoteForm note={note} onSubmit={onSubmit} />)

        wrapper.find('form [type="submit"]').simulate('click')
        wrapper.find('form').simulate('submit')
        expect(onSubmit).to.have.been.calledWithExactly(note)
    })
})
