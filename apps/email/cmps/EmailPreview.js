export default {
    props: ['email'],
    template: `
        <article>
            <h2>{{ email.subject }}</h2>
            <h3>{{ email.body }}</h3>
        </article>
    `
}