

export default {
    template: `
        <div class="sec-folder-list">
            <nav class="nav-folder-list">
                <ul class="folder-list-card">
                    <RouterLink :to="'/apps/email/email-compose/'"><button class="btn-compose"><i class="fa-solid fa-pencil"></i> </button></RouterLink>
                    <RouterLink :to="'/apps/email/email-compose/'"><button class="btn-compose"><i class="fa-solid fa-pencil"></i> </button></RouterLink>
                    <RouterLink :to="'/apps/email/email-compose/'"><button class="btn-compose"><i class="fa-solid fa-pencil"></i> </button></RouterLink>
                    <RouterLink :to="'/apps/email/email-compose/'"><button class="btn-compose"><i class="fa-solid fa-pencil"></i> </button></RouterLink>
                </ul>
            </nav>
        </div>
    `,
}