import { EmailService } from "../../../services/Email.services.js";
export default {

    template: `
    <section class="email-details" v-if="email"> 
        <h3> {{email.subject }}</h3>
        <h4>From: {{ email.from }}</h4>
        <h2>{{ email.body }}</h2>
        <RouterLink :to="'/apps/email'"><button class="btn-backmail"><i class="fa-solid fa-circle-arrow-left"></i> </button></RouterLink>
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
            .then(() => {
                console.log(this.email)
                this.email.isRead = true
                console.log(this.email)
            })
            .then(() => {
                EmailService.save(this.email)
            })
        
        
    },
    methods: {
        loadEmail() {
            return EmailService.get(this.emailId)
                .then((email) => {
                    this.email = email
                    console.log(this.email)
                    return this.email
                })
        },
    }
}