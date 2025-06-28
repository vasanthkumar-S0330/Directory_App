<template>
  <PageLayout 
    title="Calendar Admin Settings" 
    subtitle="Configure calendar admin settings"
  >
    <div v-if="currentView === 'settings'" class="space-y-6">
      <!-- Add Calendar Button -->
      <div class="flex justify-end mb-4">
        <button 
          @click="currentView = 'add-calendar'"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add Calendar
        </button>
      </div>
      
      <!-- Calendar Sections -->
      <div class="bg-white rounded-lg shadow-sm">
    <div class="p-6">
      <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-neutral-900">Calendar</h3>
            <!-- <p class="text-sm text-neutral-500">Applications are permanently deleted after 30 days</p> -->
          </div>
      <div class="space-y-4">
        <!-- Holidays Section -->
        <div class="border border-gray-200 rounded-lg overflow-hidden dark:border-gray-700">
          <div 
            @click="toggleSection('holidays')"
            class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors dark:hover:bg-gray-700"
          >
            <div class="flex items-center gap-3">
              <input 
                v-model="sections.holidays.checked"
                type="checkbox" 
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                @click.stop
              >
              <h2 class="text-lg font-medium text-gray-700 dark:text-gray-300">Holidays</h2>
            </div>
            <div class="flex items-center">
              <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Apply
              </button>
              <svg 
                :class="['w-5 h-5 ml-3 text-gray-500 transform transition-transform', sections.holidays.expanded ? 'rotate-180' : '']"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
          
          <div v-if="sections.holidays.expanded" class="px-4 pb-4">
            <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-600">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th class="w-10 px-4 py-3">
                      <input type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Holiday
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th class="relative px-4 py-3">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-600">
                  <tr v-for="holiday in holidays" :key="holiday.id">
                    <td class="px-4 py-3">
                      <input type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                    </td>
                    <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {{ holiday.name }}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {{ holiday.date }}
                    </td>
                    <td class="px-4 py-3 text-right text-sm font-medium">
                      <div class="relative">
                        <button 
                          @click="toggleActionMenu(holiday.id)"
                          class="text-gray-400 hover:text-gray-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                        <!-- <div 
                          v-if="activeActionMenu === holiday.id"
                          class="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200 dark:bg-gray-800 dark:border-gray-600"
                        >
                          <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Add</button>
                          <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Edit</button>
                          <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Delete</button>
                        </div> -->
                      </div>
                      
                    </td>
                    <div 
                          v-if="activeActionMenu === holiday.id"
                          class="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200 dark:bg-gray-800 dark:border-gray-600"
                        >
                          <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Add</button>
                          <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Edit</button>
                          <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Delete</button>
                        </div>
              
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Events Section -->
        <div class="border border-gray-200 rounded-lg overflow-hidden dark:border-gray-700">
          <div 
            @click="toggleSection('events')"
            class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors dark:hover:bg-gray-700"
          >
            <div class="flex items-center gap-3">
              <input 
                v-model="sections.events.checked"
                type="checkbox" 
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                @click.stop
              >
              <h2 class="text-lg font-medium text-gray-700 dark:text-gray-300">Events</h2>
            </div>
            <div class="flex items-center">
              <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Apply
              </button>
              <svg 
                :class="['w-5 h-5 ml-3 text-gray-500 transform transition-transform', sections.events.expanded ? 'rotate-180' : '']"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>

          <div v-if="sections.events.expanded" class="px-4 pb-4">
            <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-600">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th class="w-10 px-4 py-3">
                      <input type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-6">
                    </th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date End</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th class="relative px-4 py-3">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-600">
                  <tr v-for="event in events" :key="event.id">
                    <td class="px-4 py-3">
                      <input type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {{ formatDate(event.startDate) }}
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {{ event.endDate ? formatDate(event.endDate) : 'N/A' }}
                    </td>
                    <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {{ event.title }}
                    </td>
                    <td class="px-4 py-3 text-right text-sm font-medium">
                      <div class="relative">
                        <button 
                          @click="toggleActionMenu(`event-${event.id}`)"
                          class="text-gray-400 hover:text-gray-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                        
                      </div>
                      <div 
                          v-if="activeActionMenu === `event-${event.id}`"
                          class="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200 dark:bg-gray-800 dark:border-gray-600 mr-4"
                        >
                          <button @click="editEvent(event)" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Edit</button>
                          <button @click="deleteEvent(event.id)" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Delete</button>
                        </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>

    <!-- Add Calendar Form -->
    <div v-else-if="currentView === 'add-calendar'" class="space-y-6">
      <div class="flex gap-2 justify-end mb-4">
        <button 
          @click="currentView = 'settings'"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Back to Settings
        </button>
        <button 
          @click="saveCalendar"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Save Calendar
        </button>
      </div>

      <div class="bg-white rounded-lg p-5 shadow dark:bg-gray-800">
        <!-- Header Buttons -->
        <div class="flex flex-wrap gap-2 mb-6">
          <button 
            @click="showEventModal = true"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Add Event
          </button>
          <button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
            Export Events
          </button>
          <button class="px-4 py-2 border border-gray-300 text-blue-500 rounded hover:bg-gray-100 transition-colors">
            Upload Calendar
          </button>
          <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
            Delete
          </button>
        </div>

        <!-- Form Controls -->
        <div class="space-y-4 mb-6">
          <div class="flex flex-wrap items-center gap-4">
            <label class="font-medium text-gray-700 dark:text-gray-300">Timezone:</label>
            <select 
              v-model="selectedTimezone"
              class="px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="+05:30">+05:30 India Standard Time</option>
              <option value="+00:00">+00:00 UTC</option>
              <option value="-05:00">-05:00 Eastern Time</option>
              <option value="-08:00">-08:00 Pacific Time</option>
            </select>
          </div>

          <div class="flex flex-wrap items-center gap-4">
            <label class="font-medium text-gray-700 dark:text-gray-300">File Name:</label>
            <input 
              v-model="fileName"
              type="text" 
              class="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
            />
          </div>

          <div class="flex flex-wrap items-center gap-4">
            <label class="font-medium text-gray-700 dark:text-gray-300">Date Format:</label>
            <select 
              v-model="dateFormat"
              class="px-4 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>

        <!-- Events Table -->
        <div class="border border-gray-200 rounded-lg overflow-hidden dark:border-gray-600">
          <div class="grid grid-cols-5 gap-4 items-center px-4 py-2 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300">
            <div>All</div>
            <div class="cursor-pointer flex items-center gap-1 hover:text-blue-500 transition-colors">Date</div>
            <div>Date End</div>
            <div>Title</div>
            <div>
              <input 
                v-model="filterText"
                type="text" 
                placeholder="Filter" 
                class="px-2 py-1 border border-gray-300 rounded w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
              />
            </div>
          </div>
          
          <div class="min-h-[300px]">
            <div v-if="filteredEvents.length === 0" class="flex flex-col items-center justify-center min-h-[300px] text-gray-500 italic">
              No events found. Click "Add Event" to create your first event.
            </div>
            <table v-else class="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-600">
                <tr v-for="event in filteredEvents" :key="event.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td class="px-4 py-3 whitespace-nowrap">
                    <input type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {{ formatDate(event.startDate) }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {{ event.endDate ? formatDate(event.endDate) : 'N/A' }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {{ event.title }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      @click="deleteEvent(event.id)"
                      class="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Modal -->
    <EventModal
      :show="showEventModal"
      :event="editingEvent"
      @close="closeEventModal"
      @save="saveEvent"
    />
  </PageLayout>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
// import PageLayout from '../components/PageLayout.vue'
import PageLayout from '@/components/PageLayout.vue'
import EventModal from '@/components/EventModal.vue'
// import EventModal from '../components/EventModal.vue'

const currentView = ref('settings')
const showEventModal = ref(false)
const editingEvent = ref(null)
const activeActionMenu = ref(null)
const selectedTimezone = ref('+05:30')
const fileName = ref('Ak')
const dateFormat = ref('MM/DD/YYYY')
const filterText = ref('')

const sections = reactive({
  holidays: { expanded: false, checked: false },
  events: { expanded: false, checked: false }
})

const holidays = reactive([
  { id: 1, name: "New Year's Day", date: "January 1, 2025" },
  { id: 2, name: "Independence Day", date: "July 4, 2025" }
])

const events = reactive([
  { 
    id: 1, 
    title: 'Team Meeting', 
    startDate: '2025-01-15T10:00', 
    endDate: '2025-01-15T11:00',
    description: 'Weekly team sync'
  },
  { 
    id: 2, 
    title: 'Project Review', 
    startDate: '2025-01-20T14:00', 
    endDate: '2025-01-20T15:30',
    description: 'Quarterly project review'
  }
])

const filteredEvents = computed(() => {
  if (!filterText.value) return events
  return events.filter(event => 
    event.title.toLowerCase().includes(filterText.value.toLowerCase())
  )
})

const toggleSection = (sectionName) => {
  sections[sectionName].expanded = !sections[sectionName].expanded
}

const toggleActionMenu = (id) => {
  activeActionMenu.value = activeActionMenu.value === id ? null : id
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

const saveCalendar = () => {
  if (window.showToast) {
    window.showToast('Success', 'Calendar saved successfully!')
  }
  currentView.value = 'settings'
}

const editEvent = (event) => {
  editingEvent.value = { ...event }
  showEventModal.value = true
  activeActionMenu.value = null
}

const saveEvent = (eventData) => {
  if (editingEvent.value) {
    // Update existing event
    const index = events.findIndex(e => e.id === editingEvent.value.id)
    if (index > -1) {
      events[index] = { ...eventData, id: editingEvent.value.id }
    }
  } else {
    // Add new event
    const newEvent = {
      ...eventData,
      id: Date.now()
    }
    events.push(newEvent)
  }
  
  closeEventModal()
  if (window.showToast) {
    window.showToast('Success', 'Event saved successfully!')
  }
}

const deleteEvent = (eventId) => {
  if (confirm('Are you sure you want to delete this event?')) {
    const index = events.findIndex(e => e.id === eventId)
    if (index > -1) {
      events.splice(index, 1)
      if (window.showToast) {
        window.showToast('Success', 'Event deleted successfully!')
      }
    }
  }
  activeActionMenu.value = null
}

const closeEventModal = () => {
  showEventModal.value = false
  editingEvent.value = null
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    activeActionMenu.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
