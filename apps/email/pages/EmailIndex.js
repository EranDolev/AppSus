import { EmailService } from '../../../services/Email.services.js'
import  EmailList  from '../cmps/EmailList.js'

export default {
    template: `
    <h1>hello world</h1>
    <section class="email-index">
        <EmailList :emails = "emails"/>
    </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: {},
        }
    },
    created() {
        EmailService.query()
            .then(emails => {
                this.emails = emails
            })
    },
    components: {
        EmailList,
    }


}

