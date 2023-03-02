import { EmailService } from '../../../services/Email.services.js'
import EmailList from '../cmps/EmailList.js'
import EmailFilter from '../cmps/EmailFilter.js'
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
    <h1 class="page-greet">hello world</h1>
    <section class="email-index">
        <EmailFilter @filter="setFilterBy"/>
            <EmailList
                :emails="filteredEmails"
                @remove="removeEmail" />
                 
    <!-- <EmailList :emails = "emails" @remove="removeEmail"/> -->
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
        // console.log('EmailService.createUser(): ', EmailService.createUser());
    },
    methods: {
        removeEmail(emailId) {
            EmailService.remove(emailId)
                .then(() => {
                    const idx = this.emails.findIndex(email => email.id === emailId)
                    this.emails.splice(idx, 1)
                    eventBus.emit('show-msg', { txt: 'email removed', type: 'success' })
                })
                .catch(err => {
                    eventBus.emit('show-msg', { txt: 'email remove failed', type: 'error' })
                })
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        filteredEmails() {
            const regex = new RegExp(this.filterBy.from, 'i')
            return this.emails.filter(email => regex.test(email.from))
        },
    },
    components: {
        EmailList,
        EmailFilter,
    }


}

