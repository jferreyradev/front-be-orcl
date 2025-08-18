<template>
  <div class="flex items-center gap-2">
    <label class="text-sm font-semibold">API:</label>
    <select v-model="selectedUrl" class="select select-bordered select-sm">
      <option v-for="api in apiUrls" :key="api.url" :value="api.url">{{ api.name }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useApiUrlStore } from '../stores/apiUrl.js';
import { apiUrls } from '../urls.js';

const apiUrlStore = useApiUrlStore();
const selectedUrl = ref(apiUrlStore.url || apiUrls[0].url);

onMounted(() => {
  if (!apiUrlStore.url) {
    apiUrlStore.setUrl(apiUrls[0].url);
  }
  selectedUrl.value = apiUrlStore.url;
});

watch(selectedUrl, (url) => {
  apiUrlStore.setUrl(url);
});
</script>
