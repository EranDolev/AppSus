import { EmailService } from "../../../services/Email.services.js";
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    // props: ['email'],
    template: `
        <section class="email-compose">
            <h2>New Message</h2>
            <form class="form-compose-email" @submit.prevent="save">
                <!-- <input 
                type="text"
                placeholder="your-email"> -->
            
                <label for="to" class="send to">
                    to:
                </label>
                    <input id="to" name="to" v-model="this.email.to"
                    type="email"
                    placeholder="some@email.com">
             
                <label for="subject" class="subject">
                    subject:
                </label>
                    <input id="subject" name="subject" v-model="this.email.subject"
                    type="text">
                
                <label for="body" class="body">
                    body:
                </label>
                    <input id="body" name="body" v-model="this.email.body"
                    type="text">
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
                    from: 'user@appsus.com'
                }
            }
        },
        methods: {
            save() {
                console.log('email:', this.email);
                EmailService.save(this.email)
                    .then(savedEmail => {
                        eventBus.emit('show-msg', { txt: 'Email saved', type: 'success' })
                        this.email = savedEmail
                        console.log('savedEmail', savedEmail);
                        this.$router.push('/apps/email')
                        // this.email.unshift(newBook)
        
                    })
                    .catch(err => {
                        eventBus.emit('show-msg', { txt: 'Email send failed', type: 'error' })
                    })
                    // this.$router.push('/apps/email')
          }
        },
    created() {
        const { emailId } = this.$route.params
        EmailService.get(emailId)
            .then(email => this.email = email)
    },
    components: {
        EmailService,
        eventBus,
    }
}


