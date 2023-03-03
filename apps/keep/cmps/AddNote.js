import { NoteService } from "../../../services/note.service.js";
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template:`
        <h1>add note</h1>
        <button @click="setNoteType('txt')">Text</button>
        <button @click="setNoteType('img')">Image</button>
        <button @click="setNoteType('todo')">To Do List</button>
        <form class="form-compose" @submit.prevent="saveNote">
            <input v-if="selectedType === 'txt'" v-model="this.note.info.txt" id="text"  type="text">

            <input v-if="selectedType === 'todo'" v-model="this.note.info.title" id="text"  type="text" placeholder="Enter Todo list title">
            <input v-if="selectedType === 'todo'" v-model="string" id="text"  type="text" placeholder="Enter comma separated list">

            <input v-if="selectedType === 'img'" v-model="this.note.info.title" id="text"  type="text" placeholder="Give Cool Title">
            <input v-if="selectedType === 'img'" v-model="this.note.info.url" id="text"  type="text" placeholder="Enter Image URL">
        <button>save note</button>
        </form>
    `,
    data() {
        return {
            string: '',
            selectedType: 'txt',
            note: {
                id: null,
                createdAt: Date.now(),
                type: '',
                isPinned: false,
                style: { backgroundColor: '#00d' },
                info: {}
            }
        }
    },
    methods: {
        setNoteType(type) {
            this.selectedType = type
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
                for (let i = 0; i<arr.length; i++){
                    let object = {}
                    object.txt = arr[i]
                    object.doneAt = null
                    this.note.info.todos.push(object)
                }
            } else if (this.selectedType === 'img') {
                this.note.type = 'NoteImg'
            }
            NoteService.save(this.note)
                .then(savedNote => {
                    eventBus.emit('show-msg', { txt: 'Note saved', type: 'success' })
                    this.note = savedNote
                    this.$router.push('/apps/keep')
                    this.$emit('save', this.note)
                })
                .catch(err => {
                    eventBus.emit('show-msg', { txt: 'Note save failed', type: 'error' })
                })
        }
    },
    
}