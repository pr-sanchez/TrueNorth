import React from 'react'
import { act } from "react-dom/test-utils";
import { expect } from 'chai'
import sinon from 'sinon'
import { mount } from 'enzyme'

import flushPromises from 'flush-promises'

import { App } from '../components/app'
import { NotesService } from '../services/notes'

describe('App Component', () => {
    function createMockService() {
        const data = [{
            id: '4567', title: 'candidate test', text: 'candidate test'
        }]

        const svc = new NotesService(data)
        sinon.spy(svc, 'getNotes')
        sinon.spy(svc, 'saveNote')
        return svc
    }

    it('should call notesService.getNotes() when rendered', async () => {
        const mockService = createMockService()
        const wrapper = mount(<App service={mockService} />)

        await act(async () => {
            await flushPromises()
            wrapper.update()
        })

        expect(mockService.getNotes).to.have.been.called
    })

    it('should call notesService.saveNote() method after the form is submitted', async () => {
        const mockService = createMockService()
        const selectedNote = mockService.notes[0]
        const wrapper = mount(<App service={mockService} />)

        await act(async () => {
            await flushPromises()
            wrapper.update()

            wrapper.find('.list-group-item').at(0).simulate('click')
            wrapper.find('form [type="submit"]').simulate('click')
            wrapper.find('form').simulate('submit')
        })

        expect(mockService.saveNote, 'expected app to call saveNote() when form is submitted').to.have.been.calledWith(selectedNote)
    })

    it('should fetch notes from notesService and update notes list after the form is submitted', async () => {
        const mockService = createMockService()
        const originalLength = mockService.notes.length
        const wrapper = mount(<App service={mockService} />)

        // wait for first data load
        await act(async () => {
            await flushPromises()
            wrapper.update()
        })
        expect(wrapper.find('.list-group-item')).to.have.lengthOf(originalLength)

        // selecting an existing note, submitting the form
        wrapper.find('.list-group-item').at(0).simulate('click')
        wrapper.find('[name="title"]').simulate('change', { target: { name: "title", value: "urgent task" }})
        wrapper.find('[name="text"]').simulate('change', { target: { name: "text", value: "need to do it very fast" }})
        wrapper.find('form [type="submit"]').simulate('click')
        wrapper.find('form').simulate('submit')

        // wait for data reload
        await act(async () => {
            await flushPromises()
            wrapper.update()
        })

        expect(wrapper.find('.list-group-item')).to.have.lengthOf(originalLength)
    })

    it('should add a new note to the list after the note is saved', async () => {
        const mockService = createMockService()
        const wrapper = mount(<App service={mockService} />)

        await act(async () => {
            await flushPromises()
            wrapper.update()
        })

        wrapper.find('#new-note').simulate('click')
        wrapper.find('[name="title"]').simulate('change', { target: { name: "title", value: "buy milk" }})
        wrapper.find('[name="text"]').simulate('change', { target: { name: "text", value: "need some fresh milk" }})
        wrapper.find('form [type="submit"]').simulate('click')
        wrapper.find('form').simulate('submit')

        expect(mockService.saveNote,'saveNote() not called when form submitted').to.have.been.calledOnce;

        // Wait for saveNote
        await act(async () => {
            await flushPromises()
        })

        expect(mockService.getNotes, 'getNotes() not called after saveNote()').to.have.been.calledTwice;

        // Wait for second getNotes
        await act(async () => {
            await flushPromises()
            wrapper.update()
        })

        expect(wrapper.find('.list-group-item').length, 'saved note was not added to list').to.eq(mockService.notes.length)
        expect(wrapper.text()).to.contain("buy milk")
        expect(wrapper.text()).to.contain("need some fresh milk")
    })

    it('when existing note is saved it should be updated on list', async () => {
        const mockService = createMockService()
        const wrapper = mount(<App service={mockService} />)

        await act(async () => {
            await flushPromises()
            wrapper.update()
        })

        const note = mockService.notes[0];
        note.title = 'changed title'

        wrapper.find('.list-group-item').at(0).simulate('click')
        wrapper.find('[name="title"]').simulate('change')

        wrapper.find('form [type="submit"]').simulate('click')
        wrapper.find('form').simulate('submit')

        expect(mockService.saveNote,'saveNote() not called when form submitted').to.have.been.calledOnce;

        // Wait for saveNote
        await act(async () => {
            await flushPromises()
        })

        expect(mockService.getNotes, 'getNotes() not called after saveNote()').to.have.been.calledTwice;

        // Wait for second getNotes
        await act(async () => {
            await flushPromises()
            wrapper.update()
        })

        const item = wrapper.find('.list-group-item').at(0)
        expect(item, 'saved note was not updated on list').to.have.text(note.title)
    })
})
