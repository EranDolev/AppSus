import NotePreview from "../cmps/NotePreview.js"
import AddNote from "./AddNote.js"

export default {
    props: ['notes'],
    template: `
    <section class="note-list">
        <ul class="note-card">
            <li v-for="note in notes" :key="note.id"> 
                <button class="btn-round btn-close" @click="remove(note.id)">x</button>
                <RouterLink :to="'/apps/keep/'+note.id"><NotePreview :note="note"/></RouterLink>
            </li>
        </ul>

        <RouterLink :to="'/apps/keep/note-add/'" @save="onSaveNote"><button class="btn-add">Add Note</button></RouterLink>
    </section>
    `,
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        // showDetails(emailId) {
        //     this.$emit('show-details', emailId)
        // },
    },

    components: {
        NotePreview,
        AddNote,
    }
}