import EmailPreview from "../cmps/EmailPreview.js"
import { EmailService } from '../../../services/Email.services.js'
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['emails'],
    template: `
    <section class="email-list ">
        <span>Unread Emails: {{ this.unreadCount }}</span>
        <ul>
            <li class="clean-list" v-for="email in emails" :key="email.id"> 
                    <EmailPreview :email="email" @remove="remove" @setRead="setRead" @setCount="updateCount"/>
            </li>
        </ul>
       
    </section>

    `,
    data () {
        return {
            unreadCount: 0
        }
    },
    methods: {
        showDetails(emailId) {
            this.$emit('show-details', emailId)
        },
        remove(emailId) {
            this.$emit('remove', emailId)
        },
        setRead(email) {
            this.$emit('setRead', email)
        },
        updateCount(count){
            this.unreadCount += count
            console.log(this.unreadCount)
        }
        
    },

    components: {
        EmailPreview,
    }
}