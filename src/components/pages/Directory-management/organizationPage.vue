<template>
  <section class="space-y-6 animate-fade-in">
    <!-- Sub Navigation -->
    <div class="bg-white rounded-lg shadow-sm overflow-x-auto">
      <div class="p-1 min-w-max">
        <nav class="flex space-x-1" aria-label="Tabs">
          <button v-for="tab in groupTabs" :key="tab.id" @click="activeTab = tab.id" :class="[
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            activeTab === tab.id
              ? 'bg-primary-50 text-primary-700'
              : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50'
          ]">
            {{ tab.label }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Organization Info Tab -->
    <div v-if="activeTab === 'group-list'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-neutral-900">Organization</h3>
            <button @click="openEditModal"
              class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
              Add Organization
            </button>
          </div>

          <div class="overflow-x-auto">
            <div v-if="organizations.length > 0" class="space-y-4">
              <div v-for="org in organizations" :key="org.id"
                class="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between mx-6 mt-4 mb-2">
                  <div class="flex items-center gap-2">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg class="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm4 0h2v2h-2V5zm-4 3h2v2H7V8zm4 0h2v2h-2V8zm-4 3h2v2H7v-2zm4 0h2v2h-2v-2z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div class="text-lg font-semibold text-gray-900">{{ org.name }}</div>
                      <div class="text-sm text-gray-500">{{ org.type }} • {{ org.industry }}</div>
                    </div>
                  </div>
                  <div class="flex gap-2 mt-2 md:mt-0">
                    <button @click="editOrganization(org.id)"
                      class="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50">
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click="confirmDeleteOrg(org.id)"
                      class="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50">
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <hr class="my-2 border-gray-200">
                <div class="px-6 pb-4 space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 class="text-sm font-medium text-gray-500">Organization ID</h3>
                      <p>{{ org.id }}</p>
                    </div>
                    <div>
                      <h3 class="text-sm font-medium text-gray-500">Founded</h3>
                      <p>{{ formatDate(org.foundedDate) }}</p>
                    </div>
                    <div>
                      <h3 class="text-sm font-medium text-gray-500">Headquarters</h3>
                      <p>{{ org.city }}, {{ org.country }}</p>
                    </div>
                    <div>
                      <h3 class="text-sm font-medium text-gray-500">Employees</h3>
                      <p>{{ org.employeeCount }}</p>
                    </div>
                    <div>
                      <h3 class="text-sm font-medium text-gray-500">Website</h3>
                      <p>{{ org.website }}</p>
                    </div>
                    <div>
                      <h3 class="text-sm font-medium text-gray-500">Primary Email</h3>
                      <p>{{ org.primaryEmail }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-12">
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 class="mt-3 text-sm font-medium text-gray-900">No organizations</h3>
              <p class="mt-1 text-sm text-gray-500">Get started by creating your first organization.</p>
              <div class="mt-6">
                <button @click="openEditModal" type="button"
                  class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd" />
                  </svg>
                  Add Organization
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Office Locations Tab -->
    <div v-if="activeTab === 'add-group'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6 space-y-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <!-- Header Section -->
            <div class="p-5 border-b border-gray-100">
              <div class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 class="text-xl font-semibold text-gray-800">Office Locations</h2>
                  <p class="text-sm text-gray-500 mt-1">Manage your organization's office locations</p>
                </div>
                <button @click="openWorkLocationModal(null)"
                  class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                  Add Office Location
                </button>
              </div>
            </div>

            <!-- Table Section -->
            <div class="p-5">
              <div class="overflow-x-auto rounded-lg border border-gray-100">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Office Location
                      </th>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </th>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(location, index) in officeLocations" :key="index">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div>
                            <div class="text-sm font-medium text-gray-900">{{ location.name }}</div>
                            <div class="text-sm text-gray-500">{{ location.city }}, {{ location.country }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ location.address }}</div>
                        <div class="text-sm text-gray-500">{{ location.postalCode }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${location.isPrimary ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`">
                          {{ location.isPrimary ? 'Primary' : 'Secondary' }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button @click="openWorkLocationModal(index)"
                          class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button @click="confirmDeleteLocation(index)"
                          class="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Empty State -->
              <div v-if="officeLocations.length === 0" class="text-center py-12">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                  <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 class="mt-3 text-sm font-medium text-gray-900">No office locations</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by adding your first office location.</p>
                <div class="mt-6">
                  <button @click="openWorkLocationModal(null)" type="button"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd" />
                    </svg>
                    Add Office Location
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Designations Tab -->
    <div v-if="activeTab === 'owned-groups'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6 space-y-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <!-- Header Section -->
            <div class="p-5 border-b border-gray-100">
              <div class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 class="text-xl font-semibold text-gray-800">Designations</h2>
                  <p class="text-sm text-gray-500 mt-1">Manage your organization's work Designations</p>
                </div>
                <button @click="openWorkDesignationModal(null)"
                  class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                  Add Designation
                </button>
              </div>
            </div>

            <!-- Table Section -->
            <div class="p-5">
              <div class="overflow-x-auto rounded-lg border border-gray-100">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Level
                      </th>
                      <th scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(designation, index) in workDesignations" :key="index">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ designation.title }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900 capitalize">{{ designation.department }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ designation.level }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button @click="openWorkDesignationModal(index)"
                          class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button @click="confirmDeleteDesignation(index)"
                          class="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Empty State -->
              <div v-if="workDesignations.length === 0" class="text-center py-12">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                  <svg class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 class="mt-3 text-sm font-medium text-gray-900">No designations</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by adding new work designations.</p>
                <div class="mt-6">
                  <button @click="openWorkDesignationModal(null)" type="button"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clip-rule="evenodd" />
                    </svg>
                    Add Designation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Organization Modal -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl relative max-h-[90vh] flex flex-col">
        <div class="p-6 border-b sticky top-0 bg-white z-10">
          <h2 class="text-xl font-bold">{{ editingOrgId ? 'Edit' : 'Add' }} Organization</h2>
          <button @click="closeEditModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="overflow-y-auto p-6">
          <!-- Organization Form -->
          <div class="space-y-4">
            <!-- Basic Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Organization Name*</label>
                <input v-model="organizationForm.name" type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                  placeholder="e.g., Acme Corporation" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Organization Type*</label>
                <select v-model="organizationForm.type"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md" required>
                  <option value="">Select Type</option>
                  <option value="corporation">Corporation</option>
                  <option value="llc">LLC</option>
                  <option value="nonprofit">Nonprofit</option>
                  <option value="partnership">Partnership</option>
                  <option value="sole_proprietorship">Sole Proprietorship</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Industry*</label>
                <input v-model="organizationForm.industry" type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md" placeholder="e.g., Technology"
                  required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Founded Date*</label>
                <input v-model="organizationForm.foundedDate" type="date"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md" required>
              </div>
            </div>

            <!-- Contact Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Primary Email*</label>
                <input v-model="organizationForm.primaryEmail" type="email"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                  placeholder="contact@organization.com" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input v-model="organizationForm.phone" type="tel"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md" placeholder="+1 (555) 123-4567">
              </div>
            </div>

            <!-- Website Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                <input v-model="organizationForm.website" type="url"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
                  placeholder="https://www.example.com">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Saga URL</label>
                <input v-model="organizationForm.sagaUrl" type="url"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md" placeholder="https://sagasoft.io">
              </div>
            </div>

            <!-- Address Information -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Headquarters Address*</label>
              <textarea v-model="organizationForm.address"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md" rows="2"
                placeholder="Full street address" required></textarea>
            </div>

            <!-- Three fields in one row -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">City*</label>
                <input v-model="organizationForm.city" type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">State/Region</label>
                <input v-model="organizationForm.state" type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Country*</label>
                <input v-model="organizationForm.country" type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md" required>
              </div>
            </div>

            <!-- Another three fields in one row -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input v-model="organizationForm.postalCode" type="text"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Timezone*</label>
                <select v-model="organizationForm.timezone"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md" required>
                  <option value="">Select Timezone</option>
                  <option value="est">EST</option>
                  <option value="pst">PST</option>
                  <option value="cst">CST</option>
                  <option value="gmt">GMT</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Employee Count</label>
                <input v-model="organizationForm.employeeCount" type="number"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md" placeholder="Estimated number">
              </div>
            </div>

            <!-- Additional Information -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea v-model="organizationForm.description"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md" rows="3"
                placeholder="Brief description of the organization"></textarea>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="p-4 border-t sticky bottom-0 bg-white flex justify-end gap-3">
          <button @click="closeEditModal" class="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200">
            Cancel
          </button>
          <button @click="saveOrganization"
            class="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
            {{ editingOrgId ? 'Update' : 'Save' }} Organization
          </button>
        </div>
      </div>
    </div>

    <!-- Office Location Modal -->
    <div v-if="showWorkLocationModal"
      class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative mx-4">
        <h2 class="text-xl font-bold mb-4">{{ editingLocationIndex === null ? 'Add' : 'Edit' }} Office Location</h2>

        <!-- Location Form -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Location Name*</label>
            <input v-model="locationForm.name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g., Headquarters" required>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Address*</label>
            <textarea v-model="locationForm.address" class="w-full px-3 py-2 border border-gray-300 rounded-md" rows="3"
              placeholder="Full street address" required></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">City*</label>
              <input v-model="locationForm.city" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md"
                required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Country*</label>
              <input v-model="locationForm.country" type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
              <input v-model="locationForm.postalCode" type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Timezone*</label>
              <select v-model="locationForm.timezone" class="w-full px-3 py-2 border border-gray-300 rounded-md"
                required>
                <option value="">Select Timezone</option>
                <option value="est">Eastern Standard Time (EST)</option>
                <option value="pst">Pacific Standard Time (PST)</option>
                <option value="cst">Central Standard Time (CST)</option>
                <option value="gmt">Greenwich Mean Time (GMT)</option>
              </select>
            </div>
          </div>

          <div>
            <label class="flex items-center">
              <input v-model="locationForm.isPrimary" type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
              <span class="ml-2 text-sm text-gray-700">Primary office location</span>
            </label>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end mt-6">
          <button @click="closeWorkLocationModal" class="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button @click="saveLocation" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {{ editingLocationIndex === null ? 'Save' : 'Update' }} Location
          </button>
        </div>

        <!-- Close Button -->
        <button @click="closeWorkLocationModal" class="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl">
          &times;
        </button>
      </div>
    </div>

    <!-- Work Designation Modal -->
    <div v-if="showWorkDesignationModal"
      class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative mx-4">
        <h2 class="text-xl font-bold mb-4">{{ editingDesignationIndex === null ? 'Add' : 'Edit' }} Work Designation</h2>

        <!-- Designation Form -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Designation Title*</label>
            <input v-model="designationForm.title" type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., Senior Developer" required>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Department*</label>
            <select v-model="designationForm.department" class="w-full px-3 py-2 border border-gray-300 rounded-md"
              required>
              <option value="">Select Department</option>
              <option value="engineering">Engineering</option>
              <option value="marketing">Marketing</option>
              <option value="hr">Human Resources</option>
              <option value="finance">Finance</option>
              <option value="operations">Operations</option>
            </select>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Level*</label>
              <input v-model="designationForm.level" type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., 3" required>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Reporting To</label>
              <select v-model="designationForm.reportingTo" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="">Select Reporting Designation</option>
                <option value="manager">Manager</option>
                <option value="director">Director</option>
                <option value="vp">Vice President</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="designationForm.description" class="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows="3" placeholder="Role responsibilities..."></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input v-model="designationForm.canApprove" type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                <span class="ml-2 text-sm text-gray-700">Can approve requests</span>
              </label>
              <label class="flex items-center">
                <input v-model="designationForm.canManage" type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                <span class="ml-2 text-sm text-gray-700">Can manage team members</span>
              </label>
              <label class="flex items-center">
                <input v-model="designationForm.canAccessFinance" type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                <span class="ml-2 text-sm text-gray-700">Can access financial data</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end mt-6">
          <button @click="closeWorkDesignationModal" class="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button @click="saveDesignation" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {{ editingDesignationIndex === null ? 'Save' : 'Update' }} Designation
          </button>
        </div>

        <!-- Close Button -->
        <button @click="closeWorkDesignationModal"
          class="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl">
          &times;
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirmation"
      class="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative mx-4">
        <h2 class="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p class="mb-6">Are you sure you want to delete this {{ itemToDelete.type }}? This action cannot be undone.</p>

        <div class="flex justify-end">
          <button @click="showDeleteConfirmation = false" class="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button @click="confirmDelete" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'OrganizationManagement',
  setup() {
    const activeTab = ref('group-list')
    const showEditModal = ref(false)
    const showWorkLocationModal = ref(false)
    const showWorkDesignationModal = ref(false)
    const showDeleteConfirmation = ref(false)
    const editingOrgId = ref(null)
    const editingLocationIndex = ref(null)
    const editingDesignationIndex = ref(null)

    const groupTabs = [
      { id: 'group-list', label: 'Organization Info' },
      { id: 'add-group', label: 'Office Locations' },
      { id: 'owned-groups', label: 'Designations' }
    ]

    // Sample data for organizations
    const organizations = ref([
      {
        id: 'ORG-12345',
        name: 'Acme Corporation',
        type: 'corporation',
        industry: 'Technology',
        foundedDate: '2010-01-15',
        primaryEmail: 'contact@acmecorp.com',
        phone: '+1 (555) 123-4567',
        website: 'www.acmecorp.com',
        sagaUrl: 'sagasoft.io',
        address: '123 Tech Avenue, New York, NY 10001',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        postalCode: '10001',
        timezone: 'est',
        description: 'A leading technology company specializing in innovative solutions',
        employeeCount: 1250
      }
    ])

    // Sample data for office locations
    const officeLocations = ref([
      {
        name: 'Headquarters',
        address: '123 Tech Avenue, New York, NY 10001',
        city: 'New York',
        country: 'USA',
        postalCode: '10001',
        timezone: 'est',
        isPrimary: true
      },
      {
        name: 'West Coast Office',
        address: '456 Silicon Way, San Francisco, CA 94016',
        city: 'San Francisco',
        country: 'USA',
        postalCode: '94016',
        timezone: 'pst',
        isPrimary: false
      }
    ])

    // Sample data for work designations
    const workDesignations = ref([
      {
        title: 'Senior Developer',
        department: 'engineering',
        level: 3,
        reportingTo: 'manager',
        description: 'Leads development projects and mentors junior developers',
        canApprove: true,
        canManage: true,
        canAccessFinance: false
      },
      {
        title: 'HR Manager',
        department: 'hr',
        level: 2,
        reportingTo: 'director',
        description: 'Manages all HR operations and employee relations',
        canApprove: true,
        canManage: true,
        canAccessFinance: false
      }
    ])

    const organizationForm = ref({
      name: '',
      type: '',
      industry: '',
      foundedDate: '',
      primaryEmail: '',
      phone: '',
      website: '',
      sagaUrl: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      timezone: '',
      description: '',
      employeeCount: 0
    })

    const locationForm = ref({
      name: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      timezone: '',
      isPrimary: false
    })

    const designationForm = ref({
      title: '',
      department: '',
      level: '',
      reportingTo: '',
      description: '',
      canApprove: false,
      canManage: false,
      canAccessFinance: false
    })

    const itemToDelete = ref({
      type: '',
      index: null
    })

    function formatDate(dateString) {
      if (!dateString) return ''
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }

    function openEditModal() {
      editingOrgId.value = null
      organizationForm.value = {
        name: '',
        type: '',
        industry: '',
        foundedDate: '',
        primaryEmail: '',
        phone: '',
        website: '',
        sagaUrl: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        timezone: '',
        description: '',
        employeeCount: 0
      }
      showEditModal.value = true
    }

    function editOrganization(id) {
      const org = organizations.value.find(o => o.id === id)
      if (org) {
        editingOrgId.value = id
        organizationForm.value = { ...org }
        showEditModal.value = true
      }
    }

    function closeEditModal() {
      showEditModal.value = false
    }

    function saveOrganization() {
    
      if (!organizationForm.value.name || !organizationForm.value.type ||
        !organizationForm.value.industry || !organizationForm.value.foundedDate ||
        !organizationForm.value.primaryEmail || !organizationForm.value.address ||
        !organizationForm.value.city || !organizationForm.value.country ||
        !organizationForm.value.timezone) {
        alert('Please fill in all required fields')
        return
      }

      if (editingOrgId.value) {
      
        const index = organizations.value.findIndex(o => o.id === editingOrgId.value)
        if (index !== -1) {
          organizations.value[index] = { ...organizationForm.value }
        }
      } else {
      
        const id = 'ORG-' + Math.floor(10000 + Math.random() * 90000)
        organizations.value.push({
          id,
          ...organizationForm.value,
          employeeCount: parseInt(organizationForm.value.employeeCount) || 0
        })
      }

      closeEditModal()
    }

    function confirmDeleteOrg(id) {
      itemToDelete.value = {
        type: 'organization',
        index: organizations.value.findIndex(o => o.id === id)
      }
      showDeleteConfirmation.value = true
    }

    function openWorkLocationModal(index) {
      if (index !== null) {
   
        editingLocationIndex.value = index
        locationForm.value = { ...officeLocations.value[index] }
      } else {
     
        editingLocationIndex.value = null
        locationForm.value = {
          name: '',
          address: '',
          city: '',
          country: '',
          postalCode: '',
          timezone: '',
          isPrimary: false
        }
      }
      showWorkLocationModal.value = true
    }

    function closeWorkLocationModal() {
      showWorkLocationModal.value = false
    }

    function saveLocation() {
      if (!locationForm.value.name || !locationForm.value.address ||
        !locationForm.value.city || !locationForm.value.country || !locationForm.value.timezone) {
        alert('Please fill in all required fields')
        return
      }

      if (editingLocationIndex.value !== null) {
       
        officeLocations.value[editingLocationIndex.value] = { ...locationForm.value }
      } else {
        
        officeLocations.value.push({ ...locationForm.value })
      }

    
      if (locationForm.value.isPrimary) {
        officeLocations.value.forEach((loc, idx) => {
          if (idx !== editingLocationIndex.value && editingLocationIndex.value !== null) {
            loc.isPrimary = false
          }
        })
      }

      closeWorkLocationModal()
    }

    function confirmDeleteLocation(index) {
      itemToDelete.value = {
        type: 'location',
        index: index
      }
      showDeleteConfirmation.value = true
    }

    function openWorkDesignationModal(index) {
      if (index !== null) {
        
        editingDesignationIndex.value = index
        designationForm.value = { ...workDesignations.value[index] }
      } else {
       
        editingDesignationIndex.value = null
        designationForm.value = {
          title: '',
          department: '',
          level: '',
          reportingTo: '',
          description: '',
          canApprove: false,
          canManage: false,
          canAccessFinance: false
        }
      }
      showWorkDesignationModal.value = true
    }

    function closeWorkDesignationModal() {
      showWorkDesignationModal.value = false
    }

    function saveDesignation() {
      if (!designationForm.value.title || !designationForm.value.department || !designationForm.value.level) {
        alert('Please fill in all required fields')
        return
      }

      if (editingDesignationIndex.value !== null) {
        
        workDesignations.value[editingDesignationIndex.value] = { ...designationForm.value }
      } else {
        
        workDesignations.value.push({ ...designationForm.value })
      }

      closeWorkDesignationModal()
    }

    function confirmDeleteDesignation(index) {
      itemToDelete.value = {
        type: 'designation',
        index: index
      }
      showDeleteConfirmation.value = true
    }

    function confirmDelete() {
      if (itemToDelete.value.type === 'organization') {
        organizations.value.splice(itemToDelete.value.index, 1)
      } else if (itemToDelete.value.type === 'location') {
        officeLocations.value.splice(itemToDelete.value.index, 1)
      } else if (itemToDelete.value.type === 'designation') {
        workDesignations.value.splice(itemToDelete.value.index, 1)
      }
      showDeleteConfirmation.value = false
    }

    return {
      activeTab,
      groupTabs,
      organizations,
      officeLocations,
      workDesignations,
      showEditModal,
      showWorkLocationModal,
      showWorkDesignationModal,
      showDeleteConfirmation,
      editingOrgId,
      editingLocationIndex,
      editingDesignationIndex,
      organizationForm,
      locationForm,
      designationForm,
      itemToDelete,
      formatDate,
      openEditModal,
      editOrganization,
      closeEditModal,
      saveOrganization,
      confirmDeleteOrg,
      openWorkLocationModal,
      closeWorkLocationModal,
      saveLocation,
      confirmDeleteLocation,
      openWorkDesignationModal,
      closeWorkDesignationModal,
      saveDesignation,
      confirmDeleteDesignation,
      confirmDelete
    }
  }
}
</script>

<style>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>