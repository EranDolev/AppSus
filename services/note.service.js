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
    getNewNote
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
                    backgroundColor: '#f1c40f'
                },
                info: {
                    title: 'hello',
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: "/assets/img/my-img.jpg",
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#f1c40f'
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
                },
                style: {
                    backgroundColor: '#f1c40f'
                }
            },
            {
                id: 'n104',
                type: 'NoteVid',
                isPinned: false,
                info: {
                    url: "/assets/vid/video.mp4",
                    title: 'Erath Video'
                },
                style: {
                    backgroundColor: '#f1c40f'
                }
            },
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
    .then(notes => {
        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            notes = notes.filter(note => regex.test(note.type))
        }
        // if (filterBy.minPrice) {
        //     notes = notes.filter(note => note.listPrice.amount >= filterBy.minPrice)
        // }
        return notes
    })
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

function getNewNote() {
    return {
        id: null,
        createdAt: Date.now(),
        type: '',
        isPinned: false,
        style: {
            backgroundColor: '#f1c40f'
        },
        info: {},
    }
}