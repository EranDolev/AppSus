import { NoteService } from '../../../services/note.service.js'
import NoteList from '../cmps/NoteList.js'
import NoteFilter from '../cmps/NoteFilter.js'
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
    <!-- <h1>hello note world</h1> -->
    <section class="keep-index">
    <NoteFilter @filter="setFilterBy"/>
            <!-- <NoteList
                :notes="filteredNotes"
                @remove="removeNote" /> -->

    <NoteList :notes = "notes" @remove="removeNote" @save="notesToShow"/>
    <!-- <pre> {{ user }} </pre> -->
    </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: {},
        }
    },
    created() {
       this.notesToShow()
    },
    methods: {
        removeNote(noteId) {
            NoteService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                    eventBus.emit('show-msg', { txt: 'note removed', type: 'success' })
                })
                .catch(err => {
                    eventBus.emit('show-msg', { txt: 'note remove failed', type: 'error' })
                })
        },

        notesToShow(){
            NoteService.query()
            .then(notes => {
                this.notes = notes
            })
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
    components: {
        NoteList,
        NoteFilter,
    }


}