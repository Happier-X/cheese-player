import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import { createPinia } from 'pinia'
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
import 'virtual:uno.css'

const pinia = createPinia()
createApp(App).use(router).use(pinia).mount('#app')
