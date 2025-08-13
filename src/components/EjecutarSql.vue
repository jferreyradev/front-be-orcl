<template>
  <div class="w-full max-w-2xl mx-auto p-8">
    <h2 class="text-2xl font-bold text-primary mb-6">Ejecutar consulta SQL</h2>
    <form @submit.prevent="ejecutar" class="flex flex-col gap-4 mb-6">
      <label class="form-control">
        <span class="label-text mb-2">Consulta SQL</span>
        <textarea v-model="sql" class="textarea textarea-bordered min-h-[120px]" placeholder="Escribe tu consulta SQL aquí..." required></textarea>
      </label>
      <button type="submit" class="btn btn-primary" :disabled="loading">
        <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
        {{ loading ? 'Consultando...' : 'Ejecutar consulta' }}
      </button>
    </form>
    <ListadoTabla :items="resultado" title="Resultado" />
    <div v-if="!resultado.length && !loading && !error" class="text-sm text-gray-400 mt-4">No hay datos para mostrar.</div>
    <div v-if="error" class="text-error mt-4">Error: {{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useApiFetch } from '../composables/useApiFetch.js';
import ListadoTabla from './ListadoTabla.vue';

const sql = ref('');
const resultado = ref([]);
const loading = ref(false);
const error = ref(null);
const api = useApiFetch();

async function ejecutar() {
  loading.value = true;
  error.value = null;
  resultado.value = [];
  const { result, error: apiError } = await api.fetchApi({
    url: 'http://localhost:9000/consulta',
    method: 'POST',
    body: { sql: sql.value }
  });
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
