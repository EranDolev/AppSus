import { NoteService } from "../../../services/note.service.js";
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template:`
        <h1>add note</h1>
        <form class="form-compose" @submit.prevent="saveNote">
            <!-- <textarea v-model="this.note.info.txt" for="text"></textarea> -->
            <input v-model="this.note.info.txt" id="text"  type="text">
        <button>save note</button>
        </form>
    `,
    data() {
        return {
            note: {
                id: null,
                createdAt: Date.now(),
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#00d' },
                info: {
                    txt: ''
                }
            }
        }
    },
    methods: {
        saveNote() {
            console.log('note:', this.note)
            NoteService.save(this.note)
                .then(savedNote => {
                    eventBus.emit('show-msg', { txt: 'Note saved', type: 'success' })
                    this.note = savedNote
                    this.$router.push('/apps/keep')
    
                })
                .catch(err => {
                    eventBus.emit('show-msg', { txt: 'Note save failed', type: 'error' })
                })
                console.log('note after:', this.note)
        }
    },
    
}