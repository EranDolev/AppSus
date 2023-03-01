import { EmailService } from '../../../services/Email.services.js'
import EmailList from '../cmps/EmailList.js'

export default {
    template: `
    <h1>hello world</h1>
    <section class="email-index">
    <EmailList :emails = "emails"/>
    <pre> {{ user }} </pre>
    </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: {},
            user: {},
        }
    },
    created() {
        EmailService.query()
            .then(emails => {
                this.emails = emails
            })
        this.user = EmailService.createUser()
        console.log('EmailService.createUser(): ', EmailService.createUser());
    },
    components: {
        EmailList,
    }


}

