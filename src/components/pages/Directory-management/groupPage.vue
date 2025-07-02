<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold text-gray-900">Groups</h1>
      <button
        @click="showEditModal = true"
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Create Group
      </button>
    </div>

    <div class="bg-white rounded-lg border shadow-sm">
      <div class="p-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 class="text-xl font-semibold">Group Management</h2>
          <div class="flex flex-col sm:flex-row gap-2">
            <div class="relative">
              <FontAwesomeIcon 
                icon="search" 
                class="absolute left-3 top-3 text-gray-500 text-sm"
              />
              <input 
                type="text" 
                placeholder="Search groups..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                id="group-search"
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
          <table class="w-full border-collapse" id="groups-table">
            <thead>
              <tr class="border-b bg-blue-50">
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">GROUP NAME</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">TYPE</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">MEMBERS</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">MODERATORS</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">CREATED</th>
                <th class="text-left py-3 px-4 font-medium text-gray-600 text-xs uppercase">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="group in groups" :key="group.id" class="border-b hover:bg-gray-50">
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <div class="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <FontAwesomeIcon icon="users" class="text-gray-500 text-sm" />
                    </div>
                    <div>
                      <div class="text-sm font-medium">{{ group.name }}</div>
                      <div class="text-xs text-gray-500">ID: {{ group.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4 text-gray-600 text-sm">{{ group.type }}</td>
                <td class="py-3 px-4 text-gray-600 text-sm">{{ group.memberCount }}</td>
                <td class="py-3 px-4 text-gray-600 text-sm">{{ group.moderatorCount }}</td>
                <td class="py-3 px-4 text-gray-600 text-sm">
                  {{ formatDate(group.createdDate) }}
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
      </div>
    </div>

    <!-- Create Group Modal -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative mx-4">
        <h2 class="text-xl font-semibold mb-4">Create New Group</h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Group Name</label>
            <input v-model="newGroup.name" type="text" class="w-full mt-1 px-3 py-2 border rounded-md text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Type</label>
            <select v-model="newGroup.type" class="w-full mt-1 px-3 py-2 border rounded-md text-sm">
              <option>Public</option>
              <option>Private</option>
              <option>Restricted</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Members</label>
            <input v-model="newGroup.memberCount" type="number" class="w-full mt-1 px-3 py-2 border rounded-md text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Moderators</label>
            <input v-model="newGroup.moderatorCount" type="number" class="w-full mt-1 px-3 py-2 border rounded-md text-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Created Date</label>
            <input v-model="newGroup.createdDate" type="date" class="w-full mt-1 px-3 py-2 border rounded-md text-sm" />
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <button @click="showEditModal = false" class="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button @click="createGroup" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save
          </button>
        </div>

        <button @click="showEditModal = false" class="absolute top-2 right-3 text-gray-600 text-2xl hover:text-black">
          &times;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showEditModal = ref(false);

// Sample group data
const groups = ref([
  {
    id: 'GRP-001',
    name: 'Administrators',
    type: 'Private',
    memberCount: 5,
    moderatorCount: 2,
    createdDate: '2023-01-15'
  },
  {
    id: 'GRP-002',
    name: 'Developers',
    type: 'Public',
    memberCount: 12,
    moderatorCount: 3,
    createdDate: '2023-02-20'
  },
  {
    id: 'GRP-003',
    name: 'Design Team',
    type: 'Restricted',
    memberCount: 8,
    moderatorCount: 1,
    createdDate: '2023-03-10'
  }
]);

const newGroup = ref({
  name: '',
  type: 'Public',
  memberCount: 0,
  moderatorCount: 0,
  createdDate: new Date().toISOString().split('T')[0]
});

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function createGroup() {
  if (newGroup.value.name) {
    const id = 'GRP-' + String(groups.value.length + 1).padStart(3, '0');
    groups.value.push({ 
      id, 
      ...newGroup.value,
      memberCount: parseInt(newGroup.value.memberCount) || 0,
      moderatorCount: parseInt(newGroup.value.moderatorCount) || 0
    });
    showEditModal.value = false;
    newGroup.value = {
      name: '',
      type: 'Public',
      memberCount: 0,
      moderatorCount: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };
  } else {
    alert('Please enter at least a Group Name');
  }
}
</script>