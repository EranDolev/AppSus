import { EmailService } from "../../../services/Email.services.js";
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: ['email'],
    template: `
        <section class="email-compose">
            <h2>New Message</h2>
            <form class="form-compose" @submit.prevent="save">
                <!-- <input 
                type="text"
                placeholder="your-email"> -->
            
                <label class="send to">
                    to:
                    <input v-model="email.to"
                    type="text"
                    placeholder="some@email.com">
                </label>
             
                <label class="subject">
                    subject:
                    <input v-model="email.subject"
                    type="text">
                </label>
                
                <label class="body">
                    body:
                    <input v-model="email.body"
                    type="text">
                </label>
                <button class="btn-send">Send</button>
                <!-- <RouterLink to="/apps/email"></RouterLink> -->
               
            </form>
        </section>
    `,
    data() {
        return {
            email: {
                id: null,
                subject: '',
                body: '',
                to: '',
            },
            // ,
            // 

            // email: null
        }
    },
    created() {
        const { emailId } = this.$route.params
        EmailService.get(emailId)
            .then(email => this.email = email)
    },
    save() {
        console.log('email:', this.email);
        EmailService.save(this.email)
            .then(savedEmail => {
                eventBus.emit('show-msg', { txt: 'Email saved', type: 'success' })
                this.email = savedEmail
                console.log('savedEmail', savedEmail);
                // this.$router.push('/email')
                // this.email.unshift(newBook)

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