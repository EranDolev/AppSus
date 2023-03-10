export default {
    template: `
        <section class="note-filter">
            <input class="note-search-input"
                v-model="filterBy.txt"
             
                placeholder="&#xF002;  Search note" style="font-family:roboto, FontAwesome"
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