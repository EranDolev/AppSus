export default {
    template: `
        <section class="email-filter">
            <input 
                v-model="filterBy.from"
                @input="filter" 
                placeholder="Search From"
                type="text" />
        </section>
    `,
    data() {
        return {
            filterBy: { from: '' },
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    },
    watch: {
        filterBy: {
            handler() {
                // console.log('filterBy changed', this.filterBy)
                this.$emit('filter', this.filterBy)
            },
            deep: true
        },
    },
}