<template>
  <PageLayout 
    title="Drive Admin Settings" 
    subtitle="Configure storage quotas and file management policies"
  >
    <div class="space-y-6">
      <div class="space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <label for="driveQuota" class="text-gray-700 font-medium dark:text-gray-300">
            Organization Drive Quota (GB)
          </label>
          <input
            v-model="driveQuota"
            id="driveQuota"
            type="number"
            min="1"
            class="w-32 px-3 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div class="flex flex-wrap items-center justify-between gap-4">
          <label for="maxFileSize" class="text-gray-700 font-medium dark:text-gray-300">
            Max File Upload Size (MB)
          </label>
          <input
            v-model="maxFileSize"
            id="maxFileSize"
            type="number"
            min="1"
            class="w-32 px-3 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div class="border-t border-gray-200 pt-6 dark:border-gray-700">
        <h3 class="text-gray-700 font-medium mb-4 dark:text-gray-300">Storage Usage</h3>
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-gray-700 dark:text-gray-300">Total Organization Storage Used</span>
            <span class="font-medium">{{ storageUsed }} GB</span>
          </div>
          
          <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden dark:bg-gray-700">
            <div 
              class="h-full bg-blue-500 transition-all duration-500 ease-in-out"
              :style="{ width: `${storagePercentage}%` }"
            ></div>
          </div>
          
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-gray-700 dark:text-gray-300">Available Organization Storage</span>
            <span class="font-medium">{{ availableStorage }} GB</span>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-200 pt-6 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-gray-700 font-medium dark:text-gray-300">Read-Only Files from Management</h3>
          <button
            @click="showAddFileModal = true"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            Add File
          </button>
        </div>
        
        <div class="border border-gray-200 rounded-lg overflow-hidden dark:border-gray-700">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  FILE/FOLDER NAME
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  PATH
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              <tr v-if="files.length === 0">
                <td colspan="3" class="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No files added yet
                </td>
              </tr>
              <tr v-for="file in files" :key="file.id" class="hover:bg-gray-50 transition-colors duration-150 dark:hover:bg-gray-700">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {{ file.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {{ file.path }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    @click="removeFile(file.id)"
                    class="text-gray-500 hover:text-red-600 transition-colors duration-200"
                    :aria-label="`Remove ${file.name}`"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 6h18"/>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      <line x1="10" y1="11" x2="10" y2="17"/>
                      <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex justify-end gap-3 pt-4">
        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-10 px-4 py-2">Cancel</button>
        <button 
          @click="saveSettings"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-10 px-4 py-2"
        >
          Save Changes
        </button>
      </div>
    </div>

    <!-- Add File Modal -->
    <div v-if="showAddFileModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden dark:bg-gray-800">
        <div class="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h3 class="text-lg font-medium dark:text-white">Add Read-Only File</h3>
          <button 
            @click="showAddFileModal = false"
            class="text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="addFile" class="p-4">
          <div v-if="fileError" class="mb-4 p-2 bg-red-50 text-red-700 rounded dark:bg-red-900/20 dark:text-red-400">
            {{ fileError }}
          </div>

          <div class="space-y-4">
            <div>
              <label for="fileName" class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                File/Folder Name
              </label>
              <input
                v-model="newFile.name"
                id="fileName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., Financial Reports"
              />
            </div>

            <div>
              <label for="filePath" class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                Path
              </label>
              <input
                v-model="newFile.path"
                id="filePath"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="e.g., /shared/reports"
              />
            </div>
          </div>

          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="showAddFileModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Add File
            </button>
          </div>
        </form>
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
// import PageLayout from '../components/PageLayout.vue'
import PageLayout from '@/components/PageLayout.vue'

const driveQuota = ref(1000)
const maxFileSize = ref(100)
const storageUsed = ref(650)
const showAddFileModal = ref(false)
const fileError = ref('')

const files = reactive([
  { id: 1, name: 'Company Policies', path: '/shared/policies' },
  { id: 2, name: 'Brand Templates', path: '/shared/templates' }
])

const newFile = reactive({
  name: '',
  path: ''
})

const storagePercentage = computed(() => {
  return (storageUsed.value / driveQuota.value) * 100
})

const availableStorage = computed(() => {
  return driveQuota.value - storageUsed.value
})

const removeFile = (id) => {
  const index = files.findIndex(file => file.id === id)
  if (index > -1) {
    files.splice(index, 1)
  }
}

const addFile = () => {
  fileError.value = ''
  
  if (!newFile.name.trim() || !newFile.path.trim()) {
    fileError.value = 'Both name and path are required'
    return
  }
  
  const file = {
    id: files.length + 1,
    name: newFile.name.trim(),
    path: newFile.path.startsWith('/') ? newFile.path : `/${newFile.path}`
  }
  
  files.push(file)
  showAddFileModal.value = false
  
  // Reset form
  newFile.name = ''
  newFile.path = ''
  
  if (window.showToast) {
    window.showToast('Success', 'File added successfully!')
  }
}

const saveSettings = () => {
  if (window.showToast) {
    window.showToast('Success', 'Drive settings saved successfully!')
  }
}
</script>
