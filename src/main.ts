import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Theme from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import { initializeAxios } from '@/plugins/axios'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
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

initializeAxios(pinia, router)

app.config.globalProperties.$filters = {
  currency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  },
  formatDate(value: string) {
    return new Date(value).toLocaleDateString('pt-BR')
  },
}

app.mount('#app')
