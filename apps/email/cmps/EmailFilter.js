export default {
    template: `
        <section class="email-filter">
            
            <input 
                v-model="filterBy.txt"
             
                
                placeholder="&#xF002;  Search mail" style="font-family:roboto, FontAwesome"
                type="text" />
                <select class="select-unread"   @change="filterRead($event)">
                        <option value="all">All</option>
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                </select>
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
        filterRead(event){
            // console.log("value",event.target.value);
            this.$emit('filterRead', event.target.value)
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