<template>
  <section class="space-y-6 animate-fade-in">
    <!-- Primary Navigation -->
    <div class="bg-white rounded-xl flex items-center justify-between h-4 py-6 mb-4">
      <div class="flex items-center space-x-6">
        <nav class="flex space-x-1" aria-label="Tabs">
          <button
            v-for="tab in primaryTabs"
            :key="tab.id"
            @click="activePrimaryTab = tab.id"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
              activePrimaryTab === tab.id
                ? 'bg-primary-50 text-primary-700'
                : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50'
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Apps List Tab -->
    <div v-if="activePrimaryTab === 'apps-list'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="app in installedApps"
          :key="app.id"
          class="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center space-x-3">
            <div :class="['flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center text-xl', app.color]">
              <i :class="app.icon"></i>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-base font-medium text-neutral-900 truncate">{{ app.name }}</h3>
              <p class="text-sm text-neutral-500">{{ app.category }}</p>
            </div>
            <div class="relative">
              <button
                @click="toggleAppDropdown(app.id)"
                class="text-neutral-400 hover:text-neutral-700 focus:outline-none"
              >
                <i class="fas fa-ellipsis-v"></i>
              </button>
              <div
                v-if="activeAppDropdown === app.id"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10"
              >
                <a href="#" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">Edit Settings</a>
                <a href="#" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">View Details</a>
                <a href="#" @click="removeApp(app)" class="block px-4 py-2 text-sm text-error-600 hover:bg-neutral-100">Remove Access</a>
              </div>
            </div>
          </div>
          <div class="mt-4 flex justify-between items-center">
            <span :class="['text-xs px-2 py-1 rounded-full', app.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-neutral-100 text-neutral-700']">
              {{ app.status }}
            </span>
            <button
              @click="launchApp(app)"
              :class="[
                'px-4 py-1.5 text-sm rounded-md transition-colors',
                app.status === 'active'
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              ]"
            >
              {{ app.status === 'active' ? 'Launch' : 'Enable' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Apps Tab -->
    <div v-if="activePrimaryTab === 'add-app'" class="space-y-6">
      <!-- Secondary Navigation -->
      <div class="bg-white rounded-xl flex items-center justify-between h-4 py-6 mb-4">
        <div class="flex items-center space-x-6">
          <nav class="flex space-x-1">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="activeCategory = category.id"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                activeCategory === category.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              ]"
            >
              {{ category.label }}
            </button>
          </nav>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Search Bar -->
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search apps"
              class="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <!-- View Toggle -->
          <div class="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              @click="viewMode = 'grid'"
              :class="[
                'p-2 rounded-md transition-all duration-200',
                viewMode === 'grid' ? 'bg-white shadow-sm' : ''
              ]"
            >
              <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'p-2 rounded-md transition-all duration-200',
                viewMode === 'list' ? 'bg-white shadow-sm' : ''
              ]"
            >
              <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Apps Grid -->
      <div :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'">
        <AppCard
          v-for="app in filteredApps"
          :key="app.id"
          :app="app"
          @click="openAppModal"
          @action="quickInstall"
        />
      </div>
    </div>

    <!-- Deleted Apps Tab -->
    <div v-if="activePrimaryTab === 'deleted-apps'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-neutral-900">Recently Deleted Applications</h3>
            <p class="text-sm text-neutral-500">Applications are permanently deleted after 30 days</p>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-neutral-200">
              <thead class="bg-neutral-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Application</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Category</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Deleted On</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Days Left</th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-neutral-200">
                <tr v-for="app in deletedApps" :key="app.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500">
                        <i :class="app.icon"></i>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-neutral-900">{{ app.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-neutral-500">{{ app.category }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-neutral-500">{{ app.deletedOn }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 py-1 text-xs rounded-full',
                      app.daysLeft > 7 ? 'bg-warning-100 text-warning-800' : 'bg-error-100 text-error-800'
                    ]">
                      {{ app.daysLeft }} days left
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button @click="restoreApp(app)" class="text-primary-600 hover:text-primary-900 mr-3">Restore</button>
                    <button @click="permanentDeleteApp(app)" class="text-error-600 hover:text-error-900">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- App Modal -->
    <div v-if="showAppModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl max-w-md w-full p-6 animate-fade-in">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">{{ selectedApp?.name }}</h3>
          <button @click="closeAppModal" class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-4 mb-6" v-if="selectedApp">
          <div class="flex items-center space-x-4">
            <div :class="['w-16 h-16 rounded-xl flex items-center justify-center text-3xl', selectedApp.color]">
              {{ selectedApp.icon }}
            </div>
            <div>
              <h4 class="font-semibold text-gray-900">{{ selectedApp.name }}</h4>
              <p class="text-sm text-gray-500">{{ selectedApp.description }}</p>
            </div>
          </div>
          
          <p class="text-gray-700">{{ selectedApp.longDescription }}</p>
          
          <div class="flex items-center space-x-6 text-sm text-gray-500">
            <div class="flex items-center space-x-1">
              <div class="flex text-yellow-400">
                <span v-for="i in Math.floor(selectedApp.rating)" :key="i">★</span>
              </div>
              <span>{{ selectedApp.rating }}</span>
            </div>
            <div>{{ selectedApp.downloads }} downloads</div>
            <div class="flex items-center space-x-1">
              <div v-if="selectedApp.installed" class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{{ selectedApp.installed ? 'Installed' : 'Not installed' }}</span>
            </div>
          </div>
        </div>

        <div class="flex space-x-3">
          <button
            @click="installModalApp"
            :class="[
              'flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-white',
              selectedApp?.installed ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
            ]"
          >
            {{ selectedApp?.installed ? 'Open' : 'Install' }}
          </button>
          <button
            @click="closeAppModal"
            class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
// import AppCard from '../AppCard.vue'
// import App

export default {
  name: 'MySSOApps',
  components: {
    AppCard
  },
  setup() {
    const showToast = inject('showToast')
    
    const activePrimaryTab = ref('apps-list')
    const activeCategory = ref('all')
    const viewMode = ref('grid')
    const searchTerm = ref('')
    const activeAppDropdown = ref(null)
    const showAppModal = ref(false)
    const selectedApp = ref(null)

    const primaryTabs = [
      { id: 'apps-list', label: 'Apps List' },
      { id: 'add-app', label: 'Add App' },
      { id: 'deleted-apps', label: 'Deleted Apps' }
    ]

    const categories = [
      { id: 'all', label: 'All Apps' },
      { id: 'hr', label: 'HR' },
      { id: 'finance', label: 'Finance' },
      { id: 'marketing', label: 'Marketing' }
    ]

    const apps = ref([
      {
        id: 1,
        name: "PeoplePro",
        category: "hr",
        description: "Directory",
        longDescription: "Complete employee directory and organizational management system with advanced search and filtering capabilities.",
        icon: "👥",
        color: "bg-blue-100 text-blue-600",
        installed: false,
        rating: 4.8,
        downloads: "10K+"
      },
      {
        id: 2,
        name: "WorkNest",
        category: "hr",
        description: "Workplace",
        longDescription: "Modern workplace collaboration platform that brings teams together with integrated communication tools.",
        icon: "📊",
        color: "bg-green-100 text-green-600",
        installed: false,
        rating: 4.6,
        downloads: "25K+"
      },
      {
        id: 3,
        name: "HRMatrix",
        category: "hr",
        description: "Management",
        longDescription: "Comprehensive HR management solution for recruitment, performance tracking, and employee lifecycle management.",
        icon: "📋",
        color: "bg-orange-100 text-orange-600",
        installed: true,
        rating: 4.9,
        downloads: "50K+"
      },
      {
        id: 4,
        name: "FinanceFlow",
        category: "finance",
        description: "Accounting",
        longDescription: "Advanced accounting and financial management system with automated reporting and compliance features.",
        icon: "💰",
        color: "bg-green-100 text-green-600",
        installed: false,
        rating: 4.8,
        downloads: "30K+"
      },
      {
        id: 5,
        name: "BudgetPro",
        category: "finance",
        description: "Planning",
        longDescription: "Comprehensive budget planning and forecasting tool with scenario modeling and variance analysis.",
        icon: "📈",
        color: "bg-blue-100 text-blue-600",
        installed: false,
        rating: 4.6,
        downloads: "20K+"
      },
      {
        id: 6,
        name: "CampaignHub",
        category: "marketing",
        description: "Campaigns",
        longDescription: "Multi-channel marketing campaign management platform with automation and performance tracking.",
        icon: "🎯",
        color: "bg-pink-100 text-pink-600",
        installed: false,
        rating: 4.8,
        downloads: "40K+"
      },
      {
        id: 7,
        name: "SocialSync",
        category: "marketing",
        description: "Social Media",
        longDescription: "Social media management and scheduling tool with analytics and content calendar integration.",
        icon: "📱",
        color: "bg-purple-100 text-purple-600",
        installed: false,
        rating: 4.5,
        downloads: "22K+"
      }
    ])

    const installedApps = computed(() => 
      apps.value.filter(app => app.installed).map(app => ({
        ...app,
        status: 'active',
        icon: 'fas fa-file-alt'
      }))
    )

    const filteredApps = computed(() => {
      let filtered = apps.value

      if (activeCategory.value !== 'all') {
        filtered = filtered.filter(app => app.category === activeCategory.value)
      }

      if (searchTerm.value) {
        filtered = filtered.filter(app =>
          app.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          app.description.toLowerCase().includes(searchTerm.value.toLowerCase())
        )
      }

      return filtered
    })

    const deletedApps = ref([
      {
        id: 101,
        name: "Task Manager",
        category: "Productivity",
        deletedOn: "May 12, 2025",
        daysLeft: 21,
        icon: "fas fa-tasks"
      },
      {
        id: 102,
        name: "Team Chat",
        category: "Communication",
        deletedOn: "May 8, 2025",
        daysLeft: 17,
        icon: "fas fa-comments"
      },
      {
        id: 103,
        name: "Invoice Generator",
        category: "Finance",
        deletedOn: "April 20, 2025",
        daysLeft: 3,
        icon: "fas fa-file-invoice"
      }
    ])

    const toggleAppDropdown = (appId) => {
      activeAppDropdown.value = activeAppDropdown.value === appId ? null : appId
    }

    const openAppModal = (app) => {
      selectedApp.value = app
      showAppModal.value = true
    }

    const closeAppModal = () => {
      showAppModal.value = false
      selectedApp.value = null
    }

    const quickInstall = (app) => {
      app.installed = true
      showToast(`${app.name} installed successfully!`, 'success')
    }

    const installModalApp = () => {
      if (selectedApp.value) {
        if (selectedApp.value.installed) {
          showToast(`Opening ${selectedApp.value.name}...`, 'info')
        } else {
          selectedApp.value.installed = true
          showToast(`${selectedApp.value.name} installed successfully!`, 'success')
        }
      }
      closeAppModal()
    }

    const launchApp = (app) => {
      if (app.status === 'active') {
        showToast(`Launching ${app.name}...`, 'info')
      } else {
        app.status = 'active'
        showToast(`${app.name} enabled successfully!`, 'success')
      }
    }

    const removeApp = (app) => {
      app.installed = false
      showToast(`${app.name} access removed`, 'success')
    }

    const restoreApp = (app) => {
      deletedApps.value = deletedApps.value.filter(a => a.id !== app.id)
      showToast(`${app.name} restored successfully!`, 'success')
    }

    const permanentDeleteApp = (app) => {
      deletedApps.value = deletedApps.value.filter(a => a.id !== app.id)
      showToast(`${app.name} permanently deleted`, 'success')
    }

    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        activeAppDropdown.value = null
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      activePrimaryTab,
      activeCategory,
      viewMode,
      searchTerm,
      activeAppDropdown,
      showAppModal,
      selectedApp,
      primaryTabs,
      categories,
      apps,
      installedApps,
      filteredApps,
      deletedApps,
      toggleAppDropdown,
      openAppModal,
      closeAppModal,
      quickInstall,
      installModalApp,
      launchApp,
      removeApp,
      restoreApp,
      permanentDeleteApp
    }
  }
}
</script>