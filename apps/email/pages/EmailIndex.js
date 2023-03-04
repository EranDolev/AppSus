import { EmailService } from '../../../services/Email.services.js'
import EmailList from '../cmps/EmailList.js'
import EmailFilter from '../cmps/EmailFilter.js'
import EmailFolderList from '../cmps/EmailFolderList.js'
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
    <!-- <h1 class="page-greet">hello world</h1> -->
    <section> {{ this.count }} </section>
    <section class="email-index">
        <EmailFolderList/>

        <EmailFilter @filter="setFilterBy"/>
            <EmailList
                :emails="filteredEmails"
                @remove="removeEmail"
                @setRead="setRead" />
                 
    <!-- <EmailList :emails = "emails" @remove="removeEmail"/> -->
    <!-- <pre> {{ user }} </pre> -->
    </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: {},
            user: {},
            count: 0,
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

        setRead(email) {
            email.isRead = !email.isRead
        },

        setFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
    computed: {
        filteredEmails() {
            this.count = 0
            this.emails.forEach((email) => {
                if (!email.isRead) {
                    console.log(this.count)
                    this.count ++
                }
            })

            const regex = new RegExp((this.filterBy.txt), 'i')
            return this.emails.filter(email => regex.test(email.subject) || regex.test(email.from))

        },
    },
    components: {
        EmailList,
        EmailFilter,
        EmailFolderList,
    },


}

