<template>
  <div class="w-full max-w-md mx-auto p-4">
    <h2 v-if="title" class="text-lg font-bold mb-4">{{ title }}</h2>
    <ul class="list-disc pl-6">
      <li v-for="(item, idx) in items" :key="idx" class="py-1">{{ item }}</li>
    </ul>
    <div v-if="!items || !items.length" class="text-sm text-gray-400 mt-4">No hay elementos para mostrar.</div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] },
  title: { type: String, default: '' }
});
</script>
