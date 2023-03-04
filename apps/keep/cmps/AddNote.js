import { NoteService } from "../../../services/note.service.js";
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['note'],
    template: `
        <section class="sec-add-note">
            <div class="nav-note-container">
                <nav class="nav-add-note">
                    <input @click="setNoteType('txt', note)" class="input-note" v-model="this.note.info.title" id="text" type="text" placeholder='Enter a Title'>
                    <button class="btn-note"  @click="setNoteType('txt', note)" >Text</button>
                    <button class="btn-note" @click="setNoteType('img', note)">Image</button>
                    <button class="btn-note" @click="setNoteType('todo', note)">To Do List</button>
                </nav>
            </div>
            <form class="form-compose-note"  :class="{ isShown : note.shown}" @submit.prevent="saveNote">
                <input v-if="selectedType === 'txt'" v-model="this.note.info.txt" id="text"  type="text" placeholder="Enter your text">

                <!-- <input v-if="selectedType === 'todo'" v-model="this.note.info.title" id="text"  type="text" placeholder="Enter Todo list title"> -->
                <input v-if="selectedType === 'todo'" v-model="string" id="text"  type="text" placeholder="Enter comma separated list">

                <!-- <input v-if="selectedType === 'img'" v-model="this.note.info.title" id="text"  type="text" placeholder="Give Cool Title"> -->
                <input v-if="selectedType === 'img'" v-model="this.note.info.url" id="text"  type="text" placeholder="Enter Image URL">
            <button v-if="note.shown === true">save note</button>
            </form>
        </section>
    `,
    data() {
        return {
            string: '',
            selectedType: '',
            placeholder: 'Take a note...',
            note: {
                id: null,
                createdAt: Date.now(),
                type: '',
                isPinned: false,
                style: { backgroundColor: '#cbf0f8' },
                info: {},
                shown: false,
            }
        }
    },
    methods: {
        setNoteType(type, note) {
            this.selectedType = type
            this.placeholder = "Your title"
            note.shown = true
            console.log(this.selectedType)
        },
        saveNote() {
            console.log('note:', this.note)
            if (this.selectedType === 'txt') {
                this.note.type = 'NoteTxt'
            } else if (this.selectedType === 'todo') {
                this.note.type = 'NoteTodos'
                let arr = this.string.split(',')
                this.note.info.todos = []
                console.log(this.note.info.todos)
                for (let i = 0; i < arr.length; i++) {
                    let object = {}
                    object.txt = arr[i]
                    object.doneAt = null
                    this.note.info.todos.push(object)
                }
            } else if (this.selectedType === 'img') {
                this.note.type = 'NoteImg'
            }
            this.$emit('save', this.note)

        }
    },

}