const { createApp } = Vue

import { router } from './routes.js'

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'
import UserMsg from './cmps/UserMsg.js'
import HomeApps from './cmps/HomeApps.js'

const options = {
    template: `
        <section>
            <AppHeader />
            <RouterView />
            <!-- <HomeApps/> -->
            <UserMsg />
            <AppFooter />
        </section>
    `,
    components: {
        AppHeader,
        AppFooter,
        UserMsg,
        HomeApps,
    },
}

const app = createApp(options)
app.use(router)
app.mount('#app')
