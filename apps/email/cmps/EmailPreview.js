export default {
    props: ['email'],
    template: `
<<<<<<< HEAD
        <article  @mouseover="showBtn=true"  @mouseleave="showBtn=false">
        <RouterLink class="email-card" :to="'/apps/email/'+email.id">
=======
        <article class="email-card" :class="getClass(email)">
>>>>>>> 5651eb7d8cbc16d8242dcf6906950d25296de330
            <span>From: {{ email.from }}</span>
            <span>{{ email.subject }}</span>
        </RouterLink>
            <button v-if="showBtn" class="btn-round btn-close" @click="remove(email.id)">x</button> 
           
            <!-- <h2>{{ email.body }}</h3> -->
        </article>
    `,
<<<<<<< HEAD
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
=======
    methods: {
        getClass(email) {
            if (email.isRead) { return 'read' }
            else return 'unread'
        }
    }
>>>>>>> 5651eb7d8cbc16d8242dcf6906950d25296de330
}