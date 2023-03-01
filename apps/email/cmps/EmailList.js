import EmailPreview from "../cmps/EmailPreview.js"

export default {
    props: ['emails'],
    template: `
    <section class="email-list">
        <ul>
            <li v-for="email in emails" :key="email.id"> <EmailPreview :email = "email"/> </li>
        </ul>
    </section>
    `,

    components: {
        EmailPreview,
    }
}