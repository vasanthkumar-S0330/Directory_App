<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold text-gray-900">Users</h1>
      <button
        @click="showEditModal = true"
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Create Users
      </button>
    </div>

    <div class="bg-white rounded-lg border shadow-sm">
      <div class="p-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 class="text-xl font-semibold">User Management</h2>
          <div class="flex flex-col sm:flex-row gap-2">
            <div class="relative">
              <FontAwesomeIcon 
                icon="search" 
                class="absolute left-3 top-3 text-gray-500 text-sm"
              />
              <input 
                type="text" 
                placeholder="Search users..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                id="user-search"
              >
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
              <tr v-for="user in users" :key="user.id" class="border-b hover:bg-gray-50">
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <div class="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <FontAwesomeIcon icon="user" class="text-gray-500 text-sm" />
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
                  <button class="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50">
                    <FontAwesomeIcon icon="pen-to-square" class="text-sm" />
                  </button>
                  <button class="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50">
                    <FontAwesomeIcon icon="trash" class="text-sm" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <div class="mt-4 text-sm text-gray-500" id="users-count">
          Showing {{ users.length }} users
        </div> -->
      </div>
    </div>
    <!-- Create User Modal -->
<div v-if="showEditModal" class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
  <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative mx-4">
    <h2 class="text-xl font-semibold mb-4">Create New User</h2>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input v-model="newUser.name" type="text" class="w-full mt-1 px-3 py-2 border rounded-md text-sm" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="newUser.email" type="email" class="w-full mt-1 px-3 py-2 border rounded-md text-sm" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Department</label>
        <input v-model="newUser.department" type="text" class="w-full mt-1 px-3 py-2 border rounded-md text-sm" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Role</label>
        <select v-model="newUser.role" class="w-full mt-1 px-3 py-2 border rounded-md text-sm">
          <option>User</option>
          <option>Admin</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Status</label>
        <select v-model="newUser.status" class="w-full mt-1 px-3 py-2 border rounded-md text-sm">
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex justify-end mt-6">
      <button @click="showEditModal = false" class="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400">
        Cancel
      </button>
      <button @click="createUser" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Save
      </button>
    </div>

    <!-- Close Icon -->
    <button @click="showEditModal = false" class="absolute top-2 right-3 text-gray-600 text-2xl hover:text-black">
      &times;
    </button>
  </div>
</div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { 
//   faSearch, 
//   faFilter, 
//   faPenToSquare, 
//   faTrash,
//   faUser
// } from '@fortawesome/free-solid-svg-icons';

const showEditModal = ref(false);

// Sample user data
const newUser = ref({
  name: '',
  email: '',
  department: '',
  role: 'User',
  status: 'Active'
});

function createUser() {
  if (newUser.value.name && newUser.value.email) {
    const id = 'USR-' + String(users.value.length + 1).padStart(3, '0');
    users.value.push({ id, ...newUser.value });
    showEditModal.value = false;
    // Reset the form
    newUser.value = {
      name: '',
      email: '',
      department: '',
      role: 'User',
      status: 'Active'
    };
  } else {
    alert('Please fill in at least Name and Email');
  }
}

</script>