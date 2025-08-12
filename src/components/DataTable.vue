<template>
  <div v-if="rows && rows.length" class="overflow-auto resize both border-2 border-primary rounded mt-4 max-h-[80vh] min-h-[120px]" style="resize: both;">
   
    <table class="table table-xs">
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
  </div>
  <div v-else class="text-sm text-gray-400 mt-4">No hay datos para mostrar.</div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  data: { type: Array, default: () => [] }
});

const rows = computed(() => Array.isArray(props.data) ? props.data : []);
const columns = computed(() => {
  if (!rows.value.length) return [];
  return Object.keys(rows.value[0]);
});
</script>
