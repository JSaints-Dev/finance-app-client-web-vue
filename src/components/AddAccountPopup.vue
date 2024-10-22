<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col gap-3">
      <h2 class="text-xl font-semibold mb-4">Adicionar Nova Conta</h2>
      <BaseInput
        v-model="color"
        id="color"
        label="Cor Hexadecimal"
        type="color"
      />
      <BaseInput
        v-model="initialBalanceString"
        id="initialBalance"
        label="Valor Inicial"
        type="number"
      />
      <BaseInput v-model="name" id="name" label="Nome do banco" type="text" />
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
          @click="addAccount"
          buttonClass="bg-green-700 hover:bg-green-900 text-white px-3 py-2 rounded-md"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import api from '@/plugins/axios'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'

const emits = defineEmits(['close', 'add'])

const color = ref('#000000')
const initialBalance = ref(0)
const name = ref('')
const type = ref('CHECKING')
const isLoading = ref(false)

const initialBalanceString = computed({
  get: () => initialBalance.value.toString(),
  set: (value: string) => {
    initialBalance.value = parseFloat(value)
  },
})

const typeOptions = [
  { value: 'CHECKING', label: 'Conta Corrente' },
  { value: 'INVESTMENT', label: 'Investimento' },
  { value: 'CASH', label: 'Dinheiro' },
]

const closePopup = () => {
  emits('close')
}

const addAccount = async () => {
  if (isLoading.value) return
  isLoading.value = true

  const newAccount = {
    color: color.value,
    initialBalance: initialBalance.value,
    name: name.value,
    type: type.value,
  }

  try {
    const response = await api.post('/bank-accounts', newAccount)
    const createdAccount = response.data
    emits('add', createdAccount)
    closePopup()
  } catch (error) {
    console.error('Failed to add new account', error)
  } finally {
    isLoading.value = false
  }
}
</script>
