<script setup>
import { ref, computed } from 'vue';
import { consultas } from '../consultas';
import { useApiFetch } from '../composables/useApiFetch';

const consultaSeleccionada = ref(Object.values(consultas)[0]);
const resultado = ref([]);
const loading = ref(false);
const error = ref(null);
const api = useApiFetch();

async function ejecutarConsulta() {
  loading.value = true;
  error.value = null;
  resultado.value = [];
  let url = consultaSeleccionada.value.url;
  let method = consultaSeleccionada.value.method || 'GET';
  let body = undefined;
  if (method === 'POST' && consultaSeleccionada.value.sql) {
    body = { sql: consultaSeleccionada.value.sql };
  }
  const { result, error: apiError } = await api.fetchApi({ url, method, body });
  if (Array.isArray(result)) {
    resultado.value = result;
  } else if (result && Array.isArray(result.data)) {
    resultado.value = result.data;
  } else {
    resultado.value = [];
  }
  error.value = apiError;
  loading.value = false;
}
</script>

<template>
  <div class="w-full max-w-3xl mx-auto p-8">
    <h2 class="text-2xl font-bold text-primary mb-6">Ejecutar consulta a la API</h2>
    <div class="flex flex-col md:flex-row gap-4 mb-6 items-center">
      <select v-model="consultaSeleccionada" class="select select-bordered w-full md:w-auto">
        <option v-for="(consulta, key) in consultas" :key="key" :value="consulta">
          {{ consulta.nombre }}
        </option>
      </select>
      <button @click="ejecutarConsulta" :disabled="loading" class="btn btn-primary">
        <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
        {{ loading ? 'Consultando...' : 'Ejecutar consulta' }}
      </button>
    </div>
    <div v-if="consultaSeleccionada.descripcion" class="mb-4 text-base text-gray-500">{{ consultaSeleccionada.descripcion }}</div>

  <ListadoTabla :items="resultado" title="Resultado de la consulta" />
    <div v-if="!resultado.length && !loading && !error" class="text-sm text-gray-400 mt-4">No hay datos para mostrar.</div>
    <div v-if="error" class="text-error mt-4">Error: {{ error }}</div>
  </div>
</template>
