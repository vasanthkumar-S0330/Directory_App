<template>
  <div class="w-full space-y-4">
    <!-- Search Input -->
    <div class="relative">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Type a name..."
        class="w-full px-4 py-2 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        @input="handleSearch"
      />
      <div
        v-if="showDropdown && (searchResults.length > 0 || searchTerm)"
        class="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg"
      >
        <div class="max-h-60 overflow-y-auto">
          <div
            v-if="searchResults.length === 0 && searchTerm"
            class="p-2 text-gray-500 cursor-default"
          >
            No matches found
          </div>
          <div
            v-for="user in searchResults"
            :key="user.email"
            @click="selectUser(user)"
            class="p-2 hover:bg-gray-100 cursor-pointer"
          >
            {{ user.name }}
          </div>
        </div>
      </div>
    </div>

    <!-- Selected Members -->
    <div v-if="selectedMembers.length > 0">
      <label class="block text-sm font-medium text-gray-700 mb-2">Selected Members</label>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="member in selectedMembers"
          :key="member.email"
          class="flex-shrink-0 w-40 flex items-center justify-between p-2 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
        >
          <span class="font-medium truncate" :title="member.name">{{ member.name }}</span>
          <button
            @click="removeMember(member)"
            class="p-1 text-gray-500 hover:text-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'

export default {
  name: 'MemberSearch',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const searchTerm = ref('')
    const showDropdown = ref(false)
    const selectedMembers = ref([...props.modelValue])

    const allUsers = [
      { name: 'Alex Kim', email: 'alex.kim@example.com' },
      { name: 'Rachel Park', email: 'rachel.p@example.com' },
      { name: 'John Doe', email: 'john.doe@example.com' },
      { name: 'Jane Smith', email: 'jane.smith@example.com' },
      { name: 'Michael Brown', email: 'michael.brown@example.com' },
      { name: 'Emily Davis', email: 'emily.davis@example.com' }
    ]

    const searchResults = computed(() => {
      if (!searchTerm.value.trim()) return []
      
      return allUsers.filter(user =>
        !selectedMembers.value.some(m => m.email.toLowerCase() === user.email.toLowerCase()) &&
        user.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    })

    const handleSearch = () => {
      showDropdown.value = true
    }

    const selectUser = (user) => {
      selectedMembers.value.push(user)
      searchTerm.value = ''
      showDropdown.value = false
      emit('update:modelValue', selectedMembers.value)
    }

    const removeMember = (member) => {
      const index = selectedMembers.value.findIndex(m => m.email === member.email)
      if (index > -1) {
        selectedMembers.value.splice(index, 1)
        emit('update:modelValue', selectedMembers.value)
      }
    }

    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        showDropdown.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      searchTerm,
      showDropdown,
      selectedMembers,
      searchResults,
      handleSearch,
      selectUser,
      removeMember
    }
  }
}
</script>