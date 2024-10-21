import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') as string | null,
  }),
  actions: {
    setAccessToken(token: string) {
      this.accessToken = token
      localStorage.setItem('accessToken', token)
    },
    clearAccessToken() {
      this.accessToken = null
      localStorage.removeItem('accessToken')
    },
  },
  getters: {
    isAuthenticated: state => !!state.accessToken,
  },
})
