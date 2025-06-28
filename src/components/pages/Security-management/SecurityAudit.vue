<template>
  <div class="bg-white p-4 rounded-lg shadow-sm">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-semibold text-gray-800">Security Audit Logs</h2>
      <div class="flex gap-2">
        <input
          type="date"
          v-model="filterDate"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
        />
        <!-- <button
          @click="filterLogs"
          class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Filter
        </button> -->

        <button
        @click="filterLogs"
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        filter
      </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-blue-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Timestamp
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Event Type
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              IP Address
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Details
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(log, index) in filteredLogs" :key="index" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatDate(log.timestamp) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ log.eventType }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ log.user }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ log.ipAddress }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ log.details }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span :class="log.status === 'Success' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'">
                {{ log.status }}
              </span>
            </td>
          </tr>
          <tr v-if="filteredLogs.length === 0">
            <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
              No logs found for selected date.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Mock logs
const logs = ref([
  {
    timestamp: '2025-06-06T10:30:00',
    eventType: 'Login Attempt',
    user: 'admin',
    ipAddress: '192.168.1.1',
    details: 'Successful login',
    status: 'Success'
  },
  {
    timestamp: '2025-06-06T09:15:00',
    eventType: 'Password Change',
    user: 'john_doe',
    ipAddress: '192.168.1.100',
    details: 'Changed password from user settings',
    status: 'Success'
  },
  {
    timestamp: '2025-06-05T16:42:00',
    eventType: 'Failed Login',
    user: 'mark_twain',
    ipAddress: '10.0.0.25',
    details: 'Incorrect password',
    status: 'Failed'
  }
])

const filterDate = ref('')
const filteredLogs = computed(() => {
  if (!filterDate.value) return logs.value
  return logs.value.filter((log) =>
    log.timestamp.startsWith(filterDate.value)
  )
})

function filterLogs() {
  // Computed property will auto-update
}

function formatDate(dateTime) {
  const date = new Date(dateTime)
  return date.toLocaleString()
}
</script>