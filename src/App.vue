<script setup>

import { ref, computed } from "vue";
import { RouterLink } from 'vue-router';
import MainLayout from "./layouts/MainLayout.vue";
import { useResultadoStore } from "./stores/resultado";

const theme = ref("light");
function setTheme() {
  document.documentElement.setAttribute("data-theme", theme.value);
}

const resultadoStore = useResultadoStore();
const resultado = computed(() => resultadoStore.resultado);
const loading = computed(() => resultadoStore.loading);

function normalizeJson(data) {
  if (!data) return null;
  if (typeof data === 'object') return data;
  try {
    return JSON.parse(data);
  } catch {
    return { raw: data };
  }
}

function getTableData() {
  if (!resultado.value) return [];
  if (Array.isArray(resultado.value.data)) return resultado.value.data;
  if (Array.isArray(resultado.value)) return resultado.value;
  return [];
}

</script>

<template>
  <MainLayout>
    <template #header>
      <h1 class="text-2xl font-semibold text-primary tracking-tight">
        API Demo
      </h1>
      <select
        v-model="theme"
        @change="setTheme"
        class="select select-bordered w-[160px] bg-base-200 border-base-300 text-base-content ml-auto"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </template>
    <template #sidebar>
      <nav class="flex flex-col gap-4">
        <h2 class="text-base font-semibold text-primary mb-2">Opciones</h2>
        <router-link to="/" class="link link-hover text-base-content">Inicio</router-link>
        <router-link to="/consultas" class="link link-hover text-base-content">Consultas API</router-link>
        <router-link to="/configuracion" class="link link-hover text-base-content">Configuración</router-link>
      </nav>
    </template>
    <template #main>
      <router-view />
    </template>
    <template #result>
      <div v-if="loading" class="flex items-center justify-center h-32">
        <span class="loading loading-spinner loading-lg text-primary"></span>
        <span class="ml-4 text-base text-primary">Cargando resultado...</span>
      </div>
      
      <JsonResult v-else-if="resultado" :json="normalizeJson(resultado)" />
      <div v-else class="text-sm text-gray-400 mt-4">No hay resultado para mostrar.</div>
    </template>
    <template #footer>
      &copy; 2025 API Demo - Powered by Vue, Vite, DaisyUI
    </template>
  </MainLayout>
</template>
