export default {
    template: `
        <header class="app-header">
            <span class="logo">Apsus</span>
            <nav class="nav-header flex space-between">
                <router-link to="/">Home</router-link>
                <router-link to="/about">About</router-link>
                <router-link to="/apps/email">Email</router-link>
                <router-link to="/apps/keep">Keep</router-link>
                <router-link to="/apps/MissBook">MissBook</router-link>
            </nav>
        </header>
    `,
}
