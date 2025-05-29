import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import './assets/main.css'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: Aura
        },
        ripple: true
    })
    .use(pinia)
    .mount('#app')
