<template>
  <div class="bg-white p-4 rounded-lg shadow-sm">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-semibold text-gray-800">Role-Based Access Control</h2>
      <!-- <button
        @click="openAddModal"
        class="flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      > -->

       <button
        @click="openAddModal"
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Add Role
        
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-blue-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role Name
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Permissions
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Users Count
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(role, index) in roles" :key="index" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ role.name }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
              {{ role.permissions.join(', ') }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ role.userCount }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ role.created }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
              {{ role.status }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <button 
                @click="editRole(index)"
                class="text-blue-500 hover:text-blue-700 mr-3 focus:outline-none"
              >
                Edit
              </button>
              <button 
                @click="deleteRole(index)"
                class="text-red-500 hover:text-red-700 focus:outline-none"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          {{ editingIndex !== null ? 'Edit Role' : 'Add Role' }}
        </h3>
        <form @submit.prevent="saveRole" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
            <input
              type="text"
              v-model="newRole.name"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
            <div class="space-y-2">
              <label v-for="perm in allPermissions" :key="perm" class="flex items-center">
                <input 
                  type="checkbox" 
                  :value="perm" 
                  v-model="newRole.permissions" 
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span class="ml-2 text-sm text-gray-700">
                  {{ perm.charAt(0).toUpperCase() + perm.slice(1) }} Access
                </span>
              </label>
            </div>
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const editingIndex = ref(null)

const roles = ref([
  {
    name: 'Admin',
    permissions: ['read', 'write', 'delete', 'admin'],
    userCount: 2,
    created: '2025-06-01',
    status: 'Active',
  },
])

const newRole = ref({ name: '', permissions: [] })
const allPermissions = ['read', 'write', 'delete', 'admin']

function openAddModal() {
  newRole.value = { name: '', permissions: [] }
  editingIndex.value = null
  showModal.value = true
}

function editRole(index) {
  newRole.value = { ...roles.value[index] }
  editingIndex.value = index
  showModal.value = true
}

function deleteRole(index) {
  if (confirm('Are you sure you want to delete this role?')) {
    roles.value.splice(index, 1)
  }
}

function saveRole() {
  const roleData = {
    ...newRole.value,
    userCount: editingIndex.value !== null ? roles.value[editingIndex.value].userCount : 0,
    created: editingIndex.value !== null ? roles.value[editingIndex.value].created : new Date().toISOString().split('T')[0],
    status: 'Active',
  }

  if (editingIndex.value !== null) {
    roles.value[editingIndex.value] = roleData
  } else {
    roles.value.push(roleData)
  }

  closeModal()
}

function closeModal() {
  showModal.value = false
  editingIndex.value = null
  newRole.value = { name: '', permissions: [] }
}
</script>