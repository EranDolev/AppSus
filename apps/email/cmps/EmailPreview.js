export default {
    props: ['email'],
    template: `
        <article>
            <h3>{{ email.subject }}</h2>
            <h4>From: {{ email.from }}</h3>
            <h2>{{ email.body }}</h3>
        </article>
    `
}