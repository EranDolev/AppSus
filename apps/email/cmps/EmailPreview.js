export default {
    props: ['email'],
    template: `
        <article class="email-card" :class="getClass(email)">
            <span>From: {{ email.from }}</span>
            <span>{{ email.subject }}</span>
           
            <!-- <h2>{{ email.body }}</h3> -->
        </article>
    `,
    methods: {
        getClass(email) {
            if (email.isRead) { return 'read' }
            else return 'unread'
        }
    }
}