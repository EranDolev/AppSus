import EmailIndex from "../pages/EmailIndex.js"

export default {
    template: `
        <div class="sec-folder-list">
            <nav class="nav-folder-list">
                <ul class="folder-list-card">
                    <RouterLink :to="'/apps/email/email-compose/'"><button class="btn-compose"><i class="fa-solid fa-pencil"></i> </button></RouterLink>
                    <button @click="setFilter('inbox')" class="btn-inbox"><i class="fa-solid fa-inbox"></i></button>
                    <button @click="setFilter('sent')" class="btn-inbox"><i class="fa-solid fa-inbox"></i>sent</button>
                    <!-- <RouterLink :to="'/apps/email/email-compose/'"><button class="btn-compose"><i class="fa-solid fa-pencil"></i> </button></RouterLink>
                    <RouterLink :to="'/apps/email/email-compose/'"><button class="btn-compose"><i class="fa-solid fa-pencil"></i> </button></RouterLink>
                    <RouterLink :to="'/apps/email/email-compose/'"><button class="btn-compose"><i class="fa-solid fa-pencil"></i> </button></RouterLink> -->
                </ul>
            </nav>
        </div>
    `,
        data() {
            return {
                filterBy: {
                    sendSent: '',
                },
            }
        },
    methods: {
        setFilter(value) {
            this.filterBy.sendSent = value
            console.log(value)
            this.$emit('filter', this.filterBy)
        }
    },
    components: {
        // EmailIndex,
    },
}