<template>
  <div class="overflow-auto w-full">
    <table class="table table-sm table-zebra w-full">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col" class="text-xs font-bold uppercase">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in rows" :key="idx">
          <td v-for="col in columns" :key="col" class="text-xs">{{ row[col] }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="!rows.length" class="text-sm text-gray-400 mt-4">No hay datos para mostrar.</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  items: { type: Array, default: () => [] },
  title: { type: String, default: '' }
});
const rows = computed(() => Array.isArray(props.items) ? props.items : []);
const columns = computed(() => {
  if (!rows.value.length) return [];
  return Object.keys(rows.value[0]);
});
</script>
