<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.clearAccessToken()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="flex min-h-screen">
    <aside
      class="w-64 bg-gray-800 text-white flex flex-col justify-between px-3 py-4"
    >
      <nav>
        <ul>
          <li>
            <RouterLink to="/dashboard" class="block px-4 py-2"
              >Dashboard</RouterLink
            >
          </li>
        </ul>
      </nav>
      <button
        @click="logout"
        class="px-1 py-1 text-white font-semibold hover:border hover:border-white hover:rounded"
      >
        Sair
      </button>
    </aside>
    <main class="flex-1 p-4">
      <RouterView />
    </main>
  </div>
</template>
