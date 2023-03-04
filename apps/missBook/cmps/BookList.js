import BookPreview from './BookPreview.js'
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props:['books'],
    template:`
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id">
                    <BookPreview :book="book"/>
                    <RouterLink :to="'/apps/missBook/'+book.id">Details</RouterLink> |
                    <RouterLink :to="'/app/missBook/edit/'+book.id">Edit</RouterLink> |
                    <button @click="remove(book.id)">x</button>                    
                </li>
            </ul>
</section> 
    `,
        methods: {
            remove(bookId) {
                this.$emit('remove', bookId)
                // .then(savedBook => {
                    eventBus.emit('show-msg', { txt: 'Book deleted', type: 'success' })
                    // this.$router.push('/book')
                    // this.book = bookService.getEmptyBook()
                    // this.$emit('book-saved', savedBook)
                },
            showDetails(bookId){
                this.$emit('show-details', bookId)
            },
        },
        components: {
            BookPreview,
        }
}