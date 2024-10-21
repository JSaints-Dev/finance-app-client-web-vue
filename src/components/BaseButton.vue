<template>
  <button
    :type="type"
    :class="buttonClass"
    :disabled="isLoading || disabled"
    @click="handleClick"
  >
    <span>{{ text }}</span>
    <span v-if="isLoading" class="spinner mr-2"></span>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { ButtonHTMLAttributes } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String as () => ButtonHTMLAttributes['type'],
    default: 'button',
  },
  buttonClass: {
    type: String,
    default:
      'w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 flex items-center justify-center gap-2',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['click'])

const handleClick = (event: Event) => {
  if (!props.isLoading) {
    emits('click', event)
  }
}
</script>

<style scoped>
.spinner {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
