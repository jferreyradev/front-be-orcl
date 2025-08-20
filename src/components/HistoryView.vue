<template>
  <div class="mt-6">
    <button @click="toggle" class="btn btn-outline btn-sm mb-3">
      {{ abierto ? 'Ocultar historial' : 'Mostrar historial' }}
    </button>
    <div v-if="abierto">
      <h2 class="text-base font-semibold mb-2 text-primary">Historial</h2>
            <div class="mb-2 flex flex-wrap gap-2">
              <label v-for="col in allColumns" :key="col" class="text-xs">
                <input type="checkbox" v-model="selectedColumns" :value="col" /> {{ col }}
              </label>
            </div>
            <div class="overflow-x-auto">
              <table class="table table-sm w-full border">
                <thead>
                  <tr>
                    <th></th>
                    <th v-for="col in selectedColumns" :key="col">{{ col }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in history" :key="index" @click="selectQuery(item)" class="cursor-pointer hover:bg-base-200">
                    <td><input type="radio" name="selectedRow" :value="index" v-model="selectedRow" /></td>
                    <td v-for="col in selectedColumns" :key="col">
                      <span v-if="col === 'headers'">{{ formatHeaders(item[col]) }}</span>
                      <span v-else>{{ item[col] }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
      <button @click="clearHistory" class="btn btn-outline btn-xs mt-4">Limpiar</button>
    </div>
  </div>
</template>

<script setup>
import { useQueryHistory } from '../composables/useQueryHistory.js';
import { ref, computed } from 'vue';
const { history, clearHistory } = useQueryHistory();

const emit = defineEmits(['select-query']);

const abierto = ref(true);
function toggle() {
  abierto.value = !abierto.value;
}

function selectQuery(item) {
  emit('select-query', item);
}

function formatHeaders(headers) {
  if (typeof headers === 'object') {
    return JSON.stringify(headers, null, 2);
  }
  return headers;
}

// Columnas disponibles y seleccionadas
const allColumns = computed(() => {
  if (!history.value.length) return [];
  return Object.keys(history.value[0]);
});
const selectedColumns = ref([]);
const selectedRow = ref(null);

// Inicializar columnas seleccionadas al cargar historial
if (history.value.length && selectedColumns.value.length === 0) {
  selectedColumns.value = Object.keys(history.value[0]);
}
</script>
