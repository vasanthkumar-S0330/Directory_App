<template>
  <div
    :class="[
      'px-4 py-3 rounded-lg shadow-lg flex items-center animate-slide-in max-w-xs sm:max-w-sm',
      toastClasses
    ]"
  >
    <i :class="iconClass" class="mr-2"></i>
    <span>{{ message }}</span>
    <button
      @click="$emit('close')"
      class="ml-auto text-white hover:text-neutral-200 focus:outline-none"
    >
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Toast',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    }
  },
  emits: ['close'],
  setup(props) {
    const toastClasses = computed(() => {
      const classes = {
        success: 'bg-success-500 text-white',
        error: 'bg-error-500 text-white',
        warning: 'bg-warning-500 text-white',
        info: 'bg-primary-500 text-white'
      }
      return classes[props.type]
    })

    const iconClass = computed(() => {
      const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
      }
      return icons[props.type]
    })

    return {
      toastClasses,
      iconClass
    }
  }
}
</script>