<template>
  <section class="space-y-6 animate-fade-in">
    <!-- Profile Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Profile</h1>
      <button
        @click="showEditModal = true"
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Edit User Profile
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Personal Information -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Personal Information</h3>
          </div>
          <div class="p-6">
            <div class="space-y-6">
              <div class="flex items-center space-x-4">
                <div>
                  <p class="text-sm text-gray-500">Full Name</p>
                  <p class="text-lg font-medium text-gray-900">{{ profile.fullName }}</p>
                </div>
              </div>

              <div class="flex items-center space-x-4">
                <div>
                  <p class="text-sm text-gray-500">Designation</p>
                  <p class="text-lg font-medium text-gray-900">{{ profile.designation }}</p>
                </div>
              </div>

              <div class="flex items-center space-x-4">
                <div>
                  <p class="text-sm text-gray-500">Email Address</p>
                  <p class="text-lg font-medium text-gray-900">{{ profile.email }}</p>
                </div>
              </div>

              <div class="flex items-center space-x-4">
                <div>
                  <p class="text-sm text-gray-500">Role</p>
                  <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {{ profile.role }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Picture -->
      <div>
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Profile Picture</h3>
          </div>
          <div class="p-6 text-center">
            <img
              :src="profile.profileImage"
              alt="Profile"
              class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />

            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleImageChange"
              class="hidden"
            />

            <button
              @click="$refs.fileInput.click()"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Change Photo
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="w-full max-w-md bg-white rounded-xl shadow-2xl transform transition-all">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Edit Profile</h3>
          <button @click="showEditModal = false" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <i class="fas fa-times w-5 h-5 text-gray-500"></i>
          </button>
        </div>

        <div class="p-6">
          <form @submit.prevent="saveProfile" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                v-model="editForm.fullName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                v-model="editForm.email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Designation</label>
              <input
                v-model="editForm.designation"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                v-model="editForm.role"
                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option>Admin</option>
                <option>Member</option>
                <option>Viewer</option>
              </select>
            </div>

            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                @click="showEditModal = false"
                class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, reactive, inject } from 'vue'

export default {
  name: 'MyAccount',
  setup() {
    const showToast = inject('showToast')
    const showEditModal = ref(false)

    const profile = reactive({
      fullName: 'Kumaravel Anjamani',
      designation: 'UI/UX Designer',
      email: 'kumaravel@sagasoft.io',
      role: 'Admin',
      profileImage: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1'
    })

    const editForm = reactive({
      fullName: profile.fullName,
      designation: profile.designation,
      email: profile.email,
      role: profile.role
    })

    const handleImageChange = (event) => {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        profile.profileImage = e.target.result
        showToast('Profile photo updated successfully!', 'success')
      }
      reader.readAsDataURL(file)
    }

    const saveProfile = () => {
      Object.assign(profile, editForm)
      showEditModal.value = false
      showToast('Profile updated successfully!', 'success')
    }

    return {
      profile,
      editForm,
      showEditModal,
      handleImageChange,
      saveProfile
    }
  }
}
</script>