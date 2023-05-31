import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
    build: {
        transpile: ['primevue']
    },
    css: [
        'primevue/resources/themes/saga-blue/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css'
    ]
})