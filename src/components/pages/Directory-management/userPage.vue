<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold text-gray-900">Users</h1>
      <button
        @click="openCreateModal"
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Create User
      </button>
    </div>

    <div class="bg-white rounded-lg border shadow-sm">
      <div class="p-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 class="text-xl font-semibold">User Management</h2>
          <div class="flex flex-col sm:flex-row gap-2">
            <div class="relative">
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Search users..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                @input="filterUsers"
              >
              <span class="absolute left-3 top-3 text-gray-500 text-sm">🔍</span>
            </div>
            <button
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 flex items-center gap-2 text-sm"
            >
              <span>🔧</span>
              Filter
            </button>
          </div>
        </div>
      </div>
      <div class="px-6 pb-6">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse" id="users-table">
            <thead>
              <tr class="border-b bg-blue-50">
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">NAME</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">EMAIL</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">DEPARTMENT</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">ROLE</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">STATUS</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id" class="border-b hover:bg-gray-50">
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <div class="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <span class="text-gray-500 text-sm">👤</span>
                    </div>
                    <div>
                      <div class="text-sm font-medium">{{ user.name }}</div>
                      <div class="text-xs text-gray-500">ID: {{ user.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4 text-gray-600 text-sm">{{ user.email }}</td>
                <td class="py-3 px-4 text-gray-600 text-sm">{{ user.department }}</td>
                <td class="py-3 px-4">
                  <span :class="{
                    'px-2 py-1 rounded-full font-medium text-xs': true,
                    'bg-purple-100 text-purple-800': user.role === 'Admin',
                    'bg-blue-100 text-blue-800': user.role === 'User'
                  }">
                    {{ user.role }}
                  </span>
                </td>
                <td class="py-3 px-4">
                  <span :class="{
                    'px-2 py-1 rounded-full font-medium text-xs': true,
                    'bg-green-100 text-green-800': user.status === 'Active',
                    'bg-red-100 text-red-800': user.status === 'Inactive'
                  }">
                    {{ user.status }}
                  </span>
                </td>
                <td class="py-3 px-4 flex gap-2">
                  <button @click="openEditModal(user)" class="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50">
                    <span class="text-sm">✏️</span>
                  </button>
                  <button @click="confirmDelete(user.id)" class="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50">
                    <span class="text-sm">🗑️</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <div class="mt-4 text-sm text-gray-500">
          Showing {{ filteredUsers.length }} of {{ users.length }} users
        </div> -->
      </div>
    </div>

    <!-- Create/Edit User Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative mx-4">
        <h2 class="text-xl font-semibold mb-4">{{ editingUserId ? 'Edit' : 'Create' }} User</h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name*</label>
            <input v-model="userForm.name" type="text" class="w-full mt-1 px-3 py-2 border rounded-md text-sm" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email*</label>
            <input v-model="userForm.email" type="email" class="w-full mt-1 px-3 py-2 border rounded-md text-sm" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Department</label>
            <input v-model="userForm.department" type="text" class="w-full mt-1 px-3 py-2 border rounded-md text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Role*</label>
            <select v-model="userForm.role" class="w-full mt-1 px-3 py-2 border rounded-md text-sm" required>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Status*</label>
            <select v-model="userForm.status" class="w-full mt-1 px-3 py-2 border rounded-md text-sm" required>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end mt-6">
          <button @click="closeModal" class="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button @click="saveUser" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {{ editingUserId ? 'Update' : 'Save' }}
          </button>
        </div>

        <!-- Close Icon -->
        <button @click="closeModal" class="absolute top-2 right-3 text-gray-600 text-2xl hover:text-black">
          &times;
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative mx-4">
        <h2 class="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p class="mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
        
        <div class="flex justify-end">
          <button @click="showDeleteModal = false" class="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button @click="deleteUser" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const showModal = ref(false);
const showDeleteModal = ref(false);
const editingUserId = ref(null);
const userToDeleteId = ref(null);
const searchQuery = ref('');

// Sample user data with duplicates
const users = ref([
  {
    id: 'USR-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    department: 'Engineering',
    role: 'Admin',
    status: 'Active'
  },
  {
    id: 'USR-002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    department: 'Marketing',
    role: 'User',
    status: 'Active'
  },

  {
    id: 'USR-006',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    department: 'Operations',
    role: 'User',
    status: 'Inactive'
  }
]);

const userForm = ref({
  name: '',
  email: '',
  department: '',
  role: 'User',
  status: 'Active'
});

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  const query = searchQuery.value.toLowerCase();
  return users.value.filter(user => 
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    user.department.toLowerCase().includes(query) ||
    user.role.toLowerCase().includes(query) ||
    user.status.toLowerCase().includes(query)
  );
});

function openCreateModal() {
  editingUserId.value = null;
  userForm.value = {
    name: '',
    email: '',
    department: '',
    role: 'User',
    status: 'Active'
  };
  showModal.value = true;
}

function openEditModal(user) {
  editingUserId.value = user.id;
  userForm.value = { ...user };
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

function saveUser() {
  if (!userForm.value.name || !userForm.value.email) {
    alert('Please fill in at least Name and Email');
    return;
  }

  if (editingUserId.value) {
    // Update existing user
    const index = users.value.findIndex(u => u.id === editingUserId.value);
    if (index !== -1) {
      users.value[index] = { ...userForm.value, id: editingUserId.value };
    }
  } else {
    // Create new user
    const id = 'USR-' + String(users.value.length + 1).padStart(3, '0');
    users.value.push({ ...userForm.value, id });
  }
  closeModal();
}

function confirmDelete(userId) {
  userToDeleteId.value = userId;
  showDeleteModal.value = true;
}

function deleteUser() {
  users.value = users.value.filter(user => user.id !== userToDeleteId.value);
  showDeleteModal.value = false;
}

function filterUsers() {
  // The computed property filteredUsers will automatically update
}
</script>