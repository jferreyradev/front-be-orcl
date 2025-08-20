<template>
  <div>
    <input type="file" @change="handleImport" accept=".xlsx" />
    <div v-if="preview.length" class="mt-4">
      <h3 class="font-bold">Preview Excel</h3>
      <div class="mb-2 flex flex-wrap gap-4 items-center">
        <div class="flex items-center gap-2">
          <label class="text-xs">Fila inicial:</label>
          <input type="number" v-model="startRow" min="1" class="input input-bordered input-xs w-16" />
        </div>
        <div>
          <label v-for="col in columns" :key="col" class="mr-2">
            <input type="checkbox" v-model="selectedColumns" :value="col" />
            {{ col }}
          </label>
        </div>
      </div>
      <div class="overflow-auto max-h-64 border rounded">
        <table class="min-w-max w-full text-xs">
          <thead class="sticky top-0 bg-gray-100">
            <tr>
              <th class="bg-gray-50">
                <input type="checkbox" @change="toggleAllRows" :checked="allRowsSelected" />
              </th>
              <th v-for="col in selectedColumns" :key="col" class="bg-gray-50">{{ col }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in preview" :key="i">
              <td>
                <input type="checkbox" v-model="selectedRows" :value="i" />
              </td>
              <td v-for="col in selectedColumns" :key="col">{{ row[col] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
          <div class="flex flex-col gap-2 mt-2">
            <div class="flex items-center gap-2">
              <label class="text-xs">Nombre de archivo:</label>
              <input v-model="exportFileName" class="input input-bordered input-xs w-32" />
            </div>
            <div class="flex gap-2">
              <button @click="confirmImport" class="btn btn-primary">Importar seleccionados</button>
              <button @click="exportJson" class="btn btn-outline">Exportar a JSON</button>
              <button @click="exportCsv" class="btn btn-outline">Exportar a CSV</button>
              <button @click="exportExcel" class="btn btn-outline">Exportar a Excel</button>
            </div>
          </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, watch } from 'vue';
import * as XLSX from 'xlsx';

const startRow = ref(1);
const exportFileName = ref('exportado');
const selectedColumns = ref([]);
const selectedRows = ref([]);
const allRowsSelected = computed(() => selectedRows.value.length === preview.value.length);
const emit = defineEmits(['import']);
const preview = ref([]);
const columns = ref([]);
const rawRows = ref([]);

watch(selectedColumns, (newVal) => {
  if (rawRows.value.length) {
    processRows(rawRows.value);
  }
});

const toggleAllRows = () => {
  if (allRowsSelected.value) {
    selectedRows.value = []
  } else {
    selectedRows.value = preview.value.map((_, i) => i)
  }
}
const handleImport = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (evt) => {
    const data = evt.target.result
    const workbook = XLSX.read(data, { type: 'binary' })
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
  let allRows = XLSX.utils.sheet_to_json(firstSheet)
  processRows(allRows)
  rawRows.value = allRows
const rawRows = ref([])
function processRows(allRows) {
  let rows = allRows.slice(Math.max(0, startRow.value - 1))
  // recalcular columnas disponibles y seleccionadas
  columns.value = rows.length ? Object.keys(rows[0]) : []
  selectedColumns.value = [...columns.value]
  // recalcular filas seleccionables
  rows = rows.filter(row => selectedColumns.value.some(col => {
    const val = row[col];
    return val !== null && val !== undefined && String(val).trim() !== ''
  }))
  preview.value = rows
  selectedRows.value = rows.map((_, i) => i)
}

watch(startRow, () => {
  if (rawRows.value.length) {
    processRows(rawRows.value);
  }
});
  }
  reader.readAsBinaryString(file)
}
const confirmImport = () => {
  const rowsToImport = selectedRows.value.map(idx => preview.value[idx])
  const importData = rowsToImport.map(row =>
    Object.fromEntries(
      Object.entries(row).filter(([key]) => selectedColumns.value.includes(key))
    )
  )
  emit('import', { data: importData, columns: selectedColumns.value, rows: selectedRows.value })
  // Limpiar preview
  preview.value = []
  columns.value = []
  selectedColumns.value = []
  selectedRows.value = []
}

function exportJson() {
  const rowsToExport = selectedRows.value.map(idx => preview.value[idx])
  const exportData = rowsToExport.map(row =>
    Object.fromEntries(
      Object.entries(row).filter(([key]) => selectedColumns.value.includes(key))
    )
  )
  const json = JSON.stringify(exportData, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = (exportFileName.value.trim() || 'exportado') + '.json'
  link.click()
  setTimeout(() => URL.revokeObjectURL(link.href), 1000)
}

function exportCsv() {
  const rowsToExport = selectedRows.value.map(idx => preview.value[idx])
  const exportData = rowsToExport.map(row =>
    Object.fromEntries(
      Object.entries(row).filter(([key]) => selectedColumns.value.includes(key))
    )
  )
  const ws = XLSX.utils.json_to_sheet(exportData)
  const csv = XLSX.utils.sheet_to_csv(ws)
  const blob = new Blob([csv], { type: 'text/csv' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = (exportFileName.value.trim() || 'exportado') + '.csv'
  link.click()
  setTimeout(() => URL.revokeObjectURL(link.href), 1000)
}

function exportExcel() {
  const rowsToExport = selectedRows.value.map(idx => preview.value[idx])
  const exportData = rowsToExport.map(row =>
    Object.fromEntries(
      Object.entries(row).filter(([key]) => selectedColumns.value.includes(key))
    )
  )
  const worksheet = XLSX.utils.json_to_sheet(exportData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos')
  XLSX.writeFile(workbook, (exportFileName.value.trim() || 'exportado') + '.xlsx')
}
</script>
