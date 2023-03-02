import TodoPreview from './TodoPreview.js'
import { NoteService } from '../../../services/note.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    props: ['note'],
    template: `
        <article @mouseover="showBtn=true"  @mouseleave="showBtn=false" class="note-card" :style="{ 'background-color': note.style.backgroundColor }">
        <nav class="nav-edit-note flex">
<<<<<<< HEAD
            <button v-if="showBtn" class=" btn-edit btn-round btn-close" @click="remove(this.note.id)">x</button>
            <label v-if="showBtn" for="create-color"><i class="fa-solid fa-eye-dropper"></i>
                <input  id="create-color" class="btn-edit" @change="updateNote(this.note)" v-model="this.note.style.backgroundColor" type="color" style="display: none">
            </label>
            <button v-if="showBtn" class="btn-edit btn-round" @click="duplicateNote(this.note)">duplicate</button>
            <button v-if="showBtn" class="btn-edit btn-round" @click="pinNote(this.note)">Pin</button>
=======
            <button v-if="showBtn" class=" btn-edit btn-close" @click="remove(note.id)"><i class="fa-regular fa-trash-can"></i></button>
            <label class="btn-color btn-close" v-if="showBtn" for="create-color"><i class="fa-solid fa-eye-dropper"></i>
                <input  id="create-color" class="btn-edit" @change="updateNote(this.note)" v-model="this.note.style.backgroundColor" type="color" style="display: none">
            </label>
            <button v-if="showBtn" class="btn-edit btn-close" @click="duplicateNote(this.note)"><i class="fa-regular fa-copy"></i></button>
>>>>>>> 5651eb7d8cbc16d8242dcf6906950d25296de330
        </nav>
        <!-- <br> -->
            <article class="note-txt" v-if="note.type === 'NoteTxt'">
                <span>{{ note.info.txt }}</span>
            </article>
            <article class="note-img" v-if="note.type === 'NoteImg'">
                <span>{{ note.info.title }}</span>
                <img :src="note.info.url" alt="url">
            </article>
            <article class="note-todos" v-if="note.type === 'NoteTodos'">
                <span>{{ note.info.title }}</span>
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