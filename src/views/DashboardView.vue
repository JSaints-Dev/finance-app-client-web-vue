<template>
  <div class="flex flex-col lg:flex-row gap-4 p-4 min-h-screen w-full">
    <!-- Saldo Total e Contas Cadastradas -->
    <div
      class="flex-1 lg:w-1/2 bg-green-600 text-white p-4 rounded-lg flex flex-col justify-between"
    >
      <div class="flex flex-col">
        <h2 class="text-xl">Saldo Total</h2>
        <p class="text-3xl font-bold">
          {{ formatCurrency(bankAccountsStore.totalBalance) }}
        </p>
      </div>
      <div class="flex flex-col gap-3 max-w-full">
        <div class="flex items-center justify-between font-thin text-sm">
          <h3 class="text-lg font-semibold">Minhas Contas</h3>
          <template v-if="bankAccountsStore.bankAccounts.length > 0">
            <BaseButton
              buttonClass="bg-transparent text-black p-1"
              text="Adicionar"
              @click="showAddAccountPopup = true"
            />
          </template>
        </div>
        <div class="flex gap-4 overflow-x-auto max-w-full overflow-hidden">
          <template v-if="bankAccountsStore.bankAccounts.length > 0">
            <div
              v-for="account in bankAccountsStore.bankAccounts"
              :key="account.id"
              class="bg-white text-black p-4 rounded-lg flex flex-col w-44 flex-shrink-0 relative"
              @mouseover="showDeleteButton(account.id)"
              @mouseleave="hideDeleteButton(account.id)"
            >
              <div class="flex justify-between items-center">
                <p class="font-semibold">{{ account.name }}</p>
                <BaseButton
                  v-show="deleteButtonVisible[account.id]"
                  text="Excluir"
                  buttonClass="text-red-500 text-sm font-thin"
                  @click="deleteAccount(account.id)"
                />
              </div>
              <p class="text-xl font-bold">
                {{ formatCurrency(account.totalBalance) }}
              </p>
              <p class="text-sm">Saldo Atual</p>
            </div>
          </template>
          <template v-else>
            <div
              class="flex justify-center items-center w-full h-48 border-2 border-dotted border-white rounded-lg"
            >
              <BaseButton
                text="Cadastre uma nova conta"
                buttonClass="text-white hover:border hover:border-white p-2 rounded-lg"
                @click="showAddAccountPopup = true"
              />
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Lista de Transações -->
    <div
      class="flex-1 lg:w-1/2 bg-gray-100 p-4 rounded-lg flex flex-col w-full"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold">Transações</h2>
        <template v-if="bankAccountsStore.bankAccounts.length > 0">
          <BaseButton
            buttonClass="bg-transparent text-black p-1 text-sm font-thin"
            text="Adicionar"
            @click="showAddTransactionPopup = true"
          />
        </template>
      </div>
      <div class="flex items-center gap-2 my-4 w-full justify-between">
        <button @click="prevMonths" class="text-gray-500">&lt;</button>
        <div class="flex gap-2">
          <button
            v-for="month in displayedMonths"
            :key="month"
            :class="[
              'px-4 py-2 rounded',
              { 'bg-white': selectedMonth === month },
            ]"
            @click="selectMonth(month)"
          >
            {{ monthNames[month] }}
          </button>
        </div>
        <button @click="nextMonths" class="text-gray-500">&gt;</button>
      </div>
      <div class="flex flex-col gap-4 flex-1 overflow-y-auto">
        <div
          v-for="transaction in transactionsStore.transactions"
          :key="transaction.id"
          class="bg-white p-4 rounded-lg flex justify-between items-center"
        >
          <div>
            <p class="font-semibold">{{ transaction.name }}</p>
            <p class="text-sm text-gray-500">
              {{ formatDate(transaction.date) }}
            </p>
          </div>
          <p
            :class="
              transaction.type === 'INCOME' ? 'text-green-500' : 'text-red-500'
            "
          >
            {{ transaction.type === 'INCOME' ? '+' : '-'
            }}{{ formatCurrency(transaction.amount) }}
          </p>
        </div>
      </div>
    </div>
    <AddAccountPopup
      v-if="showAddAccountPopup"
      @close="showAddAccountPopup = false"
      @add="handleAddAccount"
    />
    <AddTransactionPopup
      v-if="showAddTransactionPopup"
      @close="showAddTransactionPopup = false"
      @add="handleAddTransaction"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDashboard } from '@/composable/useDashboard'
import BaseButton from '@/components/BaseButton.vue'
import AddAccountPopup from '@/components/AddAccountPopup.vue'
import AddTransactionPopup from '@/components/AddTransactionPopup.vue'
import api from '@/plugins/axios'

const {
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
} = useDashboard()

const showAddAccountPopup = ref(false)
const showAddTransactionPopup = ref(false)
const deleteButtonVisible = ref<{ [key: string]: boolean }>({})

interface CreatedAccount {
  id: string
  name: string
  initialBalance: number
  color: string
  type: 'CHECKING' | 'INVESTMENT' | 'CASH'
}

const handleAddAccount = (createdAccount: CreatedAccount) => {
  bankAccountsStore.bankAccounts.push({
    id: createdAccount.id,
    name: createdAccount.name,
    totalBalance: createdAccount.initialBalance,
  })
  bankAccountsStore.totalBalance += createdAccount.initialBalance
}

const handleAddTransaction = () => {
  transactionsStore.fetchTransactions(
    selectedMonth.value,
    new Date().getFullYear(),
  )
}

const showDeleteButton = (accountId: string) => {
  deleteButtonVisible.value[accountId] = true
}

const hideDeleteButton = (accountId: string) => {
  deleteButtonVisible.value[accountId] = false
}

const deleteAccount = async (accountId: string) => {
  try {
    await api.delete(`/bank-accounts/${accountId}`)
    bankAccountsStore.bankAccounts = bankAccountsStore.bankAccounts.filter(
      account => account.id !== accountId,
    )
    bankAccountsStore.totalBalance = bankAccountsStore.bankAccounts.reduce(
      (sum, account) => sum + account.totalBalance,
      0,
    )
  } catch (error) {
    console.error('Failed to delete account', error)
  }
}
</script>
