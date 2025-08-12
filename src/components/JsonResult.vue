<template>
  <div class="card w-96 bg-base-100 card-xs shadow-sm">
    <div class="card-body">
      <h2 v-if="title" class="card-title">{{ title }}</h2>
      <template v-if="formattedJson && formattedJson.trim()">
        <pre class="bg-base-200 rounded p-4 text-xs overflow-x-auto border-2 border-primary resize both max-h-[60vh] min-h-[120px]" style="resize: both;"><code>{{ formattedJson }}</code></pre>
      </template>
      <template v-else>
        <div class="text-sm text-gray-400 mt-4">Sin datos para mostrar.</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { formatJson } from '../utils/formatJson';
const props = defineProps({
  json: { type: [Object, Array, String], default: null },
  title: { type: String, default: '' }
});

watch(() => props.json, (val) => {
  console.log('JsonResult.vue - json prop:', val);
});

const formattedJson = computed(() => {
  return formatJson(props.json);
});
</script>


