<template>
  <aside class="bg-white shadow-md z-30 w-full md:w-64 md:fixed md:h-full transition-all duration-300 ease-in-out">
    <!-- Header -->
    <div class="p-4 flex items-center justify-between md:justify-center border-b border-neutral-200">
      <div class="flex items-center space-x-3">
        <div class="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
          <i class="fas fa-folder"></i>
        </div>
        <span class="text-lg font-semibold">SagaID</span>
      </div>
      <button
        @click="toggleMobileMenu"
        class="md:hidden text-neutral-500 hover:text-neutral-800"
      >
        <i class="fas fa-bars text-xl"></i>
      </button>
    </div>

    <!-- Navigation Menu -->
    <nav :class="['p-4 h-[calc(100%-4rem)] overflow-y-auto scrollbar-thin', { 'hidden md:block': !showMobileMenu }]">
      <ul class="space-y-1">
        <li class="pb-2 mb-2 border-b border-neutral-200"></li>
        
        <!-- Account Home Dropdown -->
         <DropdownSection 
          title="Msp Org"
          icon="fas fa-infinity"
          :items="mspItems"
          :currentRoute="currentRoute"
          @close-mobile-menu="closeMobileMenu"
        />
        
        <DropdownSection 
          title="Directory"
          icon="fas fa-address-book"
          :items="directoryItems"
          :currentRoute="currentRoute"
          @close-mobile-menu="closeMobileMenu"
        />

        

        <DropdownSection 
          title="Account Home"
          icon="fas fa-home"
          :items="accountItems"
          :currentRoute="currentRoute"
          @close-mobile-menu="closeMobileMenu"
        />
        
        <!-- Another Feature Dropdown -->
        <DropdownSection 
          title="WorkSpace "
          icon="fas fa-briefcase"
          :items="workspaceItems"
          :currentRoute="currentRoute"
          @close-mobile-menu="closeMobileMenu"
        />
        <DropdownSection 
          title=" Security"
          icon="fas fa-shield-alt"
          :items="securityItems"
          :currentRoute="currentRoute"
          @close-mobile-menu="closeMobileMenu"
        />
        
        <!-- Standalone Items -->
        <li v-for="item in standaloneItems" :key="item.route">
          <router-link
            :to="item.route"
            @click="closeMobileMenu"
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
    </nav>
  </aside>
</template>

<script>
import { ref, computed } from 'vue'
import DropdownSection from './DropdownSection.vue'

export default {
  name: 'Sidebar',
  components: {
    DropdownSection
  },
  props: {
    currentRoute: {
      type: String,
      default: ''
    }
  },
  emits: ['navigate'],
  setup(props, { emit }) {
    const showMobileMenu = ref(false)

    const accountItems = [
  {
    route: '/my-account',
    name: 'MyAccount',
    label: 'My Account',
    icon: 'fas fa-user-circle'
  },
  {
    route: '/my-sso-apps',
    name: 'MySSOApps',
    label: 'My SSO Apps',
    icon: 'fas fa-key'
  },
  {
    route: '/my-group',
    name: 'MyGroup',
    label: 'My Group',
    icon: 'fas fa-users'
  },
  {
    route: '/my-access',
    name: 'MyAccess',
    label: 'My Access',
    icon: 'fas fa-id-badge'
  },
  {
    route: '/recent-activity',
    name: 'RecentActivity',
    label: 'Recent Activity',
    icon: 'fas fa-clock'
  }
]


    const mspItems = [
      {
        route: '/msp/feature-1',
        name: 'MspFeature1',
        label: 'Billing',
        icon: 'fas fa-dollar-sign'
      },
      {
        route: '/msp/feature-2',
        name: 'MspFeature2',
        label: 'All Organizations',
        icon: 'fas fa-building'
      },
      {
        route: '/msp/feature-3',
        name: 'MspFeature3',
        label: 'MSP Admin',
        icon: 'fas fa-user-shield'
      }
    ]

    const directoryItems = [

    {
        route: '/directory/organization',
        name: 'DirectoryOrganization',
        label: 'Organization',
        icon: 'fas fa-fas fa-building'
      },



      {
        route: '/directory/users',
        name: 'DirectoryUsers',
        label: 'Users',
        icon: 'fas fa-users'
      },

      {
        route: '/directory/domain',
        name: 'DirectoryDomain',
        label: 'Domain',
        icon: 'fas fa-users'
      },
      {
        route: '/directory/groups',
        name: 'DirectoryGroups',
        label: 'Groups',
        icon: 'fas fa-user-friends'
      },
      {
        route: '/directory/admin',
        name: 'DirectoryAdmin',
        label: 'Admin',
        icon: 'fas fa-laptop'
      }
      

    ]

    const workspaceItems = [
      {
        route: '/workspace/dashboard',
        name: 'WorkspaceDashboard',
        label: 'Calendar',
        icon: 'fas fa-calendar-alt'
      },
      {
        route: '/workspace/projects',
        name: 'WorkspaceProjects',
        label: 'mail',
        icon: 'fas fa-mail-bulk'
      },
      {
        route: '/workspace/drive',
        name: 'WorkspaceDrive',
        label: 'Drive',
        icon: 'fas fa-folder'
      },
      
      {
        route: '/workspace/chat',
        name: 'WorkspaceChat',
        label: 'Chat',
        icon: 'fas fa-comments'
      
      },
      {
        route: '/workspace/domain',
        name: 'WorkspaceDomain',
        label: 'Domain',
        icon: 'fas fa-globe'
        
      
      },

    ]

    const securityItems = [
      {
        route: '/security/settings',
        name: 'SecuritySettings',
        label: 'Policys',
        icon: 'fas fa-shield-alt'
      },
      // {
      //   route: '/security/audit',
      //   name: 'SecurityAudit',
      //   label: 'Audit Logs',
      //   icon: 'fas fa-clipboard-list'
      // },
      {
        route: '/security/2fa',
        name: 'Security2FA',
        label: 'RoleManagement',
        icon: 'fas fa-lock'
      },
      {
        route: '/security/audit',
        name: 'SecurityAudit',
        label: 'Audit Logs',
        icon: 'fas fa-clipboard-list'
      },
    ]

    const standaloneItems = [
      {
        route: '/settings',
        name: 'Settings',
        label: 'Report',
        icon: 'fas fa-cog'
      }, // Fixed: Added missing comma here
      {
        route: '/help',
        name: 'Help',
        label: 'Settings',
        icon: 'fas fa-question-circle'
      }
    ]

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }

    const closeMobileMenu = () => {
      showMobileMenu.value = false
    }

    return {
      showMobileMenu,
      accountItems,
      mspItems,
      directoryItems,
      workspaceItems,
      securityItems,
      standaloneItems,
      toggleMobileMenu,
      closeMobileMenu
      // WorkspaceDrive
    }
  }
}
</script>