<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="bg-white rounded shadow-lg p-6 w-full max-w-xs">
      <h3 class="text-lg font-semibold mb-4">Nombre del archivo</h3>
      <input v-model="nombre" type="text" class="input input-bordered w-full mb-4" :placeholder="placeholder" />
      <div class="flex gap-2 justify-end">
        <button class="btn btn-sm btn-outline" @click="$emit('cancel')">Cancelar</button>
        <button class="btn btn-sm btn-primary" @click="confirmar">Aceptar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  show: Boolean,
  value: String,
  placeholder: { type: String, default: 'Nombre del archivo' }
});
const nombre = ref(props.value || '');
watch(() => props.value, v => nombre.value = v);
function confirmar() {
  if (!nombre.value) return;
  // Emitir el nombre ingresado
  $emit('confirm', nombre.value);
}
</script>
