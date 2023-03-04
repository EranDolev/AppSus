import { EmailService } from '../../../services/Email.services.js'
import EmailList from '../cmps/EmailList.js'
import EmailFilter from '../cmps/EmailFilter.js'
import EmailFolderList from '../cmps/EmailFolderList.js'
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
    <!-- <h1 class="page-greet">hello world</h1> -->
    <section class="email-index">
        <section> {{ this.count }} </section>
        <EmailFolderList @filter="setFilterInbox"/>

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
            filterBy: {
                txt: '',
                sendSent: '',
                isSend: false
            },
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
            this.filterBy.txt = filterBy.txt
        },
        setFilterInbox(filterBy,) {
            if (this.filterBy.sendSent === 'inbox') this.isSend = true
            if (this.filterBy.sendSent === 'sent') this.isSend = false
            this.filterBy.sendSent = filterBy.sendSent
        },
    },
    computed: {
        filteredEmails() {
            this.count = 0
            this.emails.forEach((email) => {
                if (!email.isRead) {
                    console.log(this.count)
                    this.count++
                }
            })
            if (this.isSend) {
                var regexInbox = new RegExp('user@appsus.com')
            } 
            else {var  regexInbox = new RegExp('') }
                const regex = new RegExp((this.filterBy.txt), 'i')

            if (this.isSend) {
                return this.emails.filter(email => regexInbox.test(email.from))
            }else  return this.emails.filter(email => regex.test(email.subject) || regex.test(email.from))

        },
    },
    components: {
        EmailList,
        EmailFilter,
        EmailFolderList,
    },


}

