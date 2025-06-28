<template>
  <div v-if="show" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative mx-4">
      <div class="flex justify-between items-center border-b pb-3 mb-4">
        <h2 class="text-xl font-semibold text-gray-800">{{ title }}</h2>
        <button 
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700 text-2xl leading-none transition-colors"
        >
          &times;
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="eventTitle" class="block font-medium text-gray-700 mb-1">Event Title</label>
          <input 
            v-model="form.title"
            type="text" 
            id="eventTitle" 
            required 
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors" 
          />
        </div>
        
        <div>
          <label for="eventDate" class="block font-medium text-gray-700 mb-1">Start Date</label>
          <input 
            v-model="form.startDate"
            type="datetime-local" 
            id="eventDate" 
            required 
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors" 
          />
        </div>
        
        <div>
          <label for="eventEndDate" class="block font-medium text-gray-700 mb-1">End Date</label>
          <input 
            v-model="form.endDate"
            type="datetime-local" 
            id="eventEndDate" 
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors" 
          />
        </div>
        
        <div>
          <label for="eventDescription" class="block font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            v-model="form.description"
            id="eventDescription" 
            rows="3" 
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
          ></textarea>
        </div>
        
        <div class="flex justify-end gap-2 pt-4 border-t">
          <button 
            type="button" 
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Save Event
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  title: {
    type: String,
    default: 'Add Event'
  },
  event: Object
})

const emit = defineEmits(['close', 'save'])

const form = reactive({
  title: '',
  startDate: '',
  endDate: '',
  description: ''
})

const handleSubmit = () => {
  emit('save', { ...form })
  resetForm()
}

const resetForm = () => {
  form.title = ''
  form.startDate = ''
  form.endDate = ''
  form.description = ''
}

watch(() => props.event, (newEvent) => {
  if (newEvent) {
    Object.assign(form, newEvent)
  }
}, { immediate: true })

watch(() => props.show, (show) => {
  if (!show) {
    resetForm()
  }
})
</script>
