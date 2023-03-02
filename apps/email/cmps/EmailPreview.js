export default {
    props: ['email'],
    template: `
        <article  @mouseover="showBtn=true"  @mouseleave="showBtn=false">
        <RouterLink :class="getClass(email)" class="email-card" :to="'/apps/email/'+email.id">
            <span>From: {{ email.from }}</span>
            <span>{{ email.subject }}</span>
        </RouterLink>
            <button v-if="showBtn" class="btn-round btn-close" @click="remove(email.id)">x</button> 
           
            <!-- <h2>{{ email.body }}</h3> -->
        </article>
    `,
    data() {
        return {
            showBtn: false
        }
    },
    methods: {
        remove(emailId) {
            this.$emit('remove', emailId)
        },
    },
    methods: {
        getClass(email) {
            if (email.isRead) { return 'read' }
            else return 'unread'
        }
    }
}