<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl max-w-md w-full p-6 animate-fade-in">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="space-y-4 mb-6">
        <div v-if="typeof content === 'string'" v-html="content"></div>
        <component v-else-if="content" :is="content" />
        <p v-else>{{ content }}</p>
      </div>

      <div class="flex space-x-3">
        <button
          @click="handleConfirm"
          :class="[
            'flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-white',
            confirmClass
          ]"
        >
          {{ confirmText }}
        </button>
        <button
          v-if="showCancel"
          @click="$emit('cancel')"
          class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
        >
          {{ cancelText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      default: 'Confirmation'
    },
    content: {
      type: [String, Object],
      default: 'Are you sure you want to proceed?'
    },
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    confirmClass: {
      type: String,
      default: 'bg-primary-600 hover:bg-primary-700'
    },
    showCancel: {
      type: Boolean,
      default: true
    }
  },
  emits: ['confirm', 'cancel', 'close'],
  setup(props, { emit }) {
    const handleConfirm = () => {
      emit('confirm')
      emit('close')
    }

    return {
      handleConfirm
    }
  }
}
</script>