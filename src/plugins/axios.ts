import axios from 'axios'
import type { Router } from 'vue-router'
import type { Pinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export function initializeAxios(pinia: Pinia, router: Router) {
  const authStore = useAuthStore(pinia)

  api.interceptors.request.use(config => {
    const token = authStore.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        authStore.clearAccessToken()
        router.push({ name: 'login' })
      }
      return Promise.reject(error)
    },
  )
}

export default api
