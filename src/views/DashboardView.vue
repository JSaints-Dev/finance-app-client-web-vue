<template>
  <div class="flex flex-col lg:flex-row gap-4 p-4 min-h-screen w-full">
    <!-- Saldo Total e Contas Cadastradas -->
    <div
      class="flex-1 lg:w-1/2 bg-green-500 text-white p-4 rounded-lg flex flex-col justify-between"
    >
      <div class="flex flex-col">
        <h2 class="text-xl">Saldo Total</h2>
        <p class="text-3xl font-bold">
          {{ formatCurrency(bankAccountsStore.totalBalance) }}
        </p>
      </div>
      <div class="flex flex-col gap-3 max-w-full">
        <h3 class="text-lg font-semibold">Minhas Contas</h3>
        <div class="flex gap-4 overflow-x-auto max-w-full overflow-hidden">
          <div
            v-for="account in bankAccountsStore.bankAccounts"
            :key="account.id"
            class="bg-white text-black p-4 rounded-lg flex flex-col w-44 flex-shrink-0"
          >
            <p class="font-semibold">{{ account.name }}</p>
            <p class="text-xl font-bold">
              {{ formatCurrency(account.totalBalance) }}
            </p>
            <p class="text-sm">Saldo Atual</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de Transações -->
    <div
      class="flex-1 lg:w-1/2 bg-gray-100 p-4 rounded-lg flex flex-col w-full"
    >
      <h2 class="text-xl font-semibold">Transações</h2>
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
  </div>
</template>

<script setup lang="ts">
import { useDashboard } from '@/composable/useDashboard'

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
</script>
