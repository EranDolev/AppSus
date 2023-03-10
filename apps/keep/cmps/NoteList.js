import NotePreview from "../cmps/NotePreview.js"
import AddNote from "./AddNote.js"

export default {
    props: ['notes'],
    template: `
    <section class="note-header">
        <AddNote @save="save"/>
        <!-- NOTE FILTER -->
    </section>
        <section class="note-list">
                <article class="notes-sec" :class="getClass(note)" v-for="note in notes" :key="note.id"> 
                        <article class="note-article">
                            
                            <!-- <button class="btn-round btn-close" @click="remove(note.id)">x</button>   -->
                            <NotePreview  :note="note" @remove="remove" @save="save"/>
                        </article>   
                </article>

            <!-- <RouterLink class="link-btn-add" :to="'/apps/keep/note-add/'"><button class="btn-add">Add Note</button></RouterLink> -->
        </section>
    `,
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        getClass(note) {
            if (note.isPinned) { return 'pinned' }
            else return 'not-pinned'
        },
        save(note) {
            this.$emit('save', note)
        },
    },

    components: {
        NotePreview,
        AddNote,
    }
}