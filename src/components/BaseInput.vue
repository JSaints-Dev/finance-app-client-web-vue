<template>
  <div class="flex flex-col">
    <label :for="id" class="text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <input
      :id="id"
      :type="type"
      v-model="localValue"
      :class="inputClass"
      :disabled="disabled"
      :required="required"
      @input="updateValue"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  id: String,
  type: {
    type: String,
    default: 'text',
  },
  label: String,
  inputClass: {
    type: String,
    default:
      'w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300',
  },
  disabled: Boolean,
  required: Boolean,
})

const emits = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  newValue => {
    localValue.value = newValue
  },
)

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) {
    emits('update:modelValue', target.value)
  }
}
</script>
