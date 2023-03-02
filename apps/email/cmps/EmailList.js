import EmailPreview from "../cmps/EmailPreview.js"
import { EmailService } from '../../../services/Email.services.js'
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['emails'],
    template: `
    <section class="email-list ">
        <ul>
            <li class="clean-list"  v-for="email in emails" :key="email.id"> 
             <button class="btn-round btn-close" @click="remove(email.id)">x</button> 
                <RouterLink :to="'/apps/email/'+email.id"><EmailPreview :email="email"/></RouterLink>
            </li>
        </ul>
       
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