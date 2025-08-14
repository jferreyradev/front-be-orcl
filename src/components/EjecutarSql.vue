<template>
  <div class="w-full max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-md">
    <h2 class="text-xl font-semibold text-gray-800 mb-6">Ejecutar consulta SQL</h2>
    <form @submit.prevent="ejecutar" class="flex flex-col gap-4 mb-6">
      
      <textarea
        v-model="sql"
        class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300 min-h-[100px] bg-gray-50"
        placeholder="Escribe tu consulta SQL aquí..."
        required
      ></textarea>
      <div class="flex justify-end mt-2">
        <button type="submit" class="px-4 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50" :disabled="loading">
          <span v-if="loading" class="loading loading-spinner loading-xs mr-2"></span>
          {{ loading ? "Consultando..." : "Ejecutar consulta" }}
        </button>
      </div>
    </form>
    <ListadoTabla :items="resultado" title="Resultado" />
    <div v-if="!resultado.length && !loading && !error" class="text-xs text-gray-400 mt-4 text-center">No hay datos para mostrar.</div>
    <div v-if="error" class="text-xs text-red-500 mt-4 text-center">Error: {{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useApiFetch } from "../composables/useApiFetch.js";
import ListadoTabla from "./ListadoTabla.vue";

const sql = ref("");
const resultado = ref([]);
const loading = ref(false);
const error = ref(null);
const api = useApiFetch();

async function ejecutar() {
  loading.value = true;
  error.value = null;
  resultado.value = [];
  const { result, error: apiError } = await api.fetchApi({
    url: "http://localhost:9000/consulta",
    method: "POST",
    body: { sql: sql.value },
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
