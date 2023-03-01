export default {
    props: ['email'],
    template: `
        <article class="email-card">
            <span>From: {{ email.from }}</span>
            <span>{{ email.subject }}</span>
           
            <!-- <h2>{{ email.body }}</h3> -->
        </article>
    `
}