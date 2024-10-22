import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export interface BankAccount {
  id: string
  name: string
  totalBalance: number
}

export const useBankAccountsStore = defineStore('bankAccounts', {
  state: () => ({
    bankAccounts: [] as BankAccount[],
    totalBalance: 0,
  }),
  actions: {
    async fetchBankAccounts() {
      try {
        const response = await api.get('/bank-accounts')
        this.bankAccounts = response.data
        this.totalBalance = this.bankAccounts.reduce(
          (sum, account) => sum + account.totalBalance,
          0,
        )
      } catch (error) {
        console.error('Failed to fetch bank accounts', error)
      }
    },
  },
})
