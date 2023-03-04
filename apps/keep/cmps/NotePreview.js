import TodoPreview from './TodoPreview.js'
import { NoteService } from '../../../services/note.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    props: ['note'],
    template: `
        <article @mouseover="showBtn=true"  @mouseleave="showBtn=false" class="note-card" :style="{ 'background-color': note.style.backgroundColor }">
            <nav class="nav-edit-note flex">
                <button title="delete" v-if="showBtn" class=" btn-edit btn-close" @click="remove(this.note.id)"><i class="fa-regular fa-trash-can"></i></button>
                <button title="Background Color" @click="showClr=!showClr"  @mouseleave="showClr=false" class="btn-edit btn-close" v-if="showBtn" for="create-color"><i class="fa-solid fa-eye-dropper"></i>
                    <nav v-if="showClr" id="create-color" class="nav-color-picker">
                   <!-- COLOR BTNS -->
                        <button class="btn-color btn-pink" @click="changeClr(this.note,'#fdcfe8')"></button>
                        <button class="btn-color btn-purple" @click="changeClr(this.note,'#d7aefb')"></button>
                        <button class="btn-color btn-darkblue" @click="changeClr(this.note,'#aecbfa')"></button>
                        <button class="btn-color btn-blue" @click="changeClr(this.note,'#cbf0f8')"></button>
                        <button class="btn-color btn-green" @click="changeClr(this.note,'#ccff90')"></button>
                        <button class="btn-color btn-yellow" @click="changeClr(this.note,'#fff475')"></button>
                        <button class="btn-color btn-red" @click="changeClr(this.note,'#f28b82')"></button>
                    </nav>
                </button>
                    <!-- <input  id="create-color" class="btn-edit" @change="updateNote(this.note)" v-model="this.note.style.backgroundColor" type="color" style="display: none"> -->
                <button title="Duplicate Note" v-if="showBtn" class="btn-edit btn-round" @click="duplicateNote(this.note)"><i class="fa-regular fa-copy"></i></button>
                <button title="Pin Note" v-if="showBtn" class="btn-edit btn-round" @click="pinNote(this.note)"><i class="fa-solid fa-map-pin"></i></button>
                <button title="Edit Note" v-if="showBtn" class="btn-edit btn-round" @click="editNote(this.note)"><i class="fa-solid fa-pencil"></i></button>
            </nav>

            <article class="note-txt" v-if="note.type === 'NoteTxt'">
                <h3 class="note-title" v-if="!note.edit">{{ note.info.title }}</h3>
                <span v-if="!note.edit">{{ note.info.txt }}</span>
                <article v-if="note.edit">
                    <input v-model="this.note.info.txt" id="text"  type="text">
                    <button @click="save(this.note)">save</button>
                </article>
            </article>
            <article class="note-img" v-if="note.type === 'NoteImg'">
                <article v-if="!note.edit">
                    <h3>{{ note.info.title }}</h3>
                    <img :src="note.info.url" alt="url">
                </article>
                <article v-if="note.edit">
                    <input v-model="this.note.info.title" id="title"  type="title">
                    <input v-model="this.note.info.url" id="url"  type="url">
                    <button @click="save(this.note)">save</button>
                </article>
            </article>
            <article class="note-vid" v-if="note.type === 'NoteVid'">
                <article v-if="!note.edit">
                    <h3>{{ note.info.title }} (press to play / pause)</h3>
                    <video width="320" height="200" onclick="this.paused ? this.play() : this.pause();">
                        <source :src="note.info.url" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </article>
                <article v-if="note.edit">
                    <input v-model="this.note.info.title" id="title"  type="title">
                    <input v-model="this.note.info.url" id="url"  type="url">
                    <button @click="save(this.note)">save</button>
                </article>
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
            showBtn: false,
            showClr: false
        }
    },
    components: {
        TodoPreview,
    },
    methods: {
        save(note) {
            note.edit = false
            NoteService.save(note)
                .then(savedNote => {
                    note = savedNote
                    this.$emit('save', note)
                })
        },
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        updateNote(note) {
            this.save(note)
            eventBus.emit('show-msg', { txt: 'Note updated', type: 'success' })
        },
        pinNote(note) {
            note.isPinned = !note.isPinned
            this.save(note)
            eventBus.emit('show-msg', { txt: 'Note pinned', type: 'success' })
        },
        duplicateNote(note) {
            let newNote = NoteService.getNewNote()
            newNote.info = note.info
            newNote.type = note.type
            newNote.style = note.style
            this.save(newNote)
            eventBus.emit('show-msg', { txt: 'Note duplicated', type: 'success' })

        },
        changeClr(note,clr) {

            note.style.backgroundColor = clr
            console.log('note.style.backgroundColor = clr: ', note.backgroundColor,clr);
            this.updateNote(note)
        },
        editNote(note){
            note.edit = true
            console.log(note)
        }
    }
}