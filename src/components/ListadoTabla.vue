<template>
  <div>
    <div class="overflow-x-auto w-full max-h-96 overflow-y-auto">
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
    <div v-if="rows.length" class="flex flex-col gap-2 mt-2">
      <div class="text-xs text-gray-500 text-right">
        {{ rows.length }} fila{{ rows.length === 1 ? '' : 's' }}
        <span v-if="columns.length"> | {{ columns.length }} columna{{ columns.length === 1 ? '' : 's' }}</span>
      </div>
          <div class="flex gap-2 justify-end items-center">        
            <button class="btn btn-xs btn-outline text-white bg-blue-600" @click="openModal('csv')">Exportar CSV</button>
            <button class="btn btn-xs btn-outline text-white bg-blue-600" @click="openModal('json')">Exportar JSON</button>
            <button class="btn btn-xs btn-outline text-white bg-blue-600" @click="openModal('xls')">Exportar Excel</button>
          </div>
          <ModalBase
            :show="modalVisible"
            :value="filename"
            :fields="modalFields"
            title="Nombre del archivo"
            placeholder="Nombre archivo"
            @confirm="exportWithName"
            @cancel="modalVisible = false"
          />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { exportCSV, exportJSON, exportExcel } from '../utils/exportTable.js';
import ModalBase from './ModalBase.vue';
const filename = ref('tabla');
const modalVisible = ref(false);
let exportType = '';
const modalFields = ref([
  { name: 'filename', label: 'Nombre del archivo', type: 'text', placeholder: 'Nombre archivo' }
]);
function openModal(type) {
  exportType = type;
  modalVisible.value = true;
}
function exportWithName(data) {
  modalVisible.value = false;
  filename.value = data.filename;
  const name = data.filename;
  if (exportType === 'csv') {
    exportCSV(columns.value, rows.value, name.endsWith('.csv') ? name : name + '.csv');
  } else if (exportType === 'json') {
    exportJSON(rows.value, name.endsWith('.json') ? name : name + '.json');
  } else if (exportType === 'xls') {
    exportExcel(columns.value, rows.value, name.endsWith('.xls') ? name : name + '.xls');
  }
}
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
