import { NoteService } from '../../../services/note.service.js'
import NoteList from '../cmps/NoteList.js'
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
    <h1>hello note world</h1>
    <section class="keep-index">
    <NoteList :notes = "notes" @remove="removeNote"/>
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
        NoteService.query()
            .then(notes => {
                this.notes = notes
            })
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
    },
    components: {
        NoteList,
    }


}