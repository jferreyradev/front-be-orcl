
<template>
  <div class="w-full max-w-2xl mx-auto p-8">
    <h2 class="text-2xl font-bold text-primary mb-6">Resultados</h2>
    <ResultLayout>
      <template #json>
        <div v-if="loading" class="flex items-center justify-center h-32">
          <span class="loading loading-spinner loading-lg text-primary"></span>
          <span class="ml-4 text-base text-primary">Cargando resultado...</span>
        </div>
        <JsonResult v-else :json="normalizeJson(resultado)" />
        <div v-if="!resultado && !loading" class="text-sm text-gray-400 mt-4">No hay resultado para mostrar.</div>
      </template>
      <template #table>
        <div v-if="loading" class="flex items-center justify-center h-32">
          <span class="loading loading-spinner loading-lg text-primary"></span>
          <span class="ml-4 text-base text-primary">Cargando tabla...</span>
        </div>
        <DataTable v-else :data="getTableData()" />
        <div v-if="!getTableData().length && !loading" class="text-sm text-gray-400 mt-4">No hay datos para mostrar.</div>
      </template>
    </ResultLayout>
  </div>
</template>

<script setup>
import ResultLayout from '../layouts/ResultLayout.vue';
import JsonResult from '../components/JsonResult.vue';
import DataTable from '../components/DataTable.vue';
import { useResultadoStore } from '../stores/resultado';
import { computed } from 'vue';

const resultadoStore = useResultadoStore();
const resultado = computed(() => resultadoStore.resultado);
const loading = computed(() => resultadoStore.loading);

function normalizeJson(data) {
  if (!data) return null;
  if (typeof data === 'object') return data;
  try {
    return JSON.parse(data);
  } catch {
    return { raw: data };
  }
}

function getTableData() {
  if (!resultado.value) return [];
  if (Array.isArray(resultado.value.data)) return resultado.value.data;
  if (Array.isArray(resultado.value)) return resultado.value;
  return [];
}
</script>
