<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
      <h2 class="text-2xl font-bold text-center">Login</h2>
      <form @submit.prevent="login" class="flex flex-col gap-5">
        <BaseInput
          v-model="email"
          id="email"
          label="Email"
          type="email"
          :disabled="isLoading"
          required
        />
        <BaseInput
          v-model="password"
          id="password"
          label="Senha"
          type="password"
          :disabled="isLoading"
          required
        />
        <BaseButton
          text="Entrar"
          :isLoading="isLoading"
          :disabled="isLoading"
          @click="login"
        />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

// const BASE_URL = 'https://finance-api-bgor.onrender.com'
const BASE_URL = 'http://localhost:4000'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const authStore = useAuthStore()
const router = useRouter()

const login = async () => {
  isLoading.value = true
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: email.value,
      password: password.value,
    })
    authStore.setAccessToken(response.data.accessToken)
    router.push({ name: 'dashboard' })
  } catch (error) {
    console.error('Login failed', error)
  } finally {
    isLoading.value = false
  }
}
</script>
