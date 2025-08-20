<template>
  <div v-if="!jsonValido" class="text-error text-xs mb-2">
    El texto no es un JSON válido.
  </div>
  <div class="border rounded p-4 mt-8">
    <h2 class="font-bold mb-2 text-primary">Ejecutar procedimiento</h2>
    <div>
      <div class="mb-2">
        <label class="block text-xs mb-1">Texto a convertir a JSON</label>
        <textarea
          v-model="texto"
          rows="6"
          class="textarea textarea-bordered w-full font-mono text-xs"
          placeholder='{"procedimiento": "NOMBRE", "params": [{"nombre": "p1", "valor": "v1"}]}'
        ></textarea>
        <div class="flex gap-2 mt-2">
          <button type="button" @click="convertirAJson" class="btn btn-outline">
            Convertir a JSON
          </button>         
        </div>
      </div>
    </div>
    <div v-if="jsonConvertido" class="mt-2">
      <label class="block text-xs mb-1">Resultado JSON</label>
      <pre class="bg-base-200 p-2 rounded text-xs overflow-auto">{{
        jsonConvertido
      }}</pre>
    </div>
    <div v-if="resultado" class="mt-4">
      <h3 class="font-bold text-xs mb-2">Resultado</h3>
      <pre class="bg-base-200 p-2 rounded text-xs overflow-auto">{{
        resultado
      }}</pre>
    </div>
    <div class="flex gap-2 mt-2">
      <button @click="ejecutar" class="btn btn-primary" :disabled="!jsonValido">
        Ejecutar procedimiento
      </button>
    </div>
  </div>
</template>

<script setup>
const jsonValido = ref(true);
const texto = ref("");
const jsonConvertido = ref("");

function convertirAJson() {
  try {
    const obj = JSON.parse(texto.value);
    jsonConvertido.value = JSON.stringify(obj, null, 2);
    jsonValido.value = true;
  } catch (err) {
    jsonConvertido.value = "Error: " + err.message;
    jsonValido.value = false;
  }
}
import { ref } from "vue";
import { useApiFetch } from "../composables/useApiFetch.js";
import { useApiUrlStore } from "../stores/apiUrl.js";

const apiUrlStore = useApiUrlStore();
const resultado = ref("");

const loading = ref(false);
const error = ref(null);
const api = useApiFetch();

async function ejecutar() {
  if (!jsonValido.value) return;
  loading.value = true;
  error.value = null;
  resultado.value = [];
  let bodyJson;
  try {
    bodyJson = JSON.parse(texto.value);
  } catch (e) {
    error.value = "JSON inválido";
    loading.value = false;
    return;
  }
  const { result, error: apiError } = await api.fetchApi({
    url: `${apiUrlStore.url}procedimiento`,
    method: "POST",
    body: bodyJson,
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
