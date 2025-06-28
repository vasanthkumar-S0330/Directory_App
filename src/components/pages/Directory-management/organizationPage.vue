<template>
  <section class="space-y-6 animate-fade-in">
    <!-- Sub Navigation -->
    <div class="bg-white rounded-lg shadow-sm overflow-x-auto">
      <div class="p-1 min-w-max">
        <nav class="flex space-x-1" aria-label="Tabs">
          <button v-for="tab in groupTabs" :key="tab.id" @click="activeTab = tab.id" :class="[
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            activeTab === tab.id
              ? 'bg-primary-50 text-primary-700'
              : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50'
          ]">
            {{ tab.label }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Organization Info Tab -->
    <div v-if="activeTab === 'group-list'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-neutral-900">Organization</h3>
            <div class="relative">

            </div>
          </div>

          <div class="overflow-x-auto">
            <div id="organization-readonly" class="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div class="flex flex-col md:flex-row items-start md:items-center justify-between mx-6 mt-4 mb-2">
                <div class="flex items-center gap-2">
                  <div>
                    <span class="flex flex-row items-center gap-2">
                      <svg class="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <div class="text-blue-700 font-medium">Alex Johnson</div>
                    </span>
                    <span class="text-gray-600 text-sm block">AlexJohnson@gmail.com</span>
                  </div>
                </div>
                <button @click="openEditModal"
                  class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                  Edit
                </button>
              </div>
              <hr class="my-2 border-gray-200">
              <div class="p-2 flex items-center justify-between">
                <div>
                  <h2 class="text-xl font-semibold" id="readonly-company-name">Acme Corporation</h2>
                  <p class="text-gray-500" id="readonly-company-type">Technology Company</p>
                </div>
              </div>
              <div class="px-3 pb-3 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 class="text-sm font-medium text-gray-500">Organization ID</h3>
                    <p id="readonly-org-id">ORG-12345</p>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-500">Founded</h3>
                    <p id="readonly-founded">January 15, 2010</p>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-500">Headquarters</h3>
                    <p id="readonly-headquarters">New York, USA</p>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-500">Employees</h3>
                    <p id="readonly-employees">1,250</p>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-500">Saga Url</h3>
                    <p id="readonly-saga-url">sagasoft.io</p>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-500">Website</h3>
                    <p id="readonly-website">www.acmecorp.com</p>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-500">Industry</h3>
                    <p id="readonly-industry">Technology</p>
                  </div>
                </div>
              </div>
              <div class="bg-white rounded-lg border border-gray-200 shadow-sm mt-2">
                <div class="p-3">
                  <h2 class="text-xl font-semibold">Contact Information</h2>
                </div>
                <div class="px-3 pb-3">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 class="text-sm font-medium text-gray-500">Primary Email</h3>
                      <p id="readonly-primary-email">contact@acmecorp.com</p>
                    </div>
                    <div>
                      <h3 class="text-sm font-medium text-gray-500">Phone</h3>
                      <p id="readonly-phone">+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <h3 class="text-sm font-medium text-gray-500">Address</h3>
                      <p id="readonly-address">123 Tech Avenue, New York, NY 10001, USA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- Work Location Tab -->
    <div v-if="activeTab === 'add-group'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6 space-y-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <!-- Header Section -->
            <div class="p-5 border-b border-gray-100">
              <div class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 class="text-xl font-semibold text-gray-800">Work Locations</h2>
                  <p class="text-sm text-gray-500 mt-1">Manage your organization's work locations</p>
                </div>
                <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                  Work Location
                </button>
              </div>
            </div>

            <!-- Table Section -->
            <div class="p-5">
              <div class="overflow-x-auto rounded-lg border border-gray-100">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location
                      </th>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users
                      </th>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200" id="locations-table-body">
                    <!-- Locations will be populated by JavaScript -->
                  </tbody>
                </table>
              </div>

              <!-- Empty State -->
              <div id="locations-empty-state" class="text-center py-12 hidden">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                  <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 class="mt-3 text-sm font-medium text-gray-900">No locations</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by adding a new work location.</p>
                <div class="mt-6">
                  <button type="button"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd" />
                    </svg>
                    New Location
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Designations Tab -->
    <div v-if="activeTab === 'owned-groups'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6 space-y-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <!-- Header Section -->
            <div class="p-5 border-b border-gray-100">
              <div class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 class="text-xl font-semibold text-gray-800">Designations</h2>
                  <p class="text-sm text-gray-500 mt-1">Manage your organization's work Designations</p>
                </div>
                <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                  Work Designations
                </button>
              </div>
            </div>

            <!-- Table Section -->
            <div class="p-5">
              <div class="overflow-x-auto rounded-lg border border-gray-100">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location
                      </th>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users
                      </th>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200" id="locations-table-body">
                    <!-- Locations will be populated by JavaScript -->
                  </tbody>
                </table>
              </div>

              <!-- Empty State -->
              <div id="locations-empty-state" class="text-center py-12 hidden">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                  <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 class="mt-3 text-sm font-medium text-gray-900">No locations</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by adding a new work location.</p>
                <div class="mt-6">
                  <button type="button"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd" />
                    </svg>
                    Designations
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showEditModal" class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative mx-4">
        <h2 class="text-xl font-bold mb-4">Edit Organization Info</h2>

        <!-- Organization Info Section -->
        <div class="overflow-x-auto">
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h2 class="text-xl font-semibold">{{ form.companyName }}</h2>
            <p class="text-gray-500">{{ form.companyType }}</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h3 class="text-sm text-gray-500">Organization ID</h3>
                <p>{{ form.orgId }}</p>
              </div>
              <div>
                <h3 class="text-sm text-gray-500">Founded</h3>
                <p>{{ form.founded }}</p>
              </div>
              <div>
                <h3 class="text-sm text-gray-500">Headquarters</h3>
                <p>{{ form.headquarters }}</p>
              </div>
              <div>
                <h3 class="text-sm text-gray-500">Employees</h3>
                <p>{{ form.employees }}</p>
              </div>
              <div>
                <h3 class="text-sm text-gray-500">Saga URL</h3>
                <p>{{ form.sagaUrl }}</p>
              </div>
              <div>
                <h3 class="text-sm text-gray-500">Website</h3>
                <p>{{ form.website }}</p>
              </div>
              <div>
                <h3 class="text-sm text-gray-500">Industry</h3>
                <p>{{ form.industry }}</p>
              </div>
            </div>

            <div class="mt-6 border-t pt-4">
              <h3 class="text-lg font-semibold mb-2">Contact Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 class="text-sm text-gray-500">Primary Email</h4>
                  <p>{{ form.primaryEmail }}</p>
                </div>
                <div>
                  <h4 class="text-sm text-gray-500">Phone</h4>
                  <p>{{ form.phone }}</p>
                </div>
                <div class="md:col-span-2">
                  <h4 class="text-sm text-gray-500">Address</h4>
                  <p>{{ form.address }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end mt-6">
          <button @click="closeEditModal" class="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save
          </button>
        </div>

        <!-- Optional Close Button -->
        <button @click="closeEditModal" class="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl">
          &times;
        </button>
      </div>
    </div>

  </section>
</template>

<script>
import { ref, inject } from 'vue'

export default {
  name: 'MyGroup',
  setup() {
  const showToast = inject('showToast')
  const openModal = inject('openModal')

  const activeTab = ref('group-list')
  const searchTerm = ref('')
  const activeGroupDropdown = ref(null)
  const showDetailsModal = ref(false)
  const selectedGroup = ref(null)

  const groupTabs = [
    { id: 'group-list', label: 'Organization Info' },
    { id: 'add-group', label: 'Work Location' },
    { id: 'owned-groups', label: 'Designations' }
  ]

  const showEditModal = ref(false)

  const form = ref({
    companyName: 'Acme Corporation',
    companyType: 'Technology Company',
    orgId: 'ORG-12345',
    founded: 'January 15, 2010',
    headquarters: 'New York, USA',
    employees: '1,250',
    sagaUrl: 'sagasoft.io',
    website: 'www.acmecorp.com',
    industry: 'Technology',
    primaryEmail: 'contact@acmecorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Avenue, New York, NY 10001, USA',
  })

  function openEditModal() {
    showEditModal.value = true
  }

  function closeEditModal() {
    showEditModal.value = false
  }

  return {
    activeTab,
    searchTerm,
    activeGroupDropdown,
    showDetailsModal,
    selectedGroup,
    groupTabs,
    showEditModal,
    openEditModal,
    closeEditModal,
    form,
  }
}

}
</script>
