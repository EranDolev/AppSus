import { bookService } from "../../../services/book.service.js"
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
        <section v-if="book">
            <ul>
                <li class="review-list" v-for="review in reviews" :key="review.id">
                    <h3>{{ review.fullName }}</h3>
                    <p>{{ review.rating }}</p>
                    <p>Read At: {{ review.readAt }}</p>
                    <button @click="deleteReview(review.id)"><i class="fa-regular fa-trash-can"></i><i class="fa-regular fa-trash-can"></i></button>                
                </li>
            </ul>
        </section>
    `,
    data() {
        return{
            book: null,
        }
    },
    methods: {
        deleteReview(reviewId) {
            bookService.deleteReview(this.book.id, reviewId)
                .then((book) => {
                    eventBus.emit('show-msg', { txt: 'Review removed', type: 'success' })
                    this.book = book
                })
        }
    },
    created() {
        const { bookId } = this.$route.params
        console.log(this.$route.params)
        if (bookId) {
          bookService.get(bookId).then((book) => {
            this.book = book
            if (book.reviews) this.reviews = book.reviews
          })
        }
      },
}