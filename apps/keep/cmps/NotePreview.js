import TodoPreview from './TodoPreview.js'

export default {
    props: ['note'],
    template: `
        <article @mouseover="showBtn=true"  @mouseleave="showBtn=false" class="note-card" :style="{ 'background-color': note.style.backgroundColor }">
        <article>
            <button v-if="showBtn" class="btn-edit">bgc</button>
            <button v-if="showBtn" class="btn-edit">bgc</button>
        </article>
        <br>
            <article class="note-txt" v-if="note.type === 'NoteTxt'">
                <h3>{{ note.info.txt }}</h3>
            </article>
            <article class="note-img" v-if="note.type === 'NoteImg'">
                <h3>{{ note.info.title }}</h3>
                <img :src="note.info.url" alt="url">
            </article>
            <article class="note-todos" v-if="note.type === 'NoteTodos'">
                <h3>{{ note.info.title }}</h3>
                <ul>
                    <li :style="{ 'background-color': note.style.backgroundColor }" v-for="todo in note.info.todos" :key="note.info.todo"> 
                        <TodoPreview :todo="todo"/>
                    </li>
                </ul>
            </article>
        </article>
    `,
    data() {
        return {
            showBtn: false
        }
    },
    components: {
            TodoPreview,
        }
}