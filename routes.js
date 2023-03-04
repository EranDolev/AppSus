import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'

import Email from './apps/email/pages/EmailIndex.js'
import EmailDetails from './apps/email/pages/EmailDetails.js'
import EmailFolderList from './apps/email/cmps/EmailFolderList.js'
import EmailCompose from './apps/email/cmps/EmailCompose.js'

import Note from './apps/keep/pages/NoteIndex.js'
import NoteDetails from './apps/keep/pages/NoteDetails.js'
import AddNote from './apps/keep/cmps/AddNote.js'

import MissBook from './apps/missBook/pages/BookIndex.js'
import MissBookDetails from './apps/missBook/pages/BookDetails.js'
import MissBookEdit from './apps/missBook/pages/BookEdit.js'
// import Keep from './apps/keep/pages/NoteIndex.js'
// import AboutUs from './apps/missbook/pages/BookIndex.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/about',
			component: AboutUs,
		},
		{
			path: '/apps/email',
			component: Email,
		},
		{
			path: '/apps/email/:emailId',
			component: EmailDetails,
		},
		{
			path: '/apps/keep',
			component: Note,
		},
		{
			path: '/apps/keep/:noteId',
			component: NoteDetails,
		},
		{
			path: '/apps/keep/note-add',
			component: AddNote,
		},
		{
			path: '/apps/email/email-compose/',
			component: EmailCompose,
		},
		{
			path: '/apps/email/email-folder-list/',
			component: EmailFolderList,
		},
		// {
		// 	path: '/apps/keep/note-add/',
		// 	component: AddNote,
		// },
		{
			path: '/apps/MissBook',
			component: MissBook,
		},
		{
            path: '/apps/missBook/:bookId',
            component: MissBookDetails,
        },
		{
            path: '/app/missBook/edit/:bookId?',
            component: MissBookEdit,
        },
	]
}


export const router = createRouter(routerOptions)
