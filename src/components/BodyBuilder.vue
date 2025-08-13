<template>
  <div class="w-full max-w-xl mx-auto p-6 bg-base-100 rounded shadow">
    <h2 class="text-lg font-bold mb-4">Armar body para consulta</h2>
    <form @submit.prevent>
      <label class="form-control mb-4">
        <span class="label-text mb-2">SQL</span>
        <textarea v-model="sql" class="textarea textarea-bordered min-h-[100px]" placeholder="Escribe tu consulta SQL aquí..." required></textarea>
      </label>
      <div class="mb-4">
        <span class="label-text mb-2">Parámetros (binds)</span>
        <div class="flex flex-col gap-2">
          <div v-for="(bind, idx) in binds" :key="idx" class="flex gap-2 items-center">
            <input v-model="binds[idx]" class="input input-bordered w-full" placeholder="Valor del parámetro" />
            <button type="button" class="btn btn-xs btn-error" @click="removeBind(idx)">✕</button>
          </div>
        </div>
        <button type="button" class="btn btn-xs btn-outline mt-2" @click="addBind">Agregar parámetro</button>
      </div>
      <label class="form-control mb-4">
        <span class="label-text mb-2">Options (JSON opcional)</span>
        <input v-model="optionsRaw" class="input input-bordered" placeholder='Ej: {"maxRows": 100}' />
      </label>
    </form>
    <div class="mt-6">
      <h3 class="text-base font-semibold mb-2">Body generado:</h3>
      <pre class="bg-base-200 rounded p-4 text-xs overflow-x-auto border border-primary">{{ bodyJson }}</pre>
      <button class="btn btn-outline btn-sm mt-2 mr-2" @click="copyBody">Copiar body</button>
      <button class="btn btn-outline btn-sm mt-2" @click="descargarBody">Descargar body</button>
      <span v-if="copiado" class="ml-2 text-success">¡Copiado!</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const sql = ref('');
const binds = ref([]);
const optionsRaw = ref('');
const copiado = ref(false);

function addBind() {
  binds.value.push('');
}
function removeBind(idx) {
  binds.value.splice(idx, 1);
}
const bodyJson = computed(() => {
  let options = {};
  try {
    options = optionsRaw.value ? JSON.parse(optionsRaw.value) : {};
  } catch {
    options = {};
  }
  return JSON.stringify({ sql: sql.value, binds: binds.value, options }, null, 2);
});
function copyBody() {
  navigator.clipboard.writeText(bodyJson.value);
  copiado.value = true;
  setTimeout(() => copiado.value = false, 1500);
}
function descargarBody() {
  const blob = new Blob([bodyJson.value], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'body-consulta.json';
  a.click();
  URL.revokeObjectURL(url);
}
</script>
