import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import Email from './apps/email/pages/EmailIndex.js'
import EmailDetails from './apps/email/pages/EmailDetails.js'

import Note from './apps/keep/pages/NoteIndex.js'
import NoteDetails from './apps/keep/pages/NoteDetails.js'
import AddNote from './apps/keep/cmps/AddNote.js'

import EmailCompose from './apps/email/cmps/EmailCompose.js'
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
		// {
		// 	path: '/apps/keep/note-add/',
		// 	component: AddNote,
		// },
		// {
		// 	path: '/app/missBook',
		// 	component: missBook,
		// },
	]
}


export const router = createRouter(routerOptions)
