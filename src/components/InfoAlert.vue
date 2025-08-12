<template>
  <div :class="alertClass" class="relative w-full max-w-2xl p-4 rounded-lg border shadow-sm mb-4">
    <button v-if="closable" @click="$emit('close')" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    <div class="flex items-center gap-2">
      <span v-if="icon" class="text-xl">{{ icon }}</span>
      <span class="font-semibold text-base">{{ title }}</span>
    </div>
    <div class="mt-2 text-sm text-base-content whitespace-pre-line">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: 'info' }, // info, warning, error, success
  title: { type: String, default: '' },
  icon: { type: String, default: '' },
  closable: { type: Boolean, default: false }
});

const alertClass = {
  'alert bg-blue-100 border-blue-300 text-blue-800': props.type === 'info',
  'alert bg-yellow-100 border-yellow-300 text-yellow-800': props.type === 'warning',
  'alert bg-red-100 border-red-300 text-red-800': props.type === 'error',
  'alert bg-green-100 border-green-300 text-green-800': props.type === 'success',
};
</script>
