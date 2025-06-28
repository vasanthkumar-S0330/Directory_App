<template>
  <li>
    <button
      @click="toggleDropdown"
      class="nav-button w-full flex items-center justify-between p-3 rounded-lg transition-colors group"
      :class="isDropdownActive ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-700'"
    >
      <div class="flex items-center">
        <i :class="[
          icon,
          'w-5 text-center mr-3 transition-colors',
          isDropdownActive ? 'text-primary-500' : 'text-neutral-400 group-hover:text-primary-500'
        ]"></i>
        <span>{{ title }}</span>
      </div>
      <i class="fas fa-chevron-down text-xs transition-transform duration-200"
        :class="{'transform rotate-180': isOpen}"></i>
    </button>
    
    <!-- Dropdown Menu -->
    <ul v-show="isOpen" class="ml-8 mt-1 space-y-1">
      <li v-for="item in items" :key="item.route">
        <router-link
          :to="item.route"
          @click="$emit('close-mobile-menu')"
          :class="[
            'nav-button w-full flex items-center p-3 rounded-lg transition-colors group',
            currentRoute === item.name 
              ? 'bg-primary-50 text-primary-700' 
              : 'text-neutral-700 hover:bg-primary-50 hover:text-primary-700'
          ]"
        >
          <i :class="[
            item.icon,
            'w-5 text-center mr-3 transition-colors',
            currentRoute === item.name 
              ? 'text-primary-500' 
              : 'text-neutral-400 group-hover:text-primary-500'
          ]"></i>
          <span>{{ item.label }}</span>
        </router-link>
      </li>
    </ul>
  </li>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'DropdownSection',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true,
      default: () => [] // Provide default empty array
    },
    currentRoute: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const isOpen = ref(false)

    const isDropdownActive = computed(() => {
      // Add null check for props.items
      return props.items && props.items.some(item => item.name === props.currentRoute)
    })

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }

    return {
      isOpen,
      isDropdownActive,
      toggleDropdown
    }
  }
}
</script>