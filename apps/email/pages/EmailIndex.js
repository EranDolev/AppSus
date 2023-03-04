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
                sendSent: ''
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
        setFilterInbox(filterBy) {
            EmailService.query()
            .then(emails => {
                this.emails = emails
            })
            this.filterBy.sendSent = filterBy.sendSent
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

            const sender = 'user@appsus.com'
            if (this.filterBy.sendSent === 'sent'){
                console.log( this.filterBy.sendSent)
                console.log( this.emails)
                this.emails = this.emails.filter(email => email.from === sender)
                console.log( this.emails)
            } else {
                console.log( this.emails)
                this.emails = this.emails.filter(email => email.from !== sender) 
                console.log( this.emails)
            }

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

