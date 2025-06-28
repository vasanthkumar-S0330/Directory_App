<template>
  <header class="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-20">
    <div class="flex items-center justify-between px-4 py-3">
      <div class="flex items-center">
        <h1 class="text-xl font-semibold text-neutral-800">
          <!-- {{ title }} -->
        </h1>
      </div>
      
      <!-- User Menu (if needed) -->
      <div class="flex items-center space-x-4">
        <!-- Notifications -->
        <button class="text-neutral-500 hover:text-neutral-700 relative">
          <i class="fas fa-bell text-xl"></i>
          <span class="absolute -top-1 -right-1 h-3 w-3 bg-error-500 rounded-full"></span>
        </button>
        
        <!-- User Avatar -->
        <div class="relative">
          <button
            @click="toggleUserMenu"
            class="flex items-center space-x-2 text-neutral-700 hover:text-neutral-900"
          >
            <img
              src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1"
              alt="User"
              class="h-8 w-8 rounded-full object-cover"
            />
          </button>
          
          <!-- User Dropdown -->
          <div
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10"
          >
            <a href="#" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">Profile</a>
            <a href="#" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">Settings</a>
            <hr class="my-1">
            <a href="#" class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">Sign out</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Topbar',
  props: {
    title: {
      type: String,
      default: 'Dashboard'
    }
  },
  setup() {
    const showUserMenu = ref(false)

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value
    }

    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        showUserMenu.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      showUserMenu,
      toggleUserMenu
    }
  }
}
</script>