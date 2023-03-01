import NotePreview from "../cmps/NotePreview.js"

export default {
    props: ['notes'],
    template: `
    <section class="note-list">
        <ul>
            <li v-for="note in notes" :key="note.id"> 
                <RouterLink :to="'/apps/keep/'+note.id"><NotePreview :note="note"/></RouterLink>
            </li>
        </ul>
    </section>
    `,
    // methods: {
    //     showDetails(emailId) {
    //         this.$emit('show-details', emailId)
    //     },
    // },

    components: {
        NotePreview,
    }
}