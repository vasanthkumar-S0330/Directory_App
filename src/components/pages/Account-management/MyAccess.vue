<template>
  <section class="space-y-6 animate-fade-in">
    <!-- Sub Navigation -->
    <div class="bg-white rounded-lg shadow-sm overflow-x-auto">
      <div class="p-1 min-w-max">
        <nav class="flex space-x-1" aria-label="Tabs">
          <button
            v-for="tab in accessTabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-md transition-colors',
              activeTab === tab.id
                ? 'bg-primary-50 text-primary-700'
                : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50'
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Access List Tab -->
    <div v-if="activeTab === 'access-list'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-neutral-900">Your Access & Permissions</h3>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-search text-neutral-400"></i>
              </div>
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Search access"
                class="pl-10 px-4 py-2 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-neutral-200">
              <thead class="bg-neutral-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Application/Module</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Role</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Granted By</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date Granted</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-neutral-200">
                <tr v-for="(access, index) in filteredAccessList" :key="access.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div :class="['flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center', access.color]">
                        <i :class="access.icon"></i>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-neutral-900">{{ access.app }}</div>
                        <div class="text-xs text-neutral-500">{{ access.module }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-neutral-900">{{ access.role }}</div>
                    <div class="text-xs text-neutral-500">{{ access.access }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-neutral-500">{{ access.granted }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-neutral-500">{{ access.date }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 py-1 text-xs rounded-full',
                      access.status === 'Active' ? 'bg-success-100 text-success-800' : 'bg-neutral-100 text-neutral-800'
                    ]">
                      {{ access.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button @click="viewAccessDetails(access, index)" class="text-primary-600 hover:text-primary-900">
                      View Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Request Access Tab -->
    <div v-if="activeTab === 'request-access'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6 space-y-6">
          <div class="max-w-2xl">
            <h3 class="text-lg font-medium text-neutral-900 mb-4">Request New Access</h3>

            <form @submit.prevent="submitAccessRequest" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Application/Module</label>
                <select
                  v-model="accessRequest.application"
                  class="w-full px-4 py-2 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  required
                >
                  <option value="">Select an application</option>
                  <option>Document Portal</option>
                  <option>Analytics Dashboard</option>
                  <option>Support Ticketing</option>
                  <option>Meeting Scheduler</option>
                  <option>CRM System</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Access Level Required</label>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label class="border border-neutral-300 rounded-md p-4 hover:border-primary-500 cursor-pointer">
                    <div class="flex items-center space-x-2">
                      <input
                        v-model="accessRequest.accessLevel"
                        value="viewer"
                        type="radio"
                        class="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <div>
                        <p class="text-sm font-medium text-neutral-900">Viewer</p>
                        <p class="text-xs text-neutral-500">Read-only access</p>
                      </div>
                    </div>
                  </label>

                  <label class="border border-neutral-300 rounded-md p-4 hover:border-primary-500 cursor-pointer">
                    <div class="flex items-center space-x-2">
                      <input
                        v-model="accessRequest.accessLevel"
                        value="editor"
                        type="radio"
                        class="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <div>
                        <p class="text-sm font-medium text-neutral-900">Editor</p>
                        <p class="text-xs text-neutral-500">Create & edit content</p>
                      </div>
                    </div>
                  </label>

                  <label class="border border-neutral-300 rounded-md p-4 hover:border-primary-500 cursor-pointer">
                    <div class="flex items-center space-x-2">
                      <input
                        v-model="accessRequest.accessLevel"
                        value="admin"
                        type="radio"
                        class="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <div>
                        <p class="text-sm font-medium text-neutral-900">Admin</p>
                        <p class="text-xs text-neutral-500">Full system access</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Reason for Access</label>
                <textarea
                  v-model="accessRequest.reason"
                  rows="3"
                  class="w-full px-4 py-2 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Explain why you need this access..."
                  required
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Duration</label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <select
                      v-model="accessRequest.duration"
                      class="w-full px-4 py-2 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option>Permanent access</option>
                      <option>Temporary access</option>
                    </select>
                  </div>
                  <div>
                    <input
                      v-model="accessRequest.endDate"
                      type="date"
                      class="w-full px-4 py-2 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="End date (if temporary)"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Approver</label>
                <input
                  v-model="accessRequest.approver"
                  type="text"
                  class="w-full px-4 py-2 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Name or email of your manager/approver"
                  required
                />
              </div>

              <div class="pt-4">
                <button
                  type="submit"
                  class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Access Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div class="bg-white w-full max-w-lg rounded-xl shadow-lg">
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-lg font-semibold">Access Details</h3>
          <button @click="closeDetailsModal" class="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
        </div>
        <div class="p-6 space-y-4" v-if="selectedAccess">
          <div><strong>Application:</strong> {{ selectedAccess.app }}</div>
          <div><strong>Module:</strong> {{ selectedAccess.module }}</div>
          <div><strong>Role:</strong> {{ selectedAccess.role }}</div>
          <div><strong>Access:</strong> {{ selectedAccess.access }}</div>
          <div><strong>Granted By:</strong> {{ selectedAccess.granted }}</div>
          <div><strong>Date Granted:</strong> {{ selectedAccess.date }}</div>
          <div><strong>Status:</strong> {{ selectedAccess.status }}</div>
        </div>
        <div class="flex justify-end p-4 border-t">
          <button @click="closeDetailsModal" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Close</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, inject } from 'vue'

export default {
  name: 'MyAccess',
  setup() {
    const showToast = inject('showToast')
    
    const activeTab = ref('access-list')
    const searchTerm = ref('')
    const showDetailsModal = ref(false)
    const selectedAccess = ref(null)

    const accessTabs = [
      { id: 'access-list', label: 'Access List' },
      { id: 'request-access', label: 'Request Access' }
    ]

    const accessRequest = ref({
      application: '',
      accessLevel: '',
      reason: '',
      duration: 'Permanent access',
      endDate: '',
      approver: ''
    })

    const accessList = ref([
      {
        id: 1,
        app: "Document Portal",
        module: "Content Management",
        role: "Admin",
        access: "Full Access",
        granted: "Sarah Johnson",
        date: "Jan 15, 2025",
        status: "Active",
        color: "bg-primary-100 text-primary-600",
        icon: "fas fa-file-alt"
      },
      {
        id: 2,
        app: "Analytics Dashboard",
        module: "Business Intelligence",
        role: "Editor",
        access: "Create & Edit Reports",
        granted: "Michael Chen",
        date: "Feb 20, 2025",
        status: "Active",
        color: "bg-secondary-100 text-secondary-600",
        icon: "fas fa-chart-line"
      },
      {
        id: 3,
        app: "Support Ticketing",
        module: "Customer Support",
        role: "Viewer",
        access: "Read-only Access",
        granted: "Jessica Williams",
        date: "Mar 5, 2025",
        status: "Inactive",
        color: "bg-accent-100 text-accent-600",
        icon: "fas fa-ticket-alt"
      }
    ])

    const filteredAccessList = computed(() => {
      if (!searchTerm.value) return accessList.value
      
      return accessList.value.filter(access =>
        access.app.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        access.module.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        access.role.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    })

    const viewAccessDetails = (access, index) => {
      selectedAccess.value = access
      showDetailsModal.value = true
    }

    const closeDetailsModal = () => {
      showDetailsModal.value = false
      selectedAccess.value = null
    }

    const submitAccessRequest = () => {
      // Simulate request submission
      showToast('Access request submitted successfully!', 'success')
      
      // Reset form
      accessRequest.value = {
        application: '',
        accessLevel: '',
        reason: '',
        duration: 'Permanent access',
        endDate: '',
        approver: ''
      }
      
      // Switch to access list tab
      activeTab.value = 'access-list'
    }

    return {
      activeTab,
      searchTerm,
      showDetailsModal,
      selectedAccess,
      accessTabs,
      accessRequest,
      accessList,
      filteredAccessList,
      viewAccessDetails,
      closeDetailsModal,
      submitAccessRequest
    }
  }
}
</script>