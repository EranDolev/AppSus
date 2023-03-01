export default {
    props: ['email'],
    template: `
        <article class="email-card">
            <span>From: {{ email.from }}</span>
            <span>{{ email.subject }}</span>
            <button class="btn-round btn-close" @click="remove(email.id)">x</button> 
            <!-- <h2>{{ email.body }}</h3> -->
        </article>
    `
}