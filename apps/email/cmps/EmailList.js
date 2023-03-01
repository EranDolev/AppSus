import EmailPreview from "../cmps/EmailPreview.js"
import { EmailService } from '../../../services/Email.services.js'
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['emails'],
    template: `
    <section class="email-list">
        <!-- <button class="btn-compose"> -->
        <!-- <EmailCompose :emailId="email.id" @EmailCompose="EmailCompose"/> -->
        <ul>
            <li v-for="email in emails" :key="email.id"> 
             <button class="btn-round btn-close" @click="remove(email.id)">x</button> 
                <RouterLink :to="'/apps/email/'+email.id"><EmailPreview :email="email"/></RouterLink>
            </li>
        </ul>
        <!-- <RouterLink :to="/apps/email/email-compose"></RouterLink> -->
        <!-- <RouterLink :to="'/apps/email/email-compose/'" @save="onSaveEmail"><button class="btn-compose">Compose</button></RouterLink> -->
        <RouterLink :to="'/apps/email/email-compose/'"><button class="btn-compose"><i class="fa-solid fa-pencil"></i> Compose</button></RouterLink>
    </section>

    `,
    methods: {
        showDetails(emailId) {
            this.$emit('show-details', emailId)
        },
        remove(emailId) {
            this.$emit('remove', emailId)
        },
    },

    components: {
        EmailPreview,
    }
}