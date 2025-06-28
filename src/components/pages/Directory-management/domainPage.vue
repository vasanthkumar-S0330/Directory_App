<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Domain Management</h1>
        <p class="text-gray-600">Manage your organization's domains and DNS settings</p>
      </div>
      <button
        @click="showAddDomainModal = true"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
      >
        <FontAwesomeIcon icon="plus-circle" />
        Add Domain
      </button>
    </div>

    <!-- Domain Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg border shadow-sm p-4">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <FontAwesomeIcon icon="globe" class="text-blue-600" />
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-500">Total Domains</p>
            <p class="text-2xl font-bold text-gray-900">{{ domains.length }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg border shadow-sm p-4">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <FontAwesomeIcon icon="check-circle" class="text-blue-600" />
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-500">Verified</p>
            <p class="text-2xl font-bold text-gray-900">{{ verifiedDomainsCount }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg border shadow-sm p-4">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <FontAwesomeIcon icon="clock" class="text-yellow-600" />
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-500">Pending</p>
            <p class="text-2xl font-bold text-gray-900">{{ pendingDomainsCount }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg border shadow-sm p-4">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <FontAwesomeIcon icon="envelope" class="text-blue-600" />
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-500">Mail Hosting</p>
            <p class="text-2xl font-bold text-gray-900">{{ mailDomainsCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg border shadow-sm">
      <div class="p-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 class="text-xl font-semibold">Registered Domains</h2>
          <div class="flex flex-col sm:flex-row gap-2">
            <div class="relative">
              <FontAwesomeIcon 
                icon="search" 
                class="absolute left-3 top-3 text-gray-500 text-sm"
              />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search domains..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <button
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 flex items-center gap-2 text-sm"
            >
              <FontAwesomeIcon icon="filter" class="text-sm" />
              Filter
            </button>
          </div>
        </div>
      </div>
      <div class="px-6 pb-6">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="border-b bg-blue-50">
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">DOMAIN NAME</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">CREATED TIME</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">STATUS</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">MAIL HOSTING</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">PRIMARY</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="domain in filteredDomains" :key="domain.id" class="border-b hover:bg-gray-50">
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <!-- <div class="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <FontAwesomeIcon icon="globe" class="text-blue-600 text-sm" />
                    </div> -->
                    <div>
                      <div class="text-sm font-medium">{{ domain.name }}</div>
                      <div class="text-xs text-gray-500">ID: {{ domain.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4 text-gray-600 text-sm">{{ domain.createdTime }}</td>
                <td class="py-3 px-4">
                  <span :class="{
                    'px-2 py-1 rounded-full font-medium text-xs': true,
                    'bg-green-100 text-green-800': domain.status === 'Verified',
                    'bg-yellow-100 text-yellow-800': domain.status === 'Pending',
                    'bg-red-100 text-red-800': domain.status === 'Failed'
                  }">
                    {{ domain.status }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <span :class="{
                    'px-2 py-1 rounded-full font-medium text-xs': true,
                    'bg-green-100 text-green-800': domain.mailHosting,
                    'bg-gray-100 text-gray-800': !domain.mailHosting
                  }">
                    {{ domain.mailHosting ? 'Enabled' : 'Disabled' }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <span :class="{
                    'px-2 py-1 rounded-full font-medium text-xs': true,
                    'bg-blue-100 text-blue-800': domain.primary,
                    'bg-gray-100 text-gray-800': !domain.primary
                  }">
                    {{ domain.primary ? 'Primary' : 'Secondary' }}
                  </span>
                </td>
                <td class="py-3 px-4 flex gap-2">
                  <button 
                    @click="editDomain(domain)"
                    class="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                  >
                    <FontAwesomeIcon icon="pen-to-square" class="text-sm" />
                  </button>
                  <button 
                    @click="confirmDeleteDomain(domain)"
                    class="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                  >
                    <FontAwesomeIcon icon="trash" class="text-sm" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <div class="mt-4 text-sm text-gray-500">
          Showing {{ filteredDomains.length }} of {{ domains.length }} domains
        </div> -->
      </div>
    </div>

    <!-- Add/Edit Domain Modal -->
    <div v-if="showAddDomainModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">{{ editingDomain ? 'Edit Domain' : 'Add New Domain' }}</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon="times" />
          </button>
        </div>
        <form @submit.prevent="saveDomain">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Domain Name</label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="example.com"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                v-model="form.status"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Mail Hosting</label>
                <p class="text-xs text-gray-500">Enable email services for this domain</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="form.mailHosting" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Primary Domain</label>
                <p class="text-xs text-gray-500">Set as organization's primary domain</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="form.primary" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          <div class="mt-6 flex justify-end gap-3">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {{ editingDomain ? 'Update' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Confirm Deletion</h3>
          <button @click="showDeleteModal = false" class="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon="times" />
          </button>
        </div>
        <p class="mb-6">Are you sure you want to delete domain <strong>{{ domainToDelete?.name }}</strong>?</p>
        <div class="flex justify-end gap-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="deleteDomain"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { 
//   faPlusCircle,
//   faPenToSquare,
//   faTrash,
//   faTimes,
//   faGlobe,
//   faCheckCircle,
//   faClock,
//   faEnvelope
// } from '@fortawesome/free-solid-svg-icons';

// State
const showAddDomainModal = ref(false);
const showDeleteModal = ref(false);
const searchQuery = ref('');
const domainToDelete = ref(null);
const editingDomain = ref(null);

// Form data
const form = ref({
  name: '',
  status: 'Verified',
  mailHosting: false,
  primary: false,
  createdTime: new Date().toLocaleDateString()
});

// Sample data
const domains = ref([
  {
    id: 'DOM-001',
    name: 'acmecorp.com',
    status: 'Verified',
    mailHosting: true,
    primary: true,
    createdTime: 'Jun 15, 2023'
  },
  {
    id: 'DOM-002',
    name: 'acme.io',
    status: 'Pending',
    mailHosting: false,
    primary: false,
    createdTime: 'Jun 20, 2023'
  },
  {
    id: 'DOM-003',
    name: 'acme.org',
    status: 'Verified',
    mailHosting: true,
    primary: false,
    createdTime: 'May 10, 2023'
  }
]);

// Computed
const filteredDomains = computed(() => {
  return domains.value.filter(domain => {
    return domain.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

const verifiedDomainsCount = computed(() => {
  return domains.value.filter(d => d.status === 'Verified').length;
});

const pendingDomainsCount = computed(() => {
  return domains.value.filter(d => d.status === 'Pending').length;
});

const mailDomainsCount = computed(() => {
  return domains.value.filter(d => d.mailHosting).length;
});

// Methods
const addNewDomain = () => {
  editingDomain.value = null;
  form.value = {
    name: '',
    status: 'Verified',
    mailHosting: false,
    primary: false,
    createdTime: new Date().toLocaleDateString()
  };
  showAddDomainModal.value = true;
};

const editDomain = (domain) => {
  editingDomain.value = domain;
  form.value = { ...domain };
  showAddDomainModal.value = true;
};

const confirmDeleteDomain = (domain) => {
  domainToDelete.value = domain;
  showDeleteModal.value = true;
};

const deleteDomain = () => {
  domains.value = domains.value.filter(d => d.id !== domainToDelete.value.id);
  showDeleteModal.value = false;
};

const saveDomain = () => {
  if (editingDomain.value) {
    // Update existing domain
    const index = domains.value.findIndex(d => d.id === editingDomain.value.id);
    domains.value[index] = { ...form.value, id: editingDomain.value.id };
  } else {
    // Add new domain
    const newId = `DOM-${String(domains.value.length + 1).padStart(3, '0')}`;
    domains.value.push({ ...form.value, id: newId });
  }
  closeModal();
};

const closeModal = () => {
  showAddDomainModal.value = false;
  showDeleteModal.value = false;
};

// Lifecycle
onMounted(() => {
  // You could load domains from API here
});
</script>