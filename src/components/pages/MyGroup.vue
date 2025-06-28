<template>
  <section class="space-y-6 animate-fade-in">
    <!-- Sub Navigation -->
    <div class="bg-white rounded-lg shadow-sm overflow-x-auto">
      <div class="p-1 min-w-max">
        <nav class="flex space-x-1" aria-label="Tabs">
          <button
            v-for="tab in groupTabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-md transition-colors',
              activeTab === tab.id
                ? 'bg-primary-50 text-primary-700'
                : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50'
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Group List Tab -->
    <div v-if="activeTab === 'group-list'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-neutral-900">All Groups</h3>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-search text-neutral-400"></i>
              </div>
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Search groups"
                class="pl-10 px-4 py-2 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-neutral-200">
              <thead class="bg-neutral-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Group Name</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Purpose</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Owner</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Members</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-neutral-200">
                <tr v-for="group in filteredGroups" :key="group.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div :class="['flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center', group.color]">
                        <i :class="group.icon"></i>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-neutral-900">{{ group.name }}</div>
                        <div class="text-xs text-neutral-500">{{ group.joinedDate }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-neutral-500">{{ group.purpose }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div :class="['text-sm', group.isOwner ? 'font-medium text-primary-600' : 'text-neutral-500']">
                      {{ group.owner }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-neutral-500">{{ group.memberCount }} members</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 py-1 text-xs rounded-full',
                      group.status === 'member' ? 'bg-success-100 text-success-800' :
                      group.status === 'owner' ? 'bg-primary-100 text-primary-800' :
                      'bg-neutral-100 text-neutral-800'
                    ]">
                      {{ group.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button @click="viewGroupDetails(group)" class="text-primary-600 hover:text-primary-900">
                      View Details
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Group Tab -->
    <div v-if="activeTab === 'add-group'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6 space-y-6">
          <div class="max-w-2xl">
            <h3 class="text-lg font-medium text-neutral-900 mb-4">Create New Group</h3>

            <form @submit.prevent="createGroup" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Group Name</label>
                <input
                  v-model="newGroup.name"
                  type="text"
                  class="w-full px-4 py-2 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="e.g., Project Alpha Team"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                <textarea
                  v-model="newGroup.description"
                  rows="3"
                  class="w-full px-4 py-2 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Describe the purpose and activities of this group..."
                  required
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Visibility</label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label class="border border-neutral-300 rounded-md p-4 hover:border-primary-500 cursor-pointer block">
                    <div class="flex items-center space-x-2">
                      <input
                        v-model="newGroup.visibility"
                        value="public"
                        type="radio"
                        class="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <div>
                        <p class="text-sm font-medium text-neutral-900">Public</p>
                        <p class="text-xs text-neutral-500">Anyone in the organization can see and join</p>
                      </div>
                    </div>
                  </label>

                  <label class="border border-neutral-300 rounded-md p-4 hover:border-primary-500 cursor-pointer block">
                    <div class="flex items-center space-x-2">
                      <input
                        v-model="newGroup.visibility"
                        value="private"
                        type="radio"
                        class="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <div>
                        <p class="text-sm font-medium text-neutral-900">Private</p>
                        <p class="text-xs text-neutral-500">Only invited members can see and join</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Member Search Component -->
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Add Members</label>
                <MemberSearch v-model="newGroup.members" />
              </div>

              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1">Group Owner Name</label>
                <input
                  v-model="newGroup.ownerName"
                  type="text"
                  class="w-full px-4 py-2 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="e.g., Manager Name"
                  required
                />
              </div>

              <div class="pt-4">
                <button
                  type="submit"
                  class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Other tabs content -->
    <div v-if="activeTab === 'owned-groups'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="group in ownedGroups"
          :key="group.id"
          class="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center space-x-3">
            <div :class="['flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-xl', group.color]">
              <i :class="group.icon"></i>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-base font-medium text-neutral-900 truncate">{{ group.name }}</h3>
              <p class="text-sm text-neutral-500">{{ group.purpose }}</p>
            </div>
            <div class="relative">
              <button
                @click="toggleGroupDropdown(group.id)"
                class="text-neutral-400 hover:text-neutral-700 focus:outline-none"
              >
                <i class="fas fa-ellipsis-v"></i>
              </button>
              <div
                v-if="activeGroupDropdown === group.id"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10"
              >
                <a href="#" @click="viewGroupDetails(group)" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">View Details</a>
                <a href="#" @click="editGroup(group)" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">Edit Group</a>
                <a href="#" @click="deleteGroup(group)" class="block px-4 py-2 text-sm text-error-600 hover:bg-neutral-100">Delete Group</a>
              </div>
            </div>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              Owner
            </span>
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">
              <i class="fas fa-users text-xs mr-1"></i> {{ group.memberCount }} members
            </span>
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">
              <i class="fas fa-clock text-xs mr-1"></i> Created {{ group.createdDate }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Group Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="border-b p-4 flex justify-between items-center">
          <h3 class="text-lg font-semibold text-neutral-900">Group Details</h3>
          <button @click="closeDetailsModal" class="text-neutral-400 hover:text-neutral-700">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="p-6" v-if="selectedGroup">
          <div class="mb-6">
            <h2 class="text-xl font-bold text-neutral-900 mb-2">{{ selectedGroup.name }}</h2>
            <p class="text-neutral-600">{{ selectedGroup.purpose }}</p>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p class="text-sm text-neutral-500">Your Role</p>
              <p class="font-medium">{{ selectedGroup.status }}</p>
            </div>
            <div>
              <p class="text-sm text-neutral-500">Created Date</p>
              <p class="font-medium">{{ selectedGroup.createdDate }}</p>
            </div>
            <div>
              <p class="text-sm text-neutral-500">Owner</p>
              <p class="font-medium">{{ selectedGroup.owner }}</p>
            </div>
            <div>
              <p class="text-sm text-neutral-500">Total Members</p>
              <p class="font-medium">{{ selectedGroup.memberCount }}</p>
            </div>
          </div>

          <div>
            <h3 class="font-medium text-neutral-900 mb-3">Members</h3>
            <div class="border rounded-lg overflow-hidden">
              <table class="min-w-full divide-y divide-neutral-200">
                <thead class="bg-neutral-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Name</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Role</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Joined</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-neutral-200">
                  <tr v-for="member in groupMembers" :key="member.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{{ member.name }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{{ member.role }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{{ member.joinedDate }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="border-t p-4 flex justify-end">
          <button
            @click="closeDetailsModal"
            class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import MemberSearch from '../MemberSearch.vue'

export default {
  name: 'MyGroup',
  components: {
    MemberSearch
  },
  setup() {
    const showToast = inject('showToast')
    const openModal = inject('openModal')
    
    const activeTab = ref('group-list')
    const searchTerm = ref('')
    const activeGroupDropdown = ref(null)
    const showDetailsModal = ref(false)
    const selectedGroup = ref(null)

    const groupTabs = [
      { id: 'group-list', label: 'Group List' },
      { id: 'add-group', label: 'Add Group' },
      { id: 'owned-groups', label: 'Groups I Own' },
      { id: 'member-groups', label: 'Groups I Am In' },
      { id: 'deleted-groups', label: 'Deleted Groups' }
    ]

    const newGroup = ref({
      name: '',
      description: '',
      visibility: 'public',
      members: [],
      ownerName: ''
    })

    const groups = ref([
      {
        id: 1,
        name: 'Development Team',
        purpose: 'Software Development',
        owner: 'Sarah Johnson',
        memberCount: 12,
        status: 'member',
        joinedDate: 'Joined: Jan 15, 2025',
        createdDate: 'January 15, 2025',
        color: 'bg-primary-100 text-primary-600',
        icon: 'fas fa-code',
        isOwner: false
      },
      {
        id: 2,
        name: 'Design Guild',
        purpose: 'UX/UI Design',
        owner: 'Michael Chen',
        memberCount: 8,
        status: 'member',
        joinedDate: 'Joined: Mar 3, 2025',
        createdDate: 'March 3, 2025',
        color: 'bg-secondary-100 text-secondary-600',
        icon: 'fas fa-paint-brush',
        isOwner: false
      },
      {
        id: 3,
        name: 'Customer Success',
        purpose: 'Customer Support',
        owner: 'You',
        memberCount: 7,
        status: 'owner',
        joinedDate: 'Owner',
        createdDate: 'February 1, 2025',
        color: 'bg-neutral-100 text-neutral-600',
        icon: 'fas fa-headset',
        isOwner: true
      }
    ])

    const groupMembers = ref([
      { id: 1, name: 'John Smith', role: 'Admin', joinedDate: 'Jan 15, 2023' },
      { id: 2, name: 'Sarah Johnson', role: 'Member', joinedDate: 'Jan 16, 2023' },
      { id: 3, name: 'Michael Brown', role: 'Member', joinedDate: 'Jan 17, 2023' },
      { id: 4, name: 'Emily Davis', role: 'Member', joinedDate: 'Jan 18, 2023' },
      { id: 5, name: 'David Wilson', role: 'Member', joinedDate: 'Jan 19, 2023' }
    ])

    const filteredGroups = computed(() => {
      if (!searchTerm.value) return groups.value
      
      return groups.value.filter(group =>
        group.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        group.purpose.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    })

    const ownedGroups = computed(() => 
      groups.value.filter(group => group.isOwner)
    )

    const toggleGroupDropdown = (groupId) => {
      activeGroupDropdown.value = activeGroupDropdown.value === groupId ? null : groupId
    }

    const viewGroupDetails = (group) => {
      selectedGroup.value = group
      showDetailsModal.value = true
      activeGroupDropdown.value = null
    }

    const closeDetailsModal = () => {
      showDetailsModal.value = false
      selectedGroup.value = null
    }

    const createGroup = () => {
      // Simulate group creation
      const group = {
        id: Date.now(),
        name: newGroup.value.name,
        purpose: newGroup.value.description,
        owner: 'You',
        memberCount: newGroup.value.members.length + 1,
        status: 'owner',
        joinedDate: 'Owner',
        createdDate: new Date().toLocaleDateString(),
        color: 'bg-accent-100 text-accent-600',
        icon: 'fas fa-star',
        isOwner: true
      }
      
      groups.value.push(group)
      
      // Reset form
      newGroup.value = {
        name: '',
        description: '',
        visibility: 'public',
        members: [],
        ownerName: ''
      }
      
      activeTab.value = 'group-list'
      showToast('Group created successfully!', 'success')
    }

    const editGroup = (group) => {
      showToast(`Edit functionality for ${group.name} would open here`, 'info')
    }

    const deleteGroup = (group) => {
      openModal({
        title: 'Delete Group',
        content: `Are you sure you want to delete "${group.name}"? This action cannot be undone.`,
        confirmText: 'Delete',
        confirmClass: 'bg-error-600 hover:bg-error-700',
        onConfirm: () => {
          groups.value = groups.value.filter(g => g.id !== group.id)
          showToast(`${group.name} deleted successfully`, 'success')
        }
      })
    }

    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        activeGroupDropdown.value = null
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      activeTab,
      searchTerm,
      activeGroupDropdown,
      showDetailsModal,
      selectedGroup,
      groupTabs,
      newGroup,
      groups,
      groupMembers,
      filteredGroups,
      ownedGroups,
      toggleGroupDropdown,
      viewGroupDetails,
      closeDetailsModal,
      createGroup,
      editGroup,
      deleteGroup
    }
  }
}
</script>