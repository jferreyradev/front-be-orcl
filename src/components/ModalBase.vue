<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
    <div class="bg-white rounded shadow-lg p-6 w-full max-w-xs">
      <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
      <slot name="content">
        <div v-for="(field, idx) in fields" :key="idx" class="mb-4">
          <label class="block text-sm mb-1">{{ field.label }}</label>
          <input
            :ref="el => setInputRef(el, idx)"
            v-model="form[field.name]"
            :type="field.type || 'text'"
            class="input input-bordered w-full"
            :placeholder="field.placeholder || ''"
            @keydown.enter.prevent="confirmar"
            @keydown.esc.prevent="emit('cancel')"
          />
        </div>
      </slot>
      <div class="flex gap-2 justify-end">
        <button class="btn btn-sm btn-outline" @click="$emit('cancel')">Cancelar</button>
        <button class="btn btn-sm btn-primary" @click="confirmar">Aceptar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';
const emit = defineEmits(['confirm', 'cancel']);
const inputRef = ref(null);
function setInputRef(el, idx) {
  if (idx === 0) inputRef.value = el;
}
const props = defineProps({
  show: Boolean,
  value: String,
  title: { type: String, default: 'Modal' },
  placeholder: { type: String, default: '' },
  fields: { type: Array, default: () => [{ name: 'value', label: 'Valor', type: 'text', placeholder: '' }] }
});
const form = ref({});
watch(() => props.value, v => form.value[props.fields[0]?.name || 'value'] = v);
watch(() => props.show, (show) => {
  if (show) {
    nextTick(() => {
      if (inputRef.value && inputRef.value.focus) {
        inputRef.value.focus();
        inputRef.value.select && inputRef.value.select();
      }
    });
  }
});
onMounted(() => {
  if (props.show) {
    nextTick(() => {
      if (inputRef.value && inputRef.value.focus) {
        inputRef.value.focus();
        inputRef.value.select && inputRef.value.select();
      }
    });
  }
});
watch(() => props.fields, (fields) => {
  fields.forEach(f => {
    if (!(f.name in form.value)) form.value[f.name] = '';
  });
});
function confirmar() {
  emit('confirm', { ...form.value });
}
</script>
