<template>
  <div class="flex items-center justify-between rounded-md border border-gray-200 p-4 dark:border-gray-700">
    <div class="space-y-0.5">
      <div class="flex items-center gap-2">
        <h3 class="text-base font-medium text-gray-900 dark:text-white">
          {{ title }}
        </h3>
        <button 
          v-if="tooltip"
          @click="showTooltip"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        </button>
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ description }}
      </p>
    </div>
    <label class="toggle-switch">
      <input 
        type="checkbox" 
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
      >
      <span class="toggle-slider"></span>
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: String,
  description: String,
  tooltip: String,
  modelValue: Boolean
})

const emits = defineEmits(['update:modelValue'])

const showTooltip = () => {
  if (window.showModal) {
    window.showModal(props.title, props.tooltip)
  }
}
</script>
