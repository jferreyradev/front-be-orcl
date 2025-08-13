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
      <nav class="flex flex-col gap-2 py-8 px-2 w-full">
        <router-link to="/" class="py-2 px-2 hover:bg-base-200 rounded">Inicio</router-link>
        
        <details open class="w-full">
          <summary class="py-2 px-2 font-semibold cursor-pointer hover:bg-base-200 rounded">Liquidación</summary>
          <ul class="ml-4 mt-1 flex flex-col gap-1">
            <li><router-link to="/procesos" class="py-1 px-2 hover:bg-base-100 rounded">Procesos ejecutados</router-link></li>
            <li><router-link to="/ejecutar-consulta" class="py-1 px-2 hover:bg-base-100 rounded">Ejecutar consulta</router-link></li>
            <li><router-link to="/ejecutar-sql" class="py-1 px-2 hover:bg-base-100 rounded">Ejecutar SQL libre</router-link></li>
          </ul>
        </details>
        <details class="w-full">
          <summary class="py-2 px-2 font-semibold cursor-pointer hover:bg-base-200 rounded">Desarrollo</summary>
          <ul class="ml-4 mt-1 flex flex-col gap-1">
            <li><router-link to="/consultas" class="py-1 px-2 hover:bg-base-100 rounded">Consultas API</router-link></li>
          </ul>
        </details>
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
    </template>
    <template #footer>
      &copy; 2025 API Demo - Powered by Vue, Vite, DaisyUI
    </template>
  </MainLayout>
</template>
