<template>
  <div class="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
    <div>
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{{ title }}</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ subtitle }}</p>
    </div>
    <slot name="actions"></slot>
  </div>

  <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String
})
</script>
