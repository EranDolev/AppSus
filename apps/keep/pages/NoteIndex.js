import { NoteService } from '../../../services/note.service.js'
import NoteList from '../cmps/NoteList.js'

export default {
    template: `
    <h1>hello note world</h1>
    <section class="keep-index">
    <NoteList :notes = "notes"/>
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
    components: {
        NoteList,
    }


}