import TodoPreview from './TodoPreview.js'
import { NoteService } from '../../../services/note.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    props: ['note'],
    template: `
        <article @mouseover="showBtn=true"  @mouseleave="showBtn=false" class="note-card" :style="{ 'background-color': note.style.backgroundColor }">
        <nav class="nav-edit-note flex">
            <button v-if="showBtn" class=" btn-edit btn-round btn-close" @click="remove(this.note.id)">x</button>
            <label v-if="showBtn" for="create-color"><i class="fa-solid fa-eye-dropper"></i>
                <input  id="create-color" class="btn-edit" @change="updateNote(this.note)" v-model="this.note.style.backgroundColor" type="color" style="display: none">
            </label>
            <button v-if="showBtn" class="btn-edit btn-round" @click="duplicateNote(this.note)">duplicate</button>
            <button v-if="showBtn" class="btn-edit btn-round" @click="pinNote(this.note)">Pin</button>
        </nav>
        <br>
            <article class="note-txt" v-if="note.type === 'NoteTxt'">
                <h3>{{ note.info.txt }}</h3>
            </article>
            <article class="note-img" v-if="note.type === 'NoteImg'">
                <h3>{{ note.info.title }}</h3>
                <img :src="note.info.url" alt="url">
            </article>
            <article class="note-todos" v-if="note.type === 'NoteTodos'">
                <h3>{{ note.info.title }}</h3>
                <ul>
                    <li :style="{ 'background-color': note.style.backgroundColor }" v-for="todo in note.info.todos" :key="note.info.todo"> 
                        <TodoPreview :todo="todo"/>
                    </li>
                </ul>
            </article>
        </article>
    `,
    data() {
        return {
            showBtn: false
        }
    },
    components: {
        TodoPreview,
    },
    methods: {
        save(note) {
            NoteService.save(note)
                .then(savedNote => {
                    eventBus.emit('show-msg', { txt: 'Note saved', type: 'success' })
                    note = savedNote
                    this.$router.push('/apps/keep/')
                })
        },
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        updateNote(note) {
            console.log(note)
            this.save(note)
        },
        pinNote(note) {
            note.isPinned = !note.isPinned
            this.save(note)
        },
        duplicateNote(note) {
            let newNote = NoteService.getNewNote()
            newNote.info = note.info
            newNote.type = note.type
            newNote.style = note.style
            this.save(newNote)
        }
    }
}