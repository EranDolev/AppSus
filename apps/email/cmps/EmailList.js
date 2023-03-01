import EmailPreview from "../cmps/EmailPreview.js"
import EmailCompose from "./EmailCompose.js"

export default {
    props: ['emails'],
    template: `
    <section class="email-list">
        <!-- <button class="btn-compose"> -->
        <!-- <EmailCompose :emailId="email.id" @EmailCompose="EmailCompose"/> -->
        <ul>
            <li v-for="email in emails" :key="email.id"> 
                
                <RouterLink :to="'/apps/email/'+email.id"><EmailPreview :email="email"/></RouterLink>
            </li>
        </ul>
        <RouterLink :to="'/apps/email/email-compose/'"><button class="btn-compose">Compose</button></RouterLink>
    </section>
    `,
    methods: {
        showDetails(emailId) {
            this.$emit('show-details', emailId)
        },
    },

    components: {
        EmailPreview,
        EmailCompose,
    }
}