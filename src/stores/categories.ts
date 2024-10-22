import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export interface Category {
  id: string
  name: string
}

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [] as Category[],
  }),
  actions: {
    async fetchCategories() {
      try {
        const response = await api.get('/categories')
        this.categories = response.data
      } catch (error) {
        console.error('Failed to fetch categories', error)
      }
    },
  },
})
