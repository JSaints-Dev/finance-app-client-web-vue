<template>
  <div class="flex flex-col">
    <label :for="id" class="text-sm font-medium text-gray-700">{{
      label
    }}</label>
    <select
      :id="id"
      v-model="localValue"
      :class="inputClass"
      :disabled="disabled"
      :required="required"
      @change="updateValue"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  id: String,
  label: String,
  options: {
    type: Array as () => { value: string; label: string }[],
    required: true,
  },
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
  const target = event.target as HTMLSelectElement
  if (target) {
    emits('update:modelValue', target.value)
  }
}
</script>
