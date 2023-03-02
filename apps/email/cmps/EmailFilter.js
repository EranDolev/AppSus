export default {
    template: `
        <section class="email-filter">
            <input 
                v-model="filterBy.txt"
             
                @input="filter" 
                placeholder="&#xF002;  Search mail" style="font-family:roboto, FontAwesome"
                type="text" />
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
            },
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
                console.log('filterBy changed', this.filterBy)
                this.$emit('filter', this.filterBy)
            },
            deep: true
        },
    },
}