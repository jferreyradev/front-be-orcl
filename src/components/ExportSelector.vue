<template>
  <div>
    <!-- Selección de columnas -->
    <div>
      <label v-for="col in columns" :key="col">
        <input
          type="checkbox"
          v-model="selectedColumns"
          :value="col"
        />
        {{ col }}
      </label>
    </div>

    <!-- Tabla con selección de filas -->
    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" @change="toggleAllRows" :checked="allRowsSelected" />
          </th>
          <th v-for="col in columns" :key="col">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in excelData" :key="i">
          <td>
            <input
              type="checkbox"
              v-model="selectedRows"
              :value="i"
            />
          </td>
          <td v-for="col in columns" :key="col">{{ row[col] }}</td>
        </tr>
      </tbody>
    </table>

    <button @click="exportSelected">Exportar seleccionados a Excel</button>
  </div>
    <div>
      <!-- Importar archivo -->
      <div class="mt-4">
        <input type="file" @change="handleImport" accept=".xlsx,.csv,.json" />
      </div>

      <!-- Preview de importación -->
      <div v-if="importPreview.length" class="mt-2">
        <h3 class="font-bold">Preview importado</h3>
        <div>
          <label v-for="col in importColumns" :key="col" class="mr-2">
            <input type="checkbox" v-model="selectedImportColumns" :value="col" />
            {{ col }}
          </label>
        </div>
        <table class="border">
          <thead>
            <tr>
              <th>
                <input type="checkbox" @change="toggleAllImportRows" :checked="allImportRowsSelected" />
              </th>
              <th v-for="col in importColumns" :key="col">{{ col }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in importPreview" :key="i">
              <td>
                <input type="checkbox" v-model="selectedImportRows" :value="i" />
              </td>
              <td v-for="col in importColumns" :key="col">{{ row[col] }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="confirmImport">Importar seleccionados</button>
      </div>

      <!-- Modal para exportar -->
      <div v-if="showExportModal" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div class="bg-white p-4 rounded shadow w-80">
          <h3 class="font-bold mb-2">Exportar seleccionados</h3>
          <label class="block mb-2">Nombre de archivo:
            <input v-model="exportFileName" class="border px-2 py-1 w-full" />
          </label>
          <label class="block mb-2">Tipo:
            <select v-model="exportFileType" class="border px-2 py-1 w-full">
              <option value="xlsx">Excel (.xlsx)</option>
              <option value="csv">CSV (.csv)</option>
              <option value="json">JSON (.json)</option>
            </select>
          </label>
          <div class="flex gap-2 justify-end">
            <button @click="doExport" class="bg-blue-500 text-white px-3 py-1 rounded">Exportar</button>
            <button @click="closeExportModal" class="bg-gray-300 px-3 py-1 rounded">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue'
import * as XLSX from 'xlsx'

// Emits para integración
const emit = defineEmits(['import', 'export'])

// Ejemplo de datos simulados (puedes pasar por props)
const excelData = ref([
  { Nombre: 'Ana', Edad: 24, Ciudad: 'Lima' },
  { Nombre: 'Luis', Edad: 30, Ciudad: 'Quito' },
  { Nombre: 'María', Edad: 28, Ciudad: 'Bogotá' }
])
const columns = ref(Object.keys(excelData.value[0]))

const selectedColumns = ref([...columns.value])
const selectedRows = ref([])
const allRowsSelected = computed(() => selectedRows.value.length === excelData.value.length)
const toggleAllRows = () => {
  if (allRowsSelected.value) {
    selectedRows.value = []
  } else {
    selectedRows.value = excelData.value.map((_, i) => i)
  }
}

// Modal exportar
const showExportModal = ref(false)
const exportFileName = ref('exportados')
const exportFileType = ref('xlsx')
const openExportModal = () => { showExportModal.value = true }
const closeExportModal = () => { showExportModal.value = false }

const doExport = () => {
  const rowsToExport = selectedRows.value.map(idx => excelData.value[idx])
  const exportData = rowsToExport.map(row =>
    Object.fromEntries(
      Object.entries(row).filter(([key]) => selectedColumns.value.includes(key))
    )
  )
  let filename = exportFileName.value.trim() || 'exportados'
  let ext = exportFileType.value
  if (ext === 'xlsx') {
    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Seleccionados')
    XLSX.writeFile(workbook, filename + '.xlsx')
  } else if (ext === 'csv') {
    const ws = XLSX.utils.json_to_sheet(exportData)
    const csv = XLSX.utils.sheet_to_csv(ws)
    downloadFile(csv, filename + '.csv', 'text/csv')
  } else if (ext === 'json') {
    downloadFile(JSON.stringify(exportData, null, 2), filename + '.json', 'application/json')
  }
  emit('export', { data: exportData, columns: selectedColumns.value, rows: selectedRows.value, type: ext, filename })
  closeExportModal()
}
function downloadFile(data, filename, mime) {
  const blob = new Blob([data], { type: mime })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  setTimeout(() => URL.revokeObjectURL(link.href), 1000)
}

// Importar archivo
const importPreview = ref([])
const importColumns = ref([])
const selectedImportColumns = ref([])
const selectedImportRows = ref([])
const allImportRowsSelected = computed(() => selectedImportRows.value.length === importPreview.value.length)
const toggleAllImportRows = () => {
  if (allImportRowsSelected.value) {
    selectedImportRows.value = []
  } else {
    selectedImportRows.value = importPreview.value.map((_, i) => i)
  }
}
const handleImport = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (evt) => {
    let data = evt.target.result
    let rows = []
    if (file.name.endsWith('.xlsx')) {
      const workbook = XLSX.read(data, { type: 'binary' })
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
      rows = XLSX.utils.sheet_to_json(firstSheet)
    } else if (file.name.endsWith('.csv')) {
      rows = XLSX.utils.sheet_to_json(XLSX.utils.csv_to_sheet(data))
    } else if (file.name.endsWith('.json')) {
      rows = JSON.parse(data)
    }
    importPreview.value = rows
    importColumns.value = rows.length ? Object.keys(rows[0]) : []
    selectedImportColumns.value = [...importColumns.value]
    selectedImportRows.value = rows.map((_, i) => i)
  }
  if (file.name.endsWith('.json')) {
    reader.readAsText(file)
  } else {
    reader.readAsBinaryString(file)
  }
}
const confirmImport = () => {
  const rowsToImport = selectedImportRows.value.map(idx => importPreview.value[idx])
  const importData = rowsToImport.map(row =>
    Object.fromEntries(
      Object.entries(row).filter(([key]) => selectedImportColumns.value.includes(key))
    )
  )
  emit('import', { data: importData, columns: selectedImportColumns.value, rows: selectedImportRows.value })
  // Limpiar preview
  importPreview.value = []
  importColumns.value = []
  selectedImportColumns.value = []
  selectedImportRows.value = []
}
</script>