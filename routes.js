import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import Email from './apps/email/pages/EmailIndex.js'
import EmailDetails from './apps/email/pages/EmailDetails.js'
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
		// {
		// 	path: '/app/keep',
		// 	component: Keep,
		// },
		// {
		// 	path: '/app/missBook',
		// 	component: missBook,
		// },
	],
}

export const router = createRouter(routerOptions)
