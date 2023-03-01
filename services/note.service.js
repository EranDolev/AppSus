'use strict'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const NOTE_KEY = "noteDB"

_createNotes()

export const NoteService = {
    query,
    get,
    remove,
    save,
    // getEmpty,
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            { 
                id: 'n101', 
                createdAt: 1112222, 
                type: 'NoteTxt', 
                isPinned: true, 
                style: { 
                    backgroundColor: '#00d' 
                }, 
                info: { 
                    txt: 'Fullstack Me Baby!' 
                } 
            }, 
            { 
                id: 'n102', 
                type: 'NoteImg', 
                isPinned: false, 
                info: { 
                    url: 'http://some-img/me', 
                    title: 'Bobi and Me' 
                }, 
                style: { 
                    backgroundColor: '#00d' 
                } 
            }, 
            { 
                id: 'n103', 
                type: 'NoteTodos', 
                isPinned: false, 
                info: { 
                    title: 'Get my stuff together', 
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ] 
                } 
            }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
    // .then(emails => {
    //     if (filterBy.txt) {
    //         const regex = new RegExp(filterBy.txt, 'i')
    //         emails = emails.filter(email => regex.test(email.from))
    //     }
    //     if (filterBy.minPrice) {
    //         emails = emails.filter(email => email.listPrice.amount >= filterBy.minPrice)
    //     }
    //     return emails
    // })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
    // .then(_setNextPrevEmailId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}