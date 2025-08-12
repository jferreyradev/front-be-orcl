<template>
  <div class="card bg-base-100 w-96 shadow-sm">
  <div class="card-body">
    <div class="flex flex-col gap-4">
       
        <label class="form-control w-full">
          <div class="label"><span class="label-text">URL</span></div>
          <input type="text" id="url" v-model="url" class="input input-bordered w-full" />
        </label>
        <label class="form-control w-full">
          <div class="label"><span class="label-text">Método</span></div>
          <select id="metodo" v-model="metodo" class="select select-bordered w-full">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
        </label>
        <label v-if="metodo === 'GET'" class="form-control w-full">
          <div class="label"><span class="label-text">Parámetro</span></div>
          <input type="text" id="parametro" v-model="parametro" class="input input-bordered w-full" />
        </label>
        <label v-if="metodo === 'POST'" class="form-control w-full">
          <div class="label"><span class="label-text">Cuerpo</span></div>
          <textarea
            id="body"
            v-model="body"
            class="textarea textarea-bordered w-full min-h-[120px]"
            placeholder='{
  "sql": "SELECT * FROM PRESENTACION WHERE PERIODO = :1 AND IDEMPLEADO = :2",
  "binds": ["202508", 123],
  "options": {}
}'
          ></textarea>
        </label>
    </div>
    <div class="card-actions justify-end">
      <button @click="consultarApi" class="btn btn-primary w-full mt-2" :disabled="loading">
          <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
          {{ loading ? 'Cargando...' : 'Consultar API' }}
        </button>
    </div>
  </div>
</div>

</template>

<script setup>
import { ref, watch } from 'vue';
import { useQueryHistory } from '../composables/useQueryHistory.js';
import { normalizeJson } from '../utils/normalizeJson.js';
import { useResultadoStore } from '../stores/resultado';
import { useApiFetch } from '../composables/useApiFetch.js';
import { usePeticionStore } from '../stores/peticion';

function isValidJson(str) {
  if (typeof str !== 'string') return false;
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return e.message || false;
  }
}

const props = defineProps({
  selectedQuery: { type: Object, default: null }
});
// Usaremos el store global en vez de emits
const resultadoStore = useResultadoStore();
const peticionStore = usePeticionStore();

const url = ref('http://localhost:8000/consulta');
const metodo = ref('GET');
const parametro = ref('');
const body = ref('');
const resultado = ref(null);
const error = ref(null);
const loading = ref(false);
const showError = ref(true);
const showWarning = ref(false);
const showInfo = ref(true);
const toast = ref({ show: false, type: 'info', message: '', icon: '', duration: 3000 });

const api = useApiFetch();
const { history, addQuery, clearHistory } = useQueryHistory();

watch(() => props.selectedQuery, (val) => {
  if (val) {
    url.value = val.url || '';
    metodo.value = val.metodo || 'GET';
    parametro.value = val.parametro || '';
    body.value = val.body || '';
  }
});
watch(error, (val) => {
  showError.value = !!val;
});
function closeError() {
  showError.value = false;
}

function showToast(type, message, icon = '', duration = 3000) {
  toast.value = { show: true, type, message, icon, duration };
}

async function consultarApi() {
  loading.value = true;
  resultadoStore.setLoading(true);
  resultadoStore.setResultado(null);
  error.value = null;
  resultado.value = null;
  // Validar JSON antes de enviar POST
  if (metodo.value === 'POST' && body.value) {
    const bodyObj = normalizeJson(body.value);
    if (bodyObj.error) {
      error.value = `El body no es un JSON válido: ${bodyObj.error}`;
      showToast('error', error.value, '⚠️');
      loading.value = false;
      resultadoStore.setLoading(false);
      return;
    }
  }
  try {
    const { result, error: apiError } = await api.fetchApi({
      url: url.value,
      method: metodo.value,
      body: metodo.value === 'POST' ? normalizeJson(body.value) : null,
      params: metodo.value === 'GET' ? parametro.value : ''
    });
    if (apiError) throw new Error(apiError);
    resultado.value = result;
    resultadoStore.setResultado(result);
    resultadoStore.setLoading(false);
    showToast('success', 'Consulta realizada con éxito', '✅');
    const peticionPayload = {
      url: url.value,
      metodo: metodo.value,
      parametro: parametro.value,
      body: metodo.value === 'POST' && body.value ? normalizeJson(body.value) : body.value
    };
    peticionStore.setPeticion(peticionPayload);
    addQuery(peticionPayload);
  } catch (e) {
    error.value = e.message;
    showToast('error', error.value, '⚠️');
    resultadoStore.setLoading(false);
  } finally {
    loading.value = false;
  }
}
</script>
