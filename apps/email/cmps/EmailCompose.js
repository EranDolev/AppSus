import { EmailService } from "../../../services/Email.services.js";
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['email'],
    template: `
        <section class="email-compose">
            <h2>New Message</h2>
            <form class="form-compose" @submit.prevent="save">
                <input 
                type="text"
                placeholder="your-email">
            
                <label class="send to">
                    to:
                    <input v-model="this.email"
                    type="text"
                    placeholder="some@email.com">
                </label>
             
                <label class="subject">
                    subject:
                    <input v-model="this.subject"
                    type="text">
                </label>
                
                <label class="body">
                    body:
                    <input v-model="this.body"
                    type="text">
                </label>
                <RouterLink to="/apps/email"> <button class="btn-send">Send</button></RouterLink>
               
            </form>
        </section>
    `,
    data() {
        return {
            email: '',
            subject: '',
            body: '',

            email: null
        }
    },
    created() {
        const { emailId } = this.$route.params
        EmailService.get(emailId)
            .then(email => this.email = email)
    },
    save() {
        EmailService.save(this.email)
            .then(savedEmail => {
                eventBus.emit('show-msg', { txt: 'Email saved', type: 'success' })
                this.$router.push('/email')

            })
            .catch(err => {
                eventBus.emit('show-msg', { txt: 'Email send failed', type: 'error' })
            })
    },
    components: {
        EmailService,
        eventBus,
    }
}