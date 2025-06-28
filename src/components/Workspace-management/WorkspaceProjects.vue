<template>
  <PageLayout 
    title="Chat Meet Admin Settings" 
    subtitle="Configure chat and video meeting settings for your organization"
  >
    <div class="space-y-8">
  <div class="bg-white rounded-lg shadow-sm">
    <div class="p-6">
      <!-- Video Call Duration -->
      <div class="mb-8">
        <div class="flex justify-between items-center mb-2">
          <label for="videoDuration" class="text-gray-700 font-medium dark:text-gray-300">Max Video Call Duration (Minutes)</label>
          <input 
            v-model="videoDuration" 
            type="number" 
            id="videoDuration" 
            class="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-center dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
          >
        </div>
        
        <div class="relative">
          <input 
            v-model="videoDuration"
            type="range" 
            id="videoDurationSlider" 
            min="5" 
            max="480" 
            step="5" 
            class="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700"
          >
          
          <div class="flex justify-between text-xs text-gray-500 mt-2 dark:text-gray-400">
            <span>5 min</span>
            <span>2 hours</span>
            <span>4 hours</span>
            <span>8 hours</span>
          </div>
        </div>
      </div>

      <!-- File Sharing Toggle -->
      <ChatToggle
        v-model="fileSharing"
        title="Enable File Sharing in Chat"
        description="Allow users to share files in chat conversations"
      />

      <!-- File Settings Group -->
      <div v-if="fileSharing" class="space-y-6">
        <!-- Max Files per Send -->
        <div class="mb-6">
          <div class="flex justify-between items-center">
            <label for="maxFiles" class="text-gray-700 font-medium flex items-center dark:text-gray-300">
              Max Files per Send
              <div class="tooltip ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="tooltiptext">Maximum number of files a user can send in a single message</span>
              </div>
            </label>
            <input 
              v-model="maxFiles"
              type="number" 
              id="maxFiles" 
              min="1" 
              max="20" 
              class="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-center dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
          </div>
        </div>

        <!-- Max File Size per Send -->
        <div class="mb-6">
          <div class="flex justify-between items-center">
            <label for="maxFileSize" class="text-gray-700 font-medium dark:text-gray-300">Max File Size per Send (MB)</label>
            <input 
              v-model="maxFileSize"
              type="number" 
              id="maxFileSize" 
              min="1" 
              max="100" 
              class="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-center dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
          </div>
        </div>

        <!-- Max Individual File Size -->
        <div class="mb-6">
          <div class="flex justify-between items-center">
            <label for="maxIndividualSize" class="text-gray-700 font-medium dark:text-gray-300">Max Individual File Size (MB)</label>
            <input 
              v-model="maxIndividualSize"
              type="number" 
              id="maxIndividualSize" 
              min="1" 
              max="50" 
              class="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-center dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
          </div>
        </div>
      </div>

      <!-- Additional Settings Dropdown -->
      <div class="mb-8">
        <button 
          @click="showAdditionalSettings = !showAdditionalSettings"
          type="button" 
          class="flex items-center text-blue-600 hover:text-blue-800 transition"
        >
          <span>Additional Settings</span>
          <svg 
            :class="['h-5 w-5 ml-1 transform transition-transform duration-200', showAdditionalSettings ? 'rotate-180' : '']"
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <div v-if="showAdditionalSettings" class="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <!-- Additional Setting 1 -->
          <div class="mb-4">
            <div class="flex justify-between items-center">
              <label for="chatRetention" class="text-gray-700 font-medium dark:text-gray-300">Chat History Retention (Days)</label>
              <input 
                v-model="chatRetention"
                type="number" 
                id="chatRetention" 
                min="1" 
                max="365" 
                class="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-center dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
            </div>
          </div>
          
          <!-- Additional Setting 2 -->
          <div class="mb-4">
            <div class="flex justify-between items-center">
              <label for="recordingStorage" class="text-gray-700 font-medium dark:text-gray-300">Recording Storage (Days)</label>
              <input 
                v-model="recordingStorage"
                type="number" 
                id="recordingStorage" 
                min="1" 
                max="365" 
                class="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-center dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
            </div>
          </div>
          
          <!-- Additional Setting 3 -->
          <div>
            <div class="flex justify-between items-center">
              <label for="securityLevel" class="text-gray-700 font-medium dark:text-gray-300">Security Level</label>
              <select 
                v-model="securityLevel"
                id="securityLevel" 
                class="w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="standard">Standard</option>
                <option value="enhanced">Enhanced</option>
                <option value="maximum">Maximum</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end space-x-4 mt-10 border-t pt-6 dark:border-gray-700">
        <button 
          @click="resetToDefault"
          type="button" 
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Reset to Default
        </button>
        <button 
          type="button" 
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button 
          @click="saveSettings"
          type="button" 
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirmationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 dark:bg-gray-800">
        <h3 class="text-lg font-medium text-gray-900 mb-4 dark:text-white">Confirm Changes</h3>
        <p class="text-gray-600 mb-6 dark:text-gray-300">Are you sure you want to save these changes? This will affect all users in your organization.</p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="showConfirmationModal = false"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button 
            @click="confirmSave"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref } from 'vue'
// import PageLayout from '../components/PageLayout.vue'
// import ChatToggle from '../components/ChatToggle.vue'

const videoDuration = ref(120)
const fileSharing = ref(true)
const maxFiles = ref(5)
const maxFileSize = ref(20)
const maxIndividualSize = ref(10)
const chatRetention = ref(30)
const recordingStorage = ref(14)
const securityLevel = ref('standard')
const showAdditionalSettings = ref(false)
const showConfirmationModal = ref(false)

const defaultSettings = {
  videoDuration: 120,
  fileSharing: true,
  maxFiles: 5,
  maxFileSize: 20,
  maxIndividualSize: 10,
  chatRetention: 30,
  recordingStorage: 14,
  securityLevel: 'standard'
}

const resetToDefault = () => {
  videoDuration.value = defaultSettings.videoDuration
  fileSharing.value = defaultSettings.fileSharing
  maxFiles.value = defaultSettings.maxFiles
  maxFileSize.value = defaultSettings.maxFileSize
  maxIndividualSize.value = defaultSettings.maxIndividualSize
  chatRetention.value = defaultSettings.chatRetention
  recordingStorage.value = defaultSettings.recordingStorage
  securityLevel.value = defaultSettings.securityLevel
  
  if (window.showToast) {
    window.showToast('Success', 'Settings reset to default values')
  }
}

const saveSettings = () => {
  showConfirmationModal.value = true
}

const confirmSave = () => {
  showConfirmationModal.value = false
  if (window.showToast) {
    window.showToast('Success', 'Chat settings saved successfully!')
  }
}
</script>
