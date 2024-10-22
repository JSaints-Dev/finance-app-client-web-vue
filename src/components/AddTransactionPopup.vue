<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col gap-3">
      <h2 class="text-xl font-semibold mb-4">Adicionar Nova Transação</h2>
      <BaseSelect
        v-model="categoryId"
        id="categoryId"
        label="Categoria"
        :options="categoryOptions"
      />
      <BaseSelect
        v-model="bankAccountId"
        id="bankAccountId"
        label="Conta Bancária"
        :options="bankAccountOptions"
      />
      <BaseInput
        v-model="amountString"
        id="amount"
        label="Valor"
        type="number"
      />
      <BaseInput
        v-model="name"
        id="name"
        label="Nome da Transação"
        type="text"
      />
      <BaseInput
        v-model="date"
        id="date"
        label="Data e Hora"
        type="datetime-local"
      />
      <BaseSelect
        v-model="type"
        id="type"
        label="Tipo"
        :options="typeOptions"
      />
      <div class="flex justify-end mt-4 gap-2">
        <BaseButton
          text="Cancelar"
          @click="closePopup"
          buttonClass="bg-gray-500 hover:bg-gray-700 text-white px-3 py-2 rounded-md"
        />
        <BaseButton
          text="Adicionar"
          :disabled="isLoading"
          @click="addTransaction"
          buttonClass="bg-green-700 hover:bg-green-900 text-white px-3 py-2 rounded-md"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBankAccountsStore } from '@/stores/bankAccounts'
import { useCategoriesStore } from '@/stores/categories'
import api from '@/plugins/axios'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'

const emits = defineEmits(['close', 'add'])

const categoryId = ref('')
const bankAccountId = ref('')
const amount = ref(0)
const name = ref('')
const date = ref('')
const type = ref('INCOME')
const isLoading = ref(false)

const amountString = computed({
  get: () => amount.value.toString(),
  set: (value: string) => {
    amount.value = parseFloat(value)
  },
})

const typeOptions = [
  { value: 'INCOME', label: 'Receita' },
  { value: 'OUTCOME', label: 'Despesa' },
]

const bankAccountsStore = useBankAccountsStore()
const categoriesStore = useCategoriesStore()

const categoryOptions = computed(() =>
  categoriesStore.categories.map(category => ({
    value: category.id,
    label: category.name,
  })),
)

const bankAccountOptions = computed(() =>
  bankAccountsStore.bankAccounts.map(account => ({
    value: account.id,
    label: account.name,
  })),
)

const closePopup = () => {
  emits('close')
}

const addTransaction = async () => {
  if (isLoading.value) return
  isLoading.value = true

  const newTransaction = {
    categoryId: categoryId.value,
    bankAccountId: bankAccountId.value,
    amount: amount.value,
    name: name.value,
    date: new Date(date.value).toISOString(),
    type: type.value,
  }

  try {
    const response = await api.post('/transactions', newTransaction)
    const createdTransaction = response.data
    emits('add', createdTransaction)
    closePopup()
  } catch (error) {
    console.error('Failed to add new transaction', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await categoriesStore.fetchCategories()
})
</script>
