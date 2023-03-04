import BookPreview from './BookPreview.js'
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props:['books'],
    template:`
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id">
                    <BookPreview :book="book"/>
                    <nav class="nav-book-btns">
                        <button class="btn-book-close"> <RouterLink class="a-book"  :to="'/apps/missBook/'+book.id"><i class="fa-solid fa-book-open"></i></RouterLink></button> 
                        <button class="btn-book-close"> <RouterLink class="a-book"  :to="'/app/missBook/edit/'+book.id"><i class="fa-solid fa-pencil"></i></RouterLink></button> 
                        <button class="btn-book-close" @click="remove(book.id)"><i class="fa-solid fa-trash-can"></i></button>                    
                    </nav>
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