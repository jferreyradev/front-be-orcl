<template>
  <div class="flex flex-col gap-8 w-full">
    <div class="bg-base-100 border border-base-300 rounded-xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-primary mb-4">Resultado de la consulta en JSON</h2>
      <slot name="json" />
    </div>
    <div class="bg-base-100 border border-base-300 rounded-xl p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-primary mb-4">Resultado de la consulta en tabla</h2>
      <slot name="table" />
    </div>
  </div>
</template>

<script setup>
// Este layout es solo de presentación, no requiere lógica
</script>
