import { EmailService } from "../../../services/Email.services.js";
export default {
    props: ['email'],
    template: `
     <!-- NEED TO DO THIS WITH MODAL SO THE CLOSE BTN WILLL WORK.. -->
        <article class="email"  @mouseover="showBtn=true"  @mouseleave="showBtn=false">
            <RouterLink :class="getClass(email)" class="email-card" :to="'/apps/email/'+email.id" @setRead="setRead">
                <span>From: {{ email.from }}</span>
                <span>{{ email.subject }}</span>
            </RouterLink>
            <button v-if="showBtn" class="btn-close-email" @click="remove(email.id)"><i class="fa-solid fa-trash-can"></i></button> 
            <button v-if="showBtn" class="btn-read-email" @click="setRead(email)"><i class="fa-solid fa-envelope"></i></button> 
          
            <!-- <h2>{{ email.body }}</h3> -->
        </article>
    `,
    data() {
        return {
            showBtn: false,
        }
    },
    methods: {
        remove(emailId) {
            console.log('hello')
            this.$emit('remove', emailId)
        },
        setRead(email) {
            console.log('hello set read')
            this.$emit('setRead', email)
            if(!this.email.isRead){
                this.$emit('setCount', 1)
            } else {
                this.$emit('setCount', -1)
            }
            EmailService.save(email)
        },
        getClass(email) {
            if (email.isRead) { return 'read' }
            else return 'unread'
        }
    },
}