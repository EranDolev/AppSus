import { EmailService } from "../../../services/Email.services.js";
export default {

    template: `
    <section class="email-details" v-if="email"> 
        <h2> {{email.subject }}</h2>
        <h3>{{ email.body }}</h3>
    </section>
    `,
    data() {
        return {
            email: null,
            emailId: '',
        }
    },
    created() {
        console.log('params:', this.$route.params.emailId);
        // console.log('email:', email, 'email id:', emailId);
        this.emailId = this.$route.params.emailId
        this.loadEmail()
    },
    methods: {
        loadEmail() {
            EmailService.get(this.emailId)
                .then(email => this.email = email)
        },
    }
}