import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Theme from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Theme,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
    },
  },
})
app.use(router)

app.mount('#app')
