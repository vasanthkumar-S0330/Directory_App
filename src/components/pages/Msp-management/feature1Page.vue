<template>
  <section class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Billing Management</h1>
    </div>

    <!-- Tabs -->
    <div class="bg-white rounded-xl flex items-center justify-between h-4 py-6 mb-4">
      <div class="flex items-center space-x-6">
        <nav class="flex space-x-1" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
              activeTab === tab.id
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Overview Tab -->
    <div v-if="activeTab === 'overview'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        <!-- Current Plan Card -->
        <div class="bg-white p-4 rounded-lg shadow-md border border-transparent transition-all duration-300 transform hover:scale-105 hover:border-blue-500">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Current Plan</h3>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ currentPlan.status }}
            </span>
          </div>
          <div class="space-y-4">
            <div>
              <p class="text-3xl font-bold">{{ currentPlan.name }}</p>
              <p class="text-sm text-gray-500">Billed {{ currentPlan.billingCycle }}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-700 mb-2">Includes:</p>
              <ul class="space-y-2">
                <li v-for="feature in currentPlan.features" :key="feature" class="flex items-start">
                  <svg class="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-sm text-gray-600">{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
          <button 
            @click="activeTab = 'plans'"
            class="mt-6 w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Change Plan
          </button>
        </div>

        <!-- Payment Method Card -->
        <div class="bg-white p-4 rounded-lg shadow-md border border-transparent transition-all duration-300 transform hover:scale-105 hover:border-blue-500">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Payment Method</h3>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Default
            </span>
          </div>
          <div class="space-y-4 mb-8">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                <svg class="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5 1a1 1 0 100-2h1a1 1 0 100 2H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ defaultPaymentMethod.type }} ending in {{ defaultPaymentMethod.last4 }}</p>
                <p class="text-sm text-gray-500">Expires {{ defaultPaymentMethod.expiry }}</p>
              </div>
            </div>
            <div class="mt-4">
              <p class="text-sm font-medium text-gray-700 mb-1">Billing address:</p>
              <address class="text-sm text-gray-600 not-italic mb-4">
                {{ billingAddress.street }}<br>
                {{ billingAddress.suite }}<br>
                {{ billingAddress.city }}, {{ billingAddress.state }} {{ billingAddress.zip }}<br>
                {{ billingAddress.country }}
              </address>
            </div>
          </div>
          <button 
            @click="activeTab = 'payment'"
            class="mt-14  w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Update Payment Method
          </button>
        </div>

        <!-- Upcoming Invoice Card -->
        <div class="bg-white p-4 rounded-lg shadow-md border border-transparent transition-all duration-300 transform hover:scale-105 hover:border-blue-500">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Upcoming Invoice</h3>
          <div class="space-y-4 mb-8">
            <div>
              <p class="text-3xl font-bold">${{ upcomingInvoice.amount }}</p>
              <p class="text-sm text-gray-500">Due on {{ upcomingInvoice.dueDate }}</p>
            </div>
            <div v-if="upcomingInvoice.notice" class="flex items-start p-3 bg-yellow-50 rounded-md">
              <svg class="h-5 w-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p class="text-sm font-medium text-yellow-800">{{ upcomingInvoice.notice.title }}</p>
                <p class="text-sm text-yellow-700">{{ upcomingInvoice.notice.message }}</p>
              </div>
            </div>
          </div>
          <button 
            class="mt-20 w-full flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Invoice Preview
          </button>
        </div>
      </div>
    </div>

    <!-- Invoices Tab -->
    <div v-if="activeTab === 'invoices'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div class="relative w-full sm:w-64 mb-4 sm:mb-0">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                v-model="invoiceSearch"
                type="search" 
                placeholder="Search invoices..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
            </div>
            <div class="flex items-center space-x-3">
              <select 
                v-model="invoiceStatusFilter"
                class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
              <button class="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="invoice in paginatedInvoices" :key="invoice.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ invoice.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ invoice.date }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${{ invoice.amount }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getStatusClass(invoice.status)" class="px-2 py-1 text-xs font-medium rounded-full capitalize">
                      {{ invoice.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ invoice.items }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="relative">
                      <button 
                        @click="toggleInvoiceActions(invoice.id)"
                        class="text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                      </button>
                      <div 
                        v-if="activeInvoiceActions === invoice.id"
                        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                      >
                        <div class="py-1">
                          <button 
                            @click="viewInvoiceDetails(invoice)"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            View details
                          </button>
                          <button 
                            @click="downloadInvoice(invoice)"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            Download PDF
                          </button>
                          <button 
                            v-if="invoice.status === 'paid'"
                            @click="requestRefund(invoice)"
                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            Request refund
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex items-center justify-between mt-6">
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> to <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredInvoices.length) }}</span> of <span class="font-medium">{{ filteredInvoices.length }}</span> invoices
            </p>
            <div class="flex space-x-2">
              <button 
                @click="prevPage"
                :disabled="currentPage === 1"
                :class="[
                  'relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium',
                  currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                ]"
              >
                Previous
              </button>
              <button 
                @click="nextPage"
                :disabled="currentPage * itemsPerPage >= filteredInvoices.length"
                :class="[
                  'relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium',
                  currentPage * itemsPerPage >= filteredInvoices.length ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                ]"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div v-if="activeTab === 'payment'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-gray-900">Payment Methods</h3>
            <button 
              @click="showAddPaymentMethod = true"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Method
            </button>
          </div>

          <div class="space-y-4">
            <div 
              v-for="method in paymentMethods" 
              :key="method.id"
              :class="{'border-2 border-blue-500': method.isDefault, 'border border-gray-200': !method.isDefault}"
              class="bg-white rounded-lg p-4 shadow-sm"
            >
              <div class="flex items-start justify-between">
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0 h-10 w-16 bg-gray-100 rounded flex items-center justify-center">
                    <svg class="h-6 w-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5 1a1 1 0 100-2h1a1 1 0 100 2H9z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-base font-medium text-gray-900">
                      <span v-if="method.type === 'PayPal'">PayPal</span>
                      <span v-else>{{ method.type }} ending in {{ method.last4 }}</span>
                    </h4>
                    <p class="text-sm text-gray-500">
                      <span v-if="method.type === 'PayPal'">{{ method.email }}</span>
                      <span v-else>Expires {{ method.expiry }}</span>
                    </p>
                    <div v-if="method.isDefault" class="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Default
                    </div>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button 
                    v-if="!method.isDefault"
                    @click="setDefaultPaymentMethod(method.id)"
                    class="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Make Default
                  </button>
                  <button 
                    @click="confirmDeletePaymentMethod(method.id)"
                    class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 border-t border-gray-200 pt-6">
            <h4 class="text-sm font-medium text-gray-900 mb-2">Billing Address</h4>
            <div class="text-sm text-gray-600">
              <p>{{ billingAddress.street }}</p>
              <p>{{ billingAddress.suite }}</p>
              <p>{{ billingAddress.city }}, {{ billingAddress.state }} {{ billingAddress.zip }}</p>
              <p>{{ billingAddress.country }}</p>
            </div>
            <button 
              @click="showEditBillingAddress = true"
              class="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Update address
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Subscription Plans Tab -->
    <div v-if="activeTab === 'plans'" class="space-y-6">
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900">Subscription Plans</h3>
              <p class="text-sm text-gray-500">Choose the plan that best fits your needs</p>
            </div>
            <div class="flex items-center space-x-2 bg-gray-100 rounded-lg p-1 mt-4 sm:mt-0">
              <button 
                @click="setBillingCycle('monthly')"
                :class="[
                  'px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200',
                  billingCycle === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'
                ]"
              >
                Monthly
              </button>
              <button 
                @click="setBillingCycle('annual')"
                :class="[
                  'px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200',
                  billingCycle === 'annual' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'
                ]"
              >
                Annually
                <span class="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div 
              v-for="plan in plans"
              :key="plan.id"
              :class="{
                'ring-2 ring-blue-500': plan.id === currentPlan.id,
                'border border-gray-200': plan.id !== currentPlan.id
              }"
              class="bg-white rounded-lg p-6 relative"
            >
              <div v-if="plan.popular" class="absolute top-0 left-0 right-0 mx-auto -mt-3 w-32 text-center">
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  Most Popular
                </span>
              </div>
              <div v-if="plan.id === currentPlan.id" class="absolute top-0 left-0 right-0 mx-auto -mt-3 w-32 text-center">
                <span class="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                  Current Plan
                </span>
              </div>
              
              <div class="mb-6">
                <h3 class="text-xl font-semibold text-gray-900">{{ plan.name }}</h3>
                <p class="text-sm text-gray-500">{{ plan.description }}</p>
                <div class="mt-4">
                  <span class="text-3xl font-bold text-gray-900">${{ billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice }}</span>
                  <span class="text-base text-gray-500">/{{ billingCycle === 'monthly' ? 'month' : 'year' }}</span>
                </div>
              </div>
              
              <ul class="space-y-3 mb-8">
                <li v-for="feature in plan.features" :key="feature.text" class="flex items-start">
                  <svg 
                    :class="feature.included ? 'text-blue-500' : 'text-gray-300'"
                    class="h-5 w-5 mr-2 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span :class="feature.included ? 'text-gray-700' : 'text-gray-400'">{{ feature.text }}</span>
                </li>
              </ul>
              
              <button 
                @click="selectPlan(plan)"
                :class="[
                  'w-full py-2 px-4 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200',
                  plan.id === currentPlan.id 
                    ? 'bg-gray-100 text-gray-700 border-gray-300 cursor-not-allowed'
                    : plan.popular 
                      ? 'bg-blue-600 text-white border-transparent hover:bg-blue-700'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                ]"
                :disabled="plan.id === currentPlan.id"
              >
                {{ plan.id === currentPlan.id ? 'Current Plan' : 'Select Plan' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Payment Method Modal -->
    <div v-if="showAddPaymentMethod" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-md w-full p-6 animate-fade-in">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Add Payment Method</h3>
          <button @click="showAddPaymentMethod = false" class="text-gray-400 hover:text-gray-600">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input 
              v-model="newPaymentMethod.cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Expiration</label>
              <input 
                v-model="newPaymentMethod.expiry"
                type="text"
                placeholder="MM/YY"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">CVC</label>
              <input 
                v-model="newPaymentMethod.cvc"
                type="text"
                placeholder="123"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
            <input 
              v-model="newPaymentMethod.name"
              type="text"
              placeholder="John Doe"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            @click="showAddPaymentMethod = false"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button 
            @click="addPaymentMethod"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Payment Method
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Billing Address Modal -->
    <div v-if="showEditBillingAddress" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-md w-full p-6 animate-fade-in">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Update Billing Address</h3>
          <button @click="showEditBillingAddress = false" class="text-gray-400 hover:text-gray-600">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
            <input 
              v-model="editBillingAddress.street"
              type="text"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Apt/Suite</label>
            <input 
              v-model="editBillingAddress.suite"
              type="text"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input 
                v-model="editBillingAddress.city"
                type="text"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input 
                v-model="editBillingAddress.state"
                type="text"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
              <input 
                v-model="editBillingAddress.zip"
                type="text"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input 
                v-model="editBillingAddress.country"
                type="text"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
            </div>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            @click="showEditBillingAddress = false"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button 
            @click="updateBillingAddress"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'overview',
      tabs: [
        { id: 'overview', label: 'Overview' },
        { id: 'invoices', label: 'Invoices' },
        { id: 'payment', label: 'Payment Methods' },
        { id: 'plans', label: 'Subscription Plans' }
      ],
      activeInvoiceActions: null,
      showAddPaymentMethod: false,
      showEditBillingAddress: false,
      invoiceSearch: '',
      invoiceStatusFilter: 'all',
      currentPage: 1,
      itemsPerPage: 10,
      billingCycle: 'monthly',
      
      // Current Plan Data
      currentPlan: {
        id: 'enterprise',
        name: 'Enterprise',
        billingCycle: 'annually',
        status: 'Active',
        features: [
          'Unlimited users',
          'Unlimited projects',
          'Priority support',
          'Advanced security',
          'Custom integrations'
        ]
      },
      
      // Payment Method Data
      defaultPaymentMethod: {
        type: 'Visa',
        last4: '4242',
        expiry: '04/2025'
      },
      
      // Billing Address Data
      billingAddress: {
        street: '123 Business Ave',
        suite: 'Suite 500',
        city: 'San Francisco',
        state: 'CA',
        zip: '94107',
        country: 'United States'
      },
      
      // Edit Billing Address Data
      editBillingAddress: {
        street: '123 Business Ave',
        suite: 'Suite 500',
        city: 'San Francisco',
        state: 'CA',
        zip: '94107',
        country: 'United States'
      },
      
      // New Payment Method Data
      newPaymentMethod: {
        cardNumber: '',
        expiry: '',
        cvc: '',
        name: ''
      },
      
      // Upcoming Invoice Data
      upcomingInvoice: {
        amount: '1,299.00',
        dueDate: 'June 1, 2023',
        notice: {
          title: 'Price increase notice',
          message: 'Your plan price will increase by 5% starting next billing cycle.'
        }
      },
      
      // Payment Methods Data
      paymentMethods: [
        {
          id: 1,
          type: 'Visa',
          last4: '4242',
          expiry: '04/2025',
          isDefault: true
        },
        {
          id: 2,
          type: 'Mastercard',
          last4: '5555',
          expiry: '08/2024',
          isDefault: false
        },
        {
          id: 3,
          type: 'PayPal',
          email: 'billing@company.com',
          isDefault: false
        }
      ],
      
      // Invoices Data
      invoices: [
        {
          id: 'INV-2023-001',
          date: 'May 1, 2023',
          amount: '1299.00',
          status: 'paid',
          items: 5
        },
        {
          id: 'INV-2023-002',
          date: 'April 1, 2023',
          amount: '1299.00',
          status: 'paid',
          items: 5
        },
        {
          id: 'INV-2023-003',
          date: 'March 1, 2023',
          amount: '1299.00',
          status: 'paid',
          items: 5
        },
        {
          id: 'INV-2023-004',
          date: 'February 1, 2023',
          amount: '1299.00',
          status: 'paid',
          items: 5
        },
        {
          id: 'INV-2023-005',
          date: 'January 1, 2023',
          amount: '1299.00',
          status: 'paid',
          items: 5
        },
        {
          id: 'INV-2023-006',
          date: 'December 1, 2022',
          amount: '1299.00',
          status: 'paid',
          items: 5
        },
        {
          id: 'INV-2023-007',
          date: 'November 1, 2022',
          amount: '1299.00',
          status: 'paid',
          items: 5
        },
        {
          id: 'INV-2023-008',
          date: 'October 1, 2022',
          amount: '1299.00',
          status: 'paid',
          items: 5
        },
        {
          id: 'INV-2023-009',
          date: 'September 1, 2022',
          amount: '1299.00',
          status: 'paid',
          items: 5
        },
        {
          id: 'INV-2023-010',
          date: 'August 1, 2022',
          amount: '1299.00',
          status: 'paid',
          items: 5
        },
        {
          id: 'INV-2023-011',
          date: 'July 1, 2022',
          amount: '1299.00',
          status: 'pending',
          items: 5
        },
        {
          id: 'INV-2023-012',
          date: 'June 1, 2022',
          amount: '1299.00',
          status: 'pending',
          items: 5
        },
        {
          id: 'INV-2023-013',
          date: 'May 1, 2022',
          amount: '1299.00',
          status: 'refunded',
          items: 5
        },
        {
          id: 'INV-2023-014',
          date: 'April 1, 2022',
          amount: '1299.00',
          status: 'failed',
          items: 5
        }
      ],
      
      // Plans Data
      plans: [
        {
          id: 'starter',
          name: 'Starter',
          description: 'For small teams just getting started',
          monthlyPrice: '49',
          annualPrice: '39',
          popular: false,
          features: [
            { text: '5 team members', included: true },
            { text: '10 projects', included: true },
            { text: '5GB storage', included: true },
            { text: 'Basic analytics', included: true },
            { text: '24-hour support response time', included: true },
            { text: 'SSO Authentication', included: false },
            { text: 'Advanced security', included: false },
            { text: 'Custom integrations', included: false }
          ]
        },
        {
          id: 'professional',
          name: 'Professional',
          description: 'For growing teams that need more',
          monthlyPrice: '99',
          annualPrice: '79',
          popular: true,
          features: [
            { text: '10 team members', included: true },
            { text: 'Unlimited projects', included: true },
            { text: '25GB storage', included: true },
            { text: 'Advanced analytics', included: true },
            { text: '12-hour support response time', included: true },
            { text: 'SSO Authentication', included: true },
            { text: 'Advanced security', included: false },
            { text: 'Custom integrations', included: false }
          ]
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          description: 'For large organizations with specific needs',
          monthlyPrice: '299',
          annualPrice: '239',
          popular: false,
          features: [
            { text: 'Unlimited team members', included: true },
            { text: 'Unlimited projects', included: true },
            { text: 'Unlimited storage', included: true },
            { text: 'Custom analytics', included: true },
            { text: '1-hour support response time', included: true },
            { text: 'SSO Authentication', included: true },
            { text: 'Advanced security', included: true },
            { text: 'Custom integrations', included: true }
          ]
        }
      ]
    }
  },
  
  computed: {
    filteredInvoices() {
      let filtered = this.invoices;
      
      // Filter by status
      if (this.invoiceStatusFilter !== 'all') {
        filtered = filtered.filter(invoice => invoice.status === this.invoiceStatusFilter);
      }
      
      // Filter by search term
      if (this.invoiceSearch) {
        const searchTerm = this.invoiceSearch.toLowerCase();
        filtered = filtered.filter(invoice => 
          invoice.id.toLowerCase().includes(searchTerm) || 
          invoice.date.toLowerCase().includes(searchTerm) ||
          invoice.amount.toLowerCase().includes(searchTerm)
        );
      }
      
      return filtered;
    },
    
    paginatedInvoices() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredInvoices.slice(start, end);
    }
  },
  
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
    },
    
    toggleInvoiceActions(invoiceId) {
      this.activeInvoiceActions = this.activeInvoiceActions === invoiceId ? null : invoiceId;
    },
    
    viewInvoiceDetails(invoice) {
      alert(`Viewing details for invoice: ${invoice.id}`);
      this.activeInvoiceActions = null;
    },
    
    downloadInvoice(invoice) {
      alert(`Downloading invoice: ${invoice.id}`);
      this.activeInvoiceActions = null;
    },
    
    requestRefund(invoice) {
      if (confirm(`Are you sure you want to request a refund for invoice ${invoice.id}?`)) {
        alert(`Refund requested for invoice: ${invoice.id}`);
      }
      this.activeInvoiceActions = null;
    },
    
    nextPage() {
      if (this.currentPage * this.itemsPerPage < this.filteredInvoices.length) {
        this.currentPage++;
      }
    },
    
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    
    getStatusClass(status) {
      const classes = {
        'paid': 'bg-green-100 text-green-800',
        'pending': 'bg-blue-100 text-blue-800',
        'failed': 'bg-red-100 text-red-800',
        'refunded': 'bg-purple-100 text-purple-800'
      };
      return classes[status] || 'bg-gray-100 text-gray-800';
    },
    
    addPaymentMethod() {
      if (!this.newPaymentMethod.cardNumber || !this.newPaymentMethod.expiry || !this.newPaymentMethod.cvc || !this.newPaymentMethod.name) {
        alert('Please fill in all payment method details');
        return;
      }
      
      // Extract last 4 digits
      const last4 = this.newPaymentMethod.cardNumber.slice(-4);
      
      // Add new payment method
      this.paymentMethods.push({
        id: this.paymentMethods.length + 1,
        type: 'Visa', // In a real app, you'd detect the card type
        last4: last4,
        expiry: this.newPaymentMethod.expiry,
        isDefault: false
      });
      
      // Reset form
      this.newPaymentMethod = {
        cardNumber: '',
        expiry: '',
        cvc: '',
        name: ''
      };
      
      this.showAddPaymentMethod = false;
      alert('Payment method added successfully');
    },
    
    setDefaultPaymentMethod(methodId) {
      this.paymentMethods.forEach(method => {
        method.isDefault = method.id === methodId;
      });
      alert('Default payment method updated');
    },
    
    confirmDeletePaymentMethod(methodId) {
      if (confirm('Are you sure you want to delete this payment method?')) {
        this.deletePaymentMethod(methodId);
      }
    },
    
    deletePaymentMethod(methodId) {
      const index = this.paymentMethods.findIndex(method => method.id === methodId);
      if (index !== -1) {
        this.paymentMethods.splice(index, 1);
        alert('Payment method deleted successfully');
      }
    },
    
    updateBillingAddress() {
      this.billingAddress = {...this.editBillingAddress};
      this.showEditBillingAddress = false;
      alert('Billing address updated successfully');
    },
    
    setBillingCycle(cycle) {
      this.billingCycle = cycle;
    },
    
    selectPlan(plan) {
      if (plan.id === this.currentPlan.id) return;
      
      if (confirm(`Are you sure you want to change to the ${plan.name} plan?`)) {
        this.currentPlan = {
          id: plan.id,
          name: plan.name,
          billingCycle: this.billingCycle,
          status: 'Active',
          features: plan.features.filter(f => f.included).map(f => f.text)
        };
        alert(`Plan changed to ${plan.name} successfully`);
      }
    }
  },
  
  mounted() {
    // Close invoice actions when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.relative')) {
        this.activeInvoiceActions = null;
      }
    });
    
    // Initialize edit billing address with current values
    this.editBillingAddress = {...this.billingAddress};
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>