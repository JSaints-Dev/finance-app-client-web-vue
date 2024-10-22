import { defineStore } from 'pinia'
import api from '@/plugins/axios'

interface Transaction {
  id: string
  name: string
  date: string
  amount: number
  type: 'INCOME' | 'OUTCOME'
}

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    transactions: [] as Transaction[],
  }),
  actions: {
    async fetchTransactions(month: number, year: number) {
      try {
        const response = await api.get(
          `/transactions?month=${month}&year=${year}`,
        )
        this.transactions = response.data
      } catch (error) {
        console.error('Failed to fetch transactions', error)
      }
    },
  },
})
