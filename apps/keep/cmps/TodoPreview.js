export default {
    props: ['todo'],
    template: `
    <article>
        <h3 @click="crossLine(todo)" class="todo" :class="cross(todo)">{{ todo.txt }}</h3>
    </article>
    `,
    methods: {
        crossLine(todo) {
            if (!todo.doneAt) {
                todo.doneAt = Date.now()
            } else { todo.doneAt = null}
        },
        cross(note) {
            if (note.doneAt) { return 'cross' }
            else return 'not-cross'
        },
    }
}