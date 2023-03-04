export default {
    template: `
        <section class="book-filter">
            <input 
            placeholder="&#xF002;  Search book" style="font-family:roboto, FontAwesome"
                v-model="filterBy.title"
                @input="filter" 
                type="text" />
        </section>
    `,
    data() {
        return {
            filterBy: { title: '', listPrice:{amount:0} },
        }
    },
    methods: {
        filter(){
            this.$emit('filter', this.filterBy)
        }
    }
}