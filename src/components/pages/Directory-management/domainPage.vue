<template>
  <PageLayout 
    title="Domain Management" 
    subtitle="Manage your organization's domains and DNS settings"
  >
    <template #actions>
      <button
        @click="showAddDomainModal = true"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-blue-500 hover:bg-blue-600 text-white h-10 px-4 py-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4">
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
        Add Domain
      </button>
    </template>

    <!-- Domain Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-lg border shadow-sm p-4 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-500">Total Domains</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ domains.length }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg border shadow-sm p-4 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-500">Verified</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ verifiedDomains }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg border shadow-sm p-4 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-600">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-500">Pending</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ pendingDomains }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg border shadow-sm p-4 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-500">Mail Hosting</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ mailHostingDomains }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Domains Table -->
    <div class="overflow-x-auto">
      <table class="w-full border-collapse  ">
        <thead class="bg-blue-50 dark:bg-gray-800">
          <tr class="border-b">
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOMAIN NAME</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CREATED TIME</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MAIL HOSTING</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRIMARY</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="domain in domains" :key="domain.id" class="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="py-4 px-4">
              <div class="flex items-center space-x-2">
                <span class="font-medium">{{ domain.name }}</span>
                <button 
                  @click="openDomain(domain.name)"
                  class="ml-1 text-gray-400 hover:text-blue-600" 
                  title="Open in new tab"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7 7h10v10"></path>
                    <path d="M7 17 17 7"></path>
                  </svg>
                </button>
              </div>
            </td>
            <td class="py-4 px-4 text-gray-600">{{ domain.added }}</td>
            <td class="py-4 px-4">
              <span :class="getStatusBadgeClass(domain.status)">
                {{ domain.status }}
              </span>
            </td>
            <td class="py-4 px-4">
              <label class="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  class="sr-only peer" 
                  :checked="domain.mailHosting"
                  :disabled="domain.status !== 'Verified'"
                  @change="toggleMailHosting(domain.id)"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </td>
            <td class="py-4 px-4">
              <span v-if="domain.primary" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Primary
              </span>
              <button 
                v-else
                @click="setPrimaryDomain(domain.id)"
                :disabled="domain.status !== 'Verified'"
                class="px-3 py-1 text-xs border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Set as Primary
              </button>
            </td>
            <td class="py-4 px-4 text-right">
              <div class="flex items-center justify-end space-x-2">
                <button 
                  @click="verifyDomain(domain)"
                  :class="domain.status !== 'Verified' ? 'border-blue-300 text-blue-700 hover:bg-blue-50' : 'border-gray-300 text-gray-700 hover:bg-gray-50'"
                  class="inline-flex items-center px-3 py-1 text-xs border rounded-md"
                >
                  {{ domain.status !== 'Verified' ? 'Verify' : 'Details' }}
                </button>
                <button 
                  @click="deleteDomain(domain.id)"
                  class="p-1 text-red-500 hover:text-red-700" 
                  title="Delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Domain Modal -->
    <div v-if="showAddDomainModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto dark:bg-gray-800">
        <div class="py-4 text-left px-6">
          <div class="flex justify-between items-center pb-3 border-b">
            <p class="text-xl font-bold">Add Domain</p>
            <button @click="showAddDomainModal = false" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>

          <form @submit.prevent="addDomain" class="mt-6">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2" for="domain-name">
                Domain Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="newDomain.name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="domain-name" 
                type="text" 
                placeholder="example.com" 
                required
              >
              <p class="text-xs text-gray-500 mt-1">Enter your domain without http:// or https://</p>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2">
                Domain Purpose
              </label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input v-model="newDomain.website" type="checkbox" class="form-checkbox h-4 w-4 text-blue-600">
                  <span class="ml-2 text-sm">Website hosting</span>
                </label>
                <label class="flex items-center">
                  <input v-model="newDomain.email" type="checkbox" class="form-checkbox h-4 w-4 text-blue-600">
                  <span class="ml-2 text-sm">Email hosting</span>
                </label>
              </div>
            </div>

            <div class="mb-6">
              <label class="flex items-center">
                <input v-model="newDomain.primary" type="checkbox" class="form-checkbox h-4 w-4 text-blue-600">
                <span class="ml-2 text-sm">Set as primary domain</span>
              </label>
              <p class="text-xs text-gray-500 mt-1">Primary domain will be used for organization branding</p>
            </div>

            <div class="flex justify-end pt-4 border-t gap-3">
              <button 
                type="button"
                @click="showAddDomainModal = false"
                class="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Domain
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
// import PageLayout from '../components/PageLayout.vue'
import PageLayout from '@/components/PageLayout.vue'

const showAddDomainModal = ref(false)

const domains = reactive([
  {
    id: 1,
    name: "acmecorp.com",
    status: "Verified",
    primary: true,
    mailHosting: true,
    added: "Jan 15, 2022"
  },
  {
    id: 2,
    name: "acme-tech.com",
    status: "Verified",
    primary: false,
    mailHosting: false,
    added: "Mar 22, 2022"
  },
  {
    id: 3,
    name: "bytebuilds.com",
    status: "Not Verified",
    primary: false,
    mailHosting: false,
    added: "3 days ago"
  }
])

const newDomain = reactive({
  name: '',
  website: false,
  email: false,
  primary: false
})

const verifiedDomains = computed(() => {
  return domains.filter(d => d.status === 'Verified').length
})

const pendingDomains = computed(() => {
  return domains.filter(d => d.status === 'Pending' || d.status === 'Not Verified').length
})

const mailHostingDomains = computed(() => {
  return domains.filter(d => d.mailHosting).length
})

const getStatusBadgeClass = (status) => {
  const classes = {
    'Verified': 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800',
    'Pending': 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800',
    'Not Verified': 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800'
  }
  return classes[status] || classes['Not Verified']
}

const openDomain = (domainName) => {
  window.open(`https://${domainName}`, '_blank')
}

const toggleMailHosting = (domainId) => {
  const domain = domains.find(d => d.id === domainId)
  if (domain && domain.status === 'Verified') {
    domain.mailHosting = !domain.mailHosting
    if (window.showToast) {
      window.showToast('Success', `Mail hosting ${domain.mailHosting ? 'enabled' : 'disabled'} for ${domain.name}`)
    }
  }
}

const setPrimaryDomain = (domainId) => {
  const domain = domains.find(d => d.id === domainId)
  if (domain && domain.status === 'Verified') {
    domains.forEach(d => d.primary = false)
    domain.primary = true
    if (window.showToast) {
      window.showToast('Success', `${domain.name} set as primary domain`)
    }
  }
}

const verifyDomain = (domain) => {
  if (window.showModal) {
    window.showModal('Domain Verification', `Verification details for ${domain.name}`)
  }
}

const deleteDomain = (domainId) => {
  const domain = domains.find(d => d.id === domainId)
  if (domain && confirm(`Are you sure you want to delete ${domain.name}?`)) {
    const index = domains.findIndex(d => d.id === domainId)
    domains.splice(index, 1)
    if (window.showToast) {
      window.showToast('Success', `${domain.name} has been deleted`)
    }
  }
}

const addDomain = () => {
  if (!newDomain.name) {
    if (window.showToast) {
      window.showToast('Error', 'Please enter a domain name', 'error')
    }
    return
  }

  if (domains.some(d => d.name.toLowerCase() === newDomain.name.toLowerCase())) {
    if (window.showToast) {
      window.showToast('Error', 'This domain already exists', 'error')
    }
    return
  }

  if (newDomain.primary) {
    domains.forEach(domain => {
      domain.primary = false
    })
  }

  const domain = {
    id: domains.length + 1,
    name: newDomain.name.toLowerCase(),
    status: "Not Verified",
    primary: newDomain.primary,
    mailHosting: newDomain.email,
    added: "Just now"
  }

  domains.push(domain)
  showAddDomainModal.value = false
  
  // Reset form
  Object.assign(newDomain, {
    name: '',
    website: false,
    email: false,
    primary: false
  })

  if (window.showToast) {
    window.showToast('Success', `Domain ${domain.name} added successfully! Please verify it to activate all features.`)
  }
}
</script>
