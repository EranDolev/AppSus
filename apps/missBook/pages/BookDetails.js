import { bookService } from "../../../services/book.service.js"
import AddReview from "../cmps/AddReview.js"
import LongText from '../cmps/LongText.js'
import ReviewPreview from '../cmps/ReviewPreview.js'

export default {
    template: `
        <section class="book-details" v-if="book">
            <h2>Book Name: {{ book.title }}</h2>
            <h3>Author: {{ authors }}</h3>
            <h3 :class="isExpensive">{{ book.listPrice.amount }}  {{ book.listPrice.currencyCode }}</h3>
            <!-- <h4>Description: <br> {{ book.description }}</h4> -->
            <h4>Description: <br> <LongText :txt="book.description"/></h4>

            <h2 v-if="book.pageCount > 500" >Serious Reading</h2>
            <h3 v-else-if="book.pageCount > 200" >Decent Reading</h3>
            <h3 v-else-if="book.pageCount < 100" >Light Reading</h3>
            <h3 v-if="this.currYear - book.publishedDate > 10 ">Vintage</h3>
            <h3 v-else>New</h3>
            <img class="on-sale" v-if="book.listPrice.isOnSale" :src="'../assets/images/on-sale.png'" alt="">
            <AddReview />
            <ReviewPreview />
            <nav class="nav-next-book">
                <RouterLink class="book-nav-btns" :to="'/apps/missBook/' + book.prevBookId">Previous Book</RouterLink> 
                <RouterLink class="book-nav-btns" to="/apps/MissBook">Back to list</RouterLink> 
                 <RouterLink class="book-nav-btns" :to="'/apps/missBook/' + book.nextBookId">Next Book</RouterLink>  
            </nav>

        </section>
    `,
    data() {
        return {
            book: null,
            currYear: new Date().getFullYear()
        }
    },
    created() {
        console.log('Params:', this.$route.params)
        this.loadBook()
    },
    computed: {
        isExpensive() {
            if (this.book.listPrice.amount > 150) return 'red'
            else if (this.book.listPrice.amount < 20) return 'green'
        },
        authors() {
            return this.book.authors.join(', ')
        },
        bookId() {
            console.log(this.$route.params.bookId)
            return this.$route.params.bookId
        }
    },
    watch:{
        bookId(){
            this.loadBook()
        }
    },
    methods: {
        loadBook() {
            console.log(this.bookId)
            bookService.get(this.bookId)
                .then(book => this.book = book)
        }
    },
    components: {
        LongText,
        AddReview,
        ReviewPreview
    }
}