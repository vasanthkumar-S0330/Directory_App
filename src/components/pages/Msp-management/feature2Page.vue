<template>
  <PageLayout 
    title="Organizations" 
    subtitle="Manage your organizations and their settings"
  >
    <template #actions>
      <div class="flex justify-end mb-4">
        <button 
          @click="showAddOrganizationModal = true"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add Organization
        </button>
      </div>
    </template>

    <!-- Add Organization Modal -->
    <div v-if="showAddOrganizationModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-md w-full p-6 animate-fade-in dark:bg-gray-800">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Add New Organization</h3>
          <button @click="showAddOrganizationModal = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Organization Name*</label>
            <input 
              v-model="newOrganization.name"
              type="text"
              placeholder="Enter organization name"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Email</label>
            <input 
              v-model="newOrganization.email"
              type="email"
              placeholder="Enter organization email"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Location</label>
            <input 
              v-model="newOrganization.location"
              type="text"
              placeholder="Enter location"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Status</label>
            <select 
              v-model="newOrganization.status"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Number of Employees</label>
            <input 
              v-model.number="newOrganization.employees"
              type="number"
              min="0"
              placeholder="Enter number of employees"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            @click="showAddOrganizationModal = false"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button 
            @click="addOrganization"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Organization
          </button>
        </div>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="relative w-full sm:w-64">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search organizations..."
          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          v-model="search"
        />
      </div>
      
      <div class="flex items-center space-x-3">
        <select 
          v-model="filter1"
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        
        <select 
          v-model="filter2"
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Employee Types</option>
          <option value="with-employees">With Employees</option>
          <option value="no-employees">No Employees</option>
        </select>
        
        <button class="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-200 dark:bg-gray-700 dark:hover:bg-gray-600">
          <svg class="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded shadow-sm dark:border-gray-700">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-blue-50 dark:bg-gray-700">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
              <input type="checkbox" class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700" />
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Organization</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Employees</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Location</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Status</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Date Added</th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          <tr v-for="org in filteredOrganizations" :key="org.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 whitespace-nowrap">
              <input type="checkbox" class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700" />
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{{ org.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center dark:bg-blue-900">
                  <span class="text-blue-600 font-medium dark:text-blue-300">{{ org.name.charAt(0) }}</span>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ org.name }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">{{ org.email || 'No email' }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              <div class="flex items-center">
                <span>{{ org.employees }}</span>
                <span v-if="org.employees > 0" class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Active
                </span>
                <span v-else class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  None
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ org.location }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="[
                  'px-2 py-1 text-xs font-medium rounded-full capitalize',
                  org.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                ]"
              >
                {{ org.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ formatDate(org.date) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="relative">
                <button 
                  @click="toggleOrgActions(org.id)"
                  class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
                <div 
                  v-if="activeOrgActions === org.id"
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 dark:bg-gray-800 dark:ring-gray-700"
                >
                  <div class="py-1">
                    <button 
                      @click="viewOrganization(org)"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      View details
                    </button>
                    <button 
                      @click="editOrganization(org)"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Edit
                    </button>
                    <button 
                      @click="deleteOrganization(org)"
                      class="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left dark:text-red-500 dark:hover:bg-gray-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="filteredOrganizations.length === 0">
            <td colspan="8" class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-400">
              No organizations found matching your criteria.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageLayout from '@/components/PageLayout.vue'

const search = ref('')
const filter1 = ref('')
const filter2 = ref('')
const activeOrgActions = ref(null)
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showAddOrganizationModal = ref(false)

const newOrganization = ref({
  name: '',
  email: '',
  location: '',
  status: 'Active',
  employees: 0,
  date: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
})

const organizations = ref([
  {
    id: 'ORG001',
    name: 'SagaID Pvt Ltd',
    email: 'contact@sagaid.com',
    employees: 120,
    location: 'Chennai, India',
    status: 'Active',
    date: '2025-05-01'
  },
  {
    id: 'ORG002',
    name: 'TechNova Solutions',
    email: 'info@technova.com',
    employees: 0,
    location: 'Bangalore, India',
    status: 'Inactive',
    date: '2025-04-15'
  },
  {
    id: 'ORG003',
    name: 'GreenLeaf Enterprises',
    email: 'hello@greenleaf.com',
    employees: 45,
    location: 'Mumbai, India',
    status: 'Active',
    date: '2025-03-22'
  },
  {
    id: 'ORG004',
    name: 'BlueOcean Tech',
    email: 'support@blueocean.tech',
    employees: 230,
    location: 'Hyderabad, India',
    status: 'Active',
    date: '2025-02-10'
  },
  {
    id: 'ORG005',
    name: 'Sunrise Analytics',
    email: '',
    employees: 8,
    location: 'Pune, India',
    status: 'Active',
    date: '2025-01-05'
  }
])

const filteredOrganizations = computed(() => {
  return organizations.value.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(search.value.toLowerCase()) || 
                         (org.email && org.email.toLowerCase().includes(search.value.toLowerCase())) ||
                         org.location.toLowerCase().includes(search.value.toLowerCase())
    
    const matchesFilter1 = !filter1.value || 
                         (filter1.value === 'active' && org.status === 'Active') || 
                         (filter1.value === 'inactive' && org.status === 'Inactive')
    
    const matchesFilter2 = !filter2.value || 
                         (filter2.value === 'with-employees' && org.employees > 0) || 
                         (filter2.value === 'no-employees' && org.employees === 0)
    
    return matchesSearch && matchesFilter1 && matchesFilter2
  })
})

const paginatedOrganizations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredOrganizations.value.slice(start, end)
})

function toggleOrgActions(orgId) {
  activeOrgActions.value = activeOrgActions.value === orgId ? null : orgId
}

function viewOrganization(org) {
  alert(`Viewing details for: ${org.name}`)
  activeOrgActions.value = null
}

function editOrganization(org) {
  alert(`Editing: ${org.name}`)
  activeOrgActions.value = null
}

function deleteOrganization(org) {
  if (confirm(`Are you sure you want to delete ${org.name}?`)) {
    const index = organizations.value.findIndex(o => o.id === org.id)
    if (index !== -1) {
      organizations.value.splice(index, 1)
      alert(`${org.name} deleted successfully`)
    }
  }
  activeOrgActions.value = null
}

function addOrganization() {
  if (!newOrganization.value.name) {
    alert('Organization name is required')
    return
  }

  // Generate a new ID
  const newId = 'ORG' + String(organizations.value.length + 1).padStart(3, '0')
  
  // Add the new organization to the beginning of the list
  organizations.value.unshift({
    id: newId,
    ...newOrganization.value
  })

  // Reset the form and close modal
  newOrganization.value = {
    name: '',
    email: '',
    location: '',
    status: 'Active',
    employees: 0,
    date: new Date().toISOString().split('T')[0]
  }
  showAddOrganizationModal.value = false
  
  alert('Organization added successfully!')
}

function nextPage() {
  if (currentPage.value * itemsPerPage.value < filteredOrganizations.value.length) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>