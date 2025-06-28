<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-neutral-500">
    <!-- <router-view /> -->

    <!-- Sidebar -->
    <Sidebar :currentRoute="$route.name" @navigate="handleNavigation" />
    
    <!-- Main Content -->
    <main class="flex-1 md:ml-64 min-h-screen bg-neutral-50 transition-all duration-300 ease-in-out">
      <!-- Top Bar -->
      <Topbar :title="pageTitle" />
      
      <!-- Page Content -->
      <div class="p-2 md:p-4 lg:p-6">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </main>

    <!-- Toast Container -->
    <div id="toast-container" class="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
      <Toast
        v-for="toast in toasts"
        :key="toast.id"
        :message="toast.message"
        :type="toast.type"
        @close="removeToast(toast.id)"
      />
    </div>

    <!-- Global Modal -->
    <Modal
      v-if="modal.show"
      :title="modal.title"
      :content="modal.content"
      :confirmText="modal.confirmText"
      :cancelText="modal.cancelText"
      :confirmClass="modal.confirmClass"
      :showCancel="modal.showCancel"
      @confirm="modal.onConfirm"
      @cancel="modal.onCancel"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { ref, computed, provide } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Topbar from './components/Topbar.vue'
import Toast from './components/Toast.vue'
import Modal from './components/Modal.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    Topbar,
    Toast,
    Modal
  },
  setup() {
    const toasts = ref([])
    const toastId = ref(0)
    
    const modal = ref({
      show: false,
      title: '',
      content: '',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      confirmClass: 'bg-primary-600 hover:bg-primary-700',
      showCancel: true,
      onConfirm: () => {},
      onCancel: () => {}
    })

    const pageTitle = computed(() => {
  const titles = {
    'DirectoryOrganization': 'Organization',
    'DirectoryUsers': 'Users',
    'DirectoryDomain': 'Domain',
    'DirectoryGroups': 'Groups',
    'DirectoryAdmin': 'Admin',
    
  }
  return titles[this.$route?.name] || 'Directory'
})

    const showToast = (message, type = 'info') => {
      const id = toastId.value++
      toasts.value.push({
        id,
        message,
        type
      })
      
      // Auto remove after 5 seconds
      setTimeout(() => {
        removeToast(id)
      }, 5000)
    }

    const removeToast = (id) => {
      const index = toasts.value.findIndex(toast => toast.id === id)
      if (index > -1) {
        toasts.value.splice(index, 1)
      }
    }

    const openModal = (options = {}) => {
      modal.value = {
        show: true,
        title: options.title || 'Confirmation',
        content: options.content || 'Are you sure you want to proceed?',
        confirmText: options.confirmText || 'Confirm',
        cancelText: options.cancelText || 'Cancel',
        confirmClass: options.confirmClass || 'bg-primary-600 hover:bg-primary-700',
        showCancel: options.showCancel !== false,
        onConfirm: options.onConfirm || (() => {}),
        onCancel: options.onCancel || (() => {})
      }
    }

    const closeModal = () => {
      modal.value.show = false
    }

    const handleNavigation = (routeName) => {
      // Handle navigation logic if needed
    }

    // Provide functions to child components
    provide('showToast', showToast)
    provide('openModal', openModal)
    provide('closeModal', closeModal)

    return {
      toasts,
      modal,
      pageTitle,
      showToast,
      removeToast,
      openModal,
      closeModal,
      handleNavigation
    }
  }
}
</script>













