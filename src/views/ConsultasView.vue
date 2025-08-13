<template>
  <div class="w-full max-w-2xl mx-auto p-8">
    <h2 class="text-2xl font-bold text-primary mb-6">Consulta de API</h2>
    <ApiQuery />
    <div class="mt-8">
      <JsonResult v-if="!loading && resultado" :json="resultado" />
      <div v-else-if="loading" class="text-primary">Cargando...</div>
      <div v-else class="text-sm text-gray-400 mt-4">
        No hay resultado para mostrar.
      </div>
      <DataTable
        v-if="!loading && getTableData(resultado).length"
        :data="getTableData(resultado)"
        class="mt-8"
      />
      <button
        v-if="resultado"
        @click="descargarConsulta"
        class="btn btn-outline btn-sm mt-6"
      >
        Descargar consulta
      </button>
      <button
        v-if="peticion"
        @click="descargarPeticion"
        class="btn btn-outline btn-sm mt-2"
      >
        Descargar petición
      </button>
      <div v-if="peticion && peticion.body" class="mt-6">
        <h3 class="text-base font-semibold mb-2">
          Body de la petición (JSON):
        </h3>
        <pre
          class="bg-base-200 rounded p-4 text-xs overflow-x-auto border border-primary"
        >
          {{ formatJson(peticion.body) }}
        </pre>
        <button @click="copiarBody" class="btn btn-outline btn-xs mt-2">
          Copiar body
        </button>
      </div>
      <div v-if="peticion" class="mt-6">
        <h3 class="text-base font-semibold mb-2">Headers de la petición:</h3>
        <div class="text-xs text-gray-700 mb-1">
          Content-Type:
          <span class="font-mono">{{ peticion.contentType }}</span>
        </div>
        <div class="text-xs text-gray-700 mb-1">
          Bearer:
          <span class="font-mono">{{ peticion.bearer }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ApiQuery from "../components/ApiQuery.vue";
import JsonResult from "../components/JsonResult.vue";
import DataTable from "../components/DataTable.vue";
import { useResultadoStore } from "../stores/resultado";
import { usePeticionStore } from "../stores/peticion";
import { computed } from "vue";
import { useClipboard } from "../composables/useClipboard";
import { formatJson } from "../utils/formatJson";

const resultadoStore = useResultadoStore();
const resultado = computed(() => resultadoStore.resultado);
const loading = computed(() => resultadoStore.loading);

// Guardar la última petición realizada
const peticionStore = usePeticionStore();
const peticion = computed(() => peticionStore.peticion);
const { copy, copied } = useClipboard();

function getTableData(data) {
  console.log("getTableData", data);
  if (!data) return [];
  // Si es array directamente
  if (Array.isArray(data)) return data;
  // Si tiene propiedad 'data' y es array
  if (Array.isArray(data.data)) return data.data;
  // Buscar cualquier propiedad que sea array
  for (const key in data) {
    if (Array.isArray(data[key])) return data[key];
  }
  return [];
}

function descargarConsulta() {
  const blob = new Blob([JSON.stringify(resultado.value, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "consulta.json";
  a.click();
  URL.revokeObjectURL(url);
}

function descargarPeticion() {
  const peticionConRequiriment = {
    ...peticion.value,
    requiriment: {
      url: peticion.value?.url || "",
      method: peticion.value?.metodo || "",
      params: peticion.value?.parametro || "",
      body: peticion.value?.body || "",
    },
  };
  const blob = new Blob([JSON.stringify(peticionConRequiriment, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "peticion.json";
  a.click();
  URL.revokeObjectURL(url);
}

function copiarBody() {
  if (peticion.value && peticion.value.body) {
    copy(formatJson(peticion.value.body));
  }
}
</script>
