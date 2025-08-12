<template>
  <div class="mt-6">
    <button @click="toggle" class="btn btn-outline btn-sm mb-3">
      {{ abierto ? 'Ocultar historial' : 'Mostrar historial' }}
    </button>
    <div v-if="abierto">
      <h2 class="text-base font-semibold mb-2 text-primary">Historial</h2>
      <ul class="divide-y divide-base-300">
        <li v-for="(item, index) in history" :key="index" @click="selectQuery(item)"
            class="py-2 px-1 cursor-pointer hover:bg-base-200 transition-all">
          <div class="font-medium text-sm text-base-content">{{ item.url }}</div>
          <div class="text-xs text-gray-500">{{ item.metodo }}<span v-if="item.parametro"> | {{ item.parametro }}</span></div>
          <div v-if="item.body" class="text-xs text-gray-400 truncate">{{ item.body }}</div>
          <div class="timestamp text-xs text-gray-400 mt-1">{{ item.timestamp }}</div>
        </li>
      </ul>
      <button @click="clearHistory" class="btn btn-outline btn-xs mt-4">Limpiar</button>
    </div>
  </div>
</template>

<script setup>
import { useQueryHistory } from '../composables/useQueryHistory.js';
import { ref } from 'vue';
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
</script>
