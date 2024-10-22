import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalizedGeneric,
  type RouteLocationNormalizedLoadedGeneric,
} from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginView from '@/views/LoginView.vue'
import PrivateLayout from '@/layouts/PrivateLayout.vue'

function requireAuth(
  to: RouteLocationNormalizedGeneric,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    next()
  } else {
    next({ name: 'login' })
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: () => {
        const authStore = useAuthStore()
        if (authStore.isAuthenticated) {
          return {
            name: 'auth/dashboard',
          }
        } else {
          return {
            name: 'login',
          }
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        if (authStore.isAuthenticated) {
          next({ path: 'auth/dashboard' })
        } else {
          next()
        }
      },
    },
    {
      path: '/auth',
      component: PrivateLayout,
      beforeEnter: requireAuth,
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
        {
          path: 'profile',
          component: () => import('../views/ProfileView.vue'),
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
