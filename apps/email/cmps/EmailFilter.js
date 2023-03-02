export default {
    template: `
        <section class="email-filter">
            <input 
                v-model="filterBy.txt"
             
                @input="filter" 
                placeholder="Search"
                type="text" />
        </section>
    `,
    data() {
        return {
            filterBy: {
<<<<<<< HEAD
                txt: '',
            },
=======
                 from: '' ,
                },
>>>>>>> e7d5170b7116f37da5055167415786aba1558ffc
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