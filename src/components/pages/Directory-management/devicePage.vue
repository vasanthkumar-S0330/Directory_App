<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Administrators</h1>
      <button
        @click="showAddAdminModal = true"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
      >
        <FontAwesomeIcon icon="plus-circle" />
        Add Admin
      </button>
    </div>

    <div class="bg-white rounded-lg border shadow-sm">
      <div class="p-6">
        <h2 class="text-xl font-semibold">Admin Management</h2>
      </div>
      
      <div class="px-6 pb-6 space-y-6">
        <div v-for="admin in admins" :key="admin.id" class="border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-4">
              <div class="flex-shrink-0 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-medium">
                {{ admin.initials }}
              </div>
              <div>
                <h3 class="font-semibold">{{ admin.name }}</h3>
                <p class="text-gray-600">{{ admin.email }}</p>
              </div>
            </div>
            <span :class="{
              'px-3 py-1 rounded-full text-sm font-medium': true,
              'bg-purple-100 text-purple-800': admin.role === 'Super Admin',
              'bg-blue-100 text-blue-800': admin.role === 'Limited Access',
              'bg-green-100 text-green-800': admin.role === 'Engineering Only'
            }">
              {{ admin.role }}
            </span>
          </div>
          
          <div class="mt-4 pl-16 space-y-2">
            <p class="text-sm text-gray-500">
              Last active: <span class="text-gray-700">{{ admin.lastActive }}</span>
            </p>
            
            <div class="flex gap-4 pt-2">
              <button 
                @click="editAdmin(admin)"
                class="text-green-600 hover:text-green-800 flex items-center gap-1 text-sm"
              >
                <FontAwesomeIcon icon="pen-to-square" class="text-sm" />
                Edit
              </button>
              <button 
                @click="showPermissions(admin)"
                class="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
              >
                <FontAwesomeIcon icon="key" class="text-sm" />
                Permissions
              </button>
            </div>
          </div>
        </div>
        
        <!-- Empty state for adding new admin -->
        <!-- <div 
          @click="showAddAdminModal = true"
          class="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <div class="flex flex-col items-center justify-center gap-2 text-gray-500">
            <FontAwesomeIcon icon="plus-circle" class="text-2xl" />
            <p class="font-medium">Add Admin</p>
          </div>
        </div> -->
      </div>
    </div>

    <!-- Add/Edit Admin Modal -->
    <div v-if="showAddAdminModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">{{ editingAdmin ? 'Edit Admin' : 'Add New Admin' }}</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon="times" />
          </button>
        </div>
        <form @submit.prevent="saveAdmin">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Access Level</label>
              <select
                v-model="form.role"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Limited Access">Limited Access</option>
                <option value="Engineering Only">Engineering Only</option>
              </select>
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
              {{ editingAdmin ? 'Update' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Permissions Modal -->
    <div v-if="showPermissionsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Permissions for {{ currentAdmin?.name }}</h3>
          <button @click="showPermissionsModal = false" class="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon="times" />
          </button>
        </div>
        
        <div class="space-y-3">
          <div v-for="permission in permissions" :key="permission.id" class="flex items-center justify-between">
            <div>
              <p class="font-medium">{{ permission.name }}</p>
              <p class="text-sm text-gray-500">{{ permission.description }}</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="permission.enabled" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end gap-3">
          <button
            @click="showPermissionsModal = false"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            @click="savePermissions"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { 
//   faPlusCircle,
//   faPenToSquare,
//   faKey,
//   faTimes
// } from '@fortawesome/free-solid-svg-icons';

// State
const showAddAdminModal = ref(false);
const showPermissionsModal = ref(false);
const editingAdmin = ref(null);
const currentAdmin = ref(null);

// Form data
const form = ref({
  name: '',
  email: '',
  role: 'Super Admin'
});

// Sample data
const admins = ref([
  {
    id: 1,
    initials: 'AJ',
    name: 'Alex Johnson',
    email: 'alex.j@acmecorp.com',
    role: 'Super Admin',
    lastActive: 'Today, 10:30 AM'
  },
  {
    id: 2,
    initials: 'SW',
    name: 'Sarah Williams',
    email: 'sarah.w@acmecorp.com',
    role: 'Limited Access',
    lastActive: 'Yesterday, 3:45 PM'
  },
  {
    id: 3,
    initials: 'DM',
    name: 'David Miller',
    email: 'david.m@acmecorp.com',
    role: 'Engineering Only',
    lastActive: 'May 20, 2023, 11:20 AM'
  }
]);

// Permissions data
const permissions = ref([
  {
    id: 1,
    name: 'User Management',
    description: 'Create, edit and delete users',
    enabled: true
  },
  {
    id: 2,
    name: 'Content Moderation',
    description: 'Approve or reject content',
    enabled: false
  },
  {
    id: 3,
    name: 'Analytics Access',
    description: 'View system analytics',
    enabled: true
  },
  {
    id: 4,
    name: 'System Settings',
    description: 'Change system configuration',
    enabled: false
  }
]);

// Methods
const addNewAdmin = () => {
  editingAdmin.value = null;
  form.value = {
    name: '',
    email: '',
    role: 'Super Admin'
  };
  showAddAdminModal.value = true;
};

const editAdmin = (admin) => {
  editingAdmin.value = admin;
  form.value = { ...admin };
  showAddAdminModal.value = true;
};

const showPermissions = (admin) => {
  currentAdmin.value = admin;
  showPermissionsModal.value = true;
};

const savePermissions = () => {
  // In a real app, you would save these permissions to your backend
  showPermissionsModal.value = false;
};

const saveAdmin = () => {
  if (editingAdmin.value) {
    // Update existing admin
    const index = admins.value.findIndex(a => a.id === editingAdmin.value.id);
    const initials = form.value.name.split(' ').map(n => n[0]).join('').toUpperCase();
    admins.value[index] = { 
      ...form.value, 
      id: editingAdmin.value.id,
      initials,
      lastActive: 'Just now'
    };
  } else {
    // Add new admin
    const initials = form.value.name.split(' ').map(n => n[0]).join('').toUpperCase();
    const newId = Math.max(...admins.value.map(a => a.id)) + 1;
    admins.value.push({ 
      ...form.value, 
      id: newId,
      initials,
      lastActive: 'Just now'
    });
  }
  closeModal();
};

const closeModal = () => {
  showAddAdminModal.value = false;
  showPermissionsModal.value = false;
};
</script>

<style scoped>
/* Custom styles if needed */
</style>