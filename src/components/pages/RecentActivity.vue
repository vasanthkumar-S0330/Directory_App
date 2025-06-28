<template>


  <section class="space-y-6 animate-fade-in">
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Filter Activities</h3>
      </div>
      
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
            <select
              v-model="selectedType"
              @change="filterActivities"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Types</option>
              <option value="login">Login/Logout</option>
              <option value="app">App Access</option>
              <option value="group">Group Changes</option>
              <option value="profile">Profile Updates</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              v-model="selectedDateRange"
              @change="filterActivities"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="selectedStatus"
              @change="filterActivities"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Status</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <p class="text-sm text-gray-500 mt-1">Track your recent actions and system events</p>
      </div>
      
      <div class="p-6">
        <!-- Activity Timeline -->
        <div class="flow-root">
          <ul class="-mb-8">
            <li v-for="(activity, index) in recentActivities" :key="activity.id">
              <div class="relative pb-8">
                <span 
                  v-if="index !== recentActivities.length - 1"
                  class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                ></span>
                <div class="relative flex space-x-3">
                  <div>
                    <span :class="[
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' :
                      activity.type === 'error' ? 'bg-red-500' :
                      'bg-blue-500'
                    ]">
                      <i :class="[activity.icon, 'h-4 w-4 text-white']"></i>
                    </span>
                  </div>
                  <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p class="text-sm text-gray-900">
                        {{ activity.message }}
                        <span v-if="activity.target" class="font-medium text-gray-900">{{ activity.target }}</span>
                      </p>
                      <p v-if="activity.details" class="text-sm text-gray-500">{{ activity.details }}</p>
                    </div>
                    <div class="text-right text-sm whitespace-nowrap text-gray-500">
                      <time :datetime="activity.timestamp">{{ activity.timeAgo }}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Load More -->
        <div class="mt-6 text-center">
          <button
            @click="loadMoreActivities"
            class="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 border border-primary-300 rounded-md hover:bg-primary-50 transition-colors"
          >
            Load More Activities
          </button>
        </div>
      </div>
    </div>

    <!-- Activity Filters -->
    <!-- <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Filter Activities</h3>
      </div>
      
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
            <select
              v-model="selectedType"
              @change="filterActivities"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Types</option>
              <option value="login">Login/Logout</option>
              <option value="app">App Access</option>
              <option value="group">Group Changes</option>
              <option value="profile">Profile Updates</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              v-model="selectedDateRange"
              @change="filterActivities"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="selectedStatus"
              @change="filterActivities"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Status</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>
      </div>
    </div> -->
  </section>
</template>

<script>
import { ref, inject } from 'vue'

export default {
  name: 'RecentActivity',
  setup() {
    const showToast = inject('showToast')
    
    const selectedType = ref('')
    const selectedDateRange = ref('all')
    const selectedStatus = ref('')

    const allActivities = [
      {
        id: 1,
        type: 'success',
        icon: 'fas fa-sign-in-alt',
        message: 'Successfully logged in to',
        target: 'Document Portal',
        details: 'Session started from Chrome browser',
        timestamp: '2025-01-15T10:30:00Z',
        timeAgo: '2 hours ago',
        category: 'login'
      },
      {
        id: 2,
        type: 'success',
        icon: 'fas fa-user-plus',
        message: 'Added to group',
        target: 'Development Team',
        details: 'Invited by Sarah Johnson',
        timestamp: '2025-01-15T09:15:00Z',
        timeAgo: '3 hours ago',
        category: 'group'
      },
      {
        id: 3,
        type: 'success',
        icon: 'fas fa-download',
        message: 'Installed new application',
        target: 'Analytics Dashboard',
        details: 'Version 2.1.0 installed successfully',
        timestamp: '2025-01-14T16:45:00Z',
        timeAgo: '1 day ago',
        category: 'app'
      },
      {
        id: 4,
        type: 'warning',
        icon: 'fas fa-exclamation-triangle',
        message: 'Access request pending for',
        target: 'HR Management System',
        details: 'Waiting for manager approval',
        timestamp: '2025-01-14T14:20:00Z',
        timeAgo: '1 day ago',
        category: 'app'
      },
      {
        id: 5,
        type: 'success',
        icon: 'fas fa-edit',
        message: 'Profile information updated',
        target: '',
        details: 'Changed job title and contact information',
        timestamp: '2025-01-13T11:30:00Z',
        timeAgo: '2 days ago',
        category: 'profile'
      },
      {
        id: 6,
        type: 'error',
        icon: 'fas fa-times-circle',
        message: 'Failed to access',
        target: 'Financial Reports',
        details: 'Insufficient permissions',
        timestamp: '2025-01-13T09:00:00Z',
        timeAgo: '2 days ago',
        category: 'app'
      },
      {
        id: 7,
        type: 'success',
        icon: 'fas fa-sign-out-alt',
        message: 'Logged out from',
        target: 'All Sessions',
        details: 'Manual logout initiated',
        timestamp: '2025-01-12T18:00:00Z',
        timeAgo: '3 days ago',
        category: 'login'
      },
      {
        id: 8,
        type: 'success',
        icon: 'fas fa-user-cog',
        message: 'Security settings updated',
        target: '',
        details: 'Two-factor authentication enabled',
        timestamp: '2025-01-12T15:30:00Z',
        timeAgo: '3 days ago',
        category: 'profile'
      }
    ]

    const recentActivities = ref([...allActivities])

    const filterActivities = () => {
      let filtered = [...allActivities]
      
      if (selectedType.value) {
        filtered = filtered.filter(activity => activity.category === selectedType.value)
      }
      
      if (selectedStatus.value) {
        filtered = filtered.filter(activity => activity.type === selectedStatus.value)
      }
      
      // Date filtering would be implemented here
      if (selectedDateRange.value !== 'all') {
        // Implementation would filter based on timestamp
      }
      
      recentActivities.value = filtered
    }

    const loadMoreActivities = () => {
      // Simulate loading more activities
      showToast('Loading more activities...', 'info')
      
      // In a real app, you would fetch more data from an API
      setTimeout(() => {
        showToast('No more activities to load', 'warning')
      }, 1000)
    }

    return {
      selectedType,
      selectedDateRange,
      selectedStatus,
      recentActivities,
      filterActivities,
      loadMoreActivities
    }
  }
}
</script>