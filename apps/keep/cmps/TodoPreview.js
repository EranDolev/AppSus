export default {
    props: ['todo'],
    template: `
    <article>
        <h3>{{ todo.txt }}</h3>
    </article>
    `
}