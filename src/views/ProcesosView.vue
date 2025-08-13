<script setup>
import { ref, onMounted } from 'vue';
import ListadoTabla from '../components/ListadoTabla.vue';
import ConsultaLiquidacion from '../components/ConsultaLiquidacion.vue';
import { useApiFetch } from '../composables/useApiFetch.js';
import { consultas } from '../consultas.js';
import { useLiquidacionStore } from '../stores/liquidacion.js';

const procesos = ref([]);
const loading = ref(false);
const error = ref(null);
const api = useApiFetch();
const liquidacionStore = useLiquidacionStore();

const consultaSeleccionada = ref(consultas['procesos']);

async function consultarProcesos() {
  loading.value = true;
  const { result, error: apiError } = await api.fetchApi({ url: consultaSeleccionada.value.url, method: 'POST', body: { sql: consultaSeleccionada.value.sql } });
  if (Array.isArray(result)) {
    procesos.value = result;
  } else if (result && Array.isArray(result.data)) {
    procesos.value = result.data;
  } else {
    procesos.value = [];
  }
  error.value = apiError;
  loading.value = false;
}

// liquidacionStore.consulta tendrá el último valor guardado
</script>

<template>
    <ConsultaLiquidacion />
  <div class="w-full max-w-2xl mx-auto p-8">
    <h2 class="text-2xl font-bold text-primary mb-6">Procesos</h2>
    <button @click="consultarProcesos" :disabled="loading" class="btn btn-primary mb-6">
      <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
      {{ loading ? 'Consultando...' : 'Consultar procesos' }}
    </button>
  <ListadoTabla :items="procesos" title="Listado de procesos" />
  <div v-if="!procesos && !loading && !error" class="text-sm text-gray-400 mt-4">No hay procesos para mostrar.</div>
  <div v-if="error" class="text-error mt-4">Error: {{ error }}</div>
  
  </div>
</template>
