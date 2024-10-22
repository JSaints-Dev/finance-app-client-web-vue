import { ref, onMounted } from 'vue'
import { useBankAccountsStore } from '@/stores/bankAccounts'
import { useTransactionsStore } from '@/stores/transactions'

export function useDashboard() {
  const bankAccountsStore = useBankAccountsStore()
  const transactionsStore = useTransactionsStore()

  const selectedMonth = ref(new Date().getMonth())
  const displayedMonths = ref([
    selectedMonth.value - 1,
    selectedMonth.value,
    selectedMonth.value + 1,
  ])

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  const selectMonth = (month: number) => {
    selectedMonth.value = month
    transactionsStore.fetchTransactions(month, new Date().getFullYear())
  }

  const prevMonths = () => {
    displayedMonths.value = displayedMonths.value.map(month => month - 3)
  }

  const nextMonths = () => {
    displayedMonths.value = displayedMonths.value.map(month => month + 3)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (value: string) => {
    return new Date(value).toLocaleDateString('pt-BR')
  }

  onMounted(() => {
    bankAccountsStore.fetchBankAccounts()
    transactionsStore.fetchTransactions(
      selectedMonth.value,
      new Date().getFullYear(),
    )
  })

  return {
    bankAccountsStore,
    transactionsStore,
    selectedMonth,
    displayedMonths,
    monthNames,
    selectMonth,
    prevMonths,
    nextMonths,
    formatCurrency,
    formatDate,
  }
}
