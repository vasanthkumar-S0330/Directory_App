<template>
  <div
    @click="$emit('click', app)"
    class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
  >
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div
          :class="[
            'w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200',
            app.color
          ]"
        >
          {{ app.icon }}
        </div>
        <div>
          <h3 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {{ app.name }}
          </h3>
          <p class="text-sm text-gray-500">{{ app.description }}</p>
        </div>
      </div>
      <div v-if="app.installed" class="w-2 h-2 bg-green-500 rounded-full"></div>
    </div>
    
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <div class="flex text-yellow-400">
          <span v-for="i in Math.floor(app.rating)" :key="i">★</span>
        </div>
        <span class="text-sm text-gray-500">{{ app.rating }}</span>
      </div>
      <button
        @click.stop="$emit('action', app)"
        :class="[
          'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
          app.installed
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
        ]"
      >
        {{ app.installed ? 'Open' : 'Add' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCard',
  props: {
    app: {
      type: Object,
      required: true
    }
  },
  emits: ['click', 'action']
}
</script>