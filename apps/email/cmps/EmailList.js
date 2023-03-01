import EmailPreview from "../cmps/EmailPreview.js"

export default {
    props: ['emails'],
    template: `
    <section class="email-list">
        <ul>
            <li v-for="email in emails" :key="email.id"> 
                
                <RouterLink :to="'/apps/email/'+email.id"><EmailPreview :email="email"/></RouterLink>
            </li>
        </ul>
    </section>
    `,
    methods: {
        showDetails(emailId) {
            this.$emit('show-details', emailId)
        },
    },

    components: {
        EmailPreview,
    }
}