<script setup>
import { ref, computed, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";
import MainLayout from "./layouts/MainLayout.vue";
import { useResultadoStore } from "./stores/resultado";
import { useAuthStore } from "./stores/auth";
import LoginView from "./views/LoginView.vue";
import ApiUrlSelector from "./components/ApiUrlSelector.vue";
import { apiUrls } from "./urls.js";

import { useApiUrlStore } from "./stores/apiUrl.js";

const apiUrlStore = useApiUrlStore();
const auth = useAuthStore();

watch(
  () => auth.user,
  (val) => {
    console.log("auth.user cambiado:", val);
    console.log("isAuthenticated:", auth.isAuthenticated);
  }
);

const theme = ref("light");
function setTheme() {
  document.documentElement.setAttribute("data-theme", theme.value);
}

const resultadoStore = useResultadoStore();
const resultado = computed(() => resultadoStore.resultado);
const loading = computed(() => resultadoStore.loading);

const selectedApiUrl = ref(apiUrls[0].url);

function normalizeJson(data) {
  if (!data) return null;
  if (typeof data === "object") return data;
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
  <div>
    <LoginView v-if="!auth.isAuthenticated" />
    <MainLayout v-else>
      <template #header>
        <div class="flex items-center w-full">
          <h1 class="text-2xl font-semibold text-primary tracking-tight flex-1">
            API Demo
          </h1>
          <ApiUrlSelector />
          <select
            v-model="theme"
            @change="setTheme"
            class="select select-bordered w-[160px] bg-base-200 border-base-300 text-base-content ml-auto"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <div v-if="auth.isAuthenticated" class="flex items-center ml-4 gap-2">
            <span class="text-sm text-base-content">{{
              auth.user?.username
            }}</span>
            <button class="btn btn-sm btn-outline" @click="auth.logout()">
              Salir
            </button>
          </div>
        </div>
      </template>
      <template #sidebar>
        <nav class="flex flex-col gap-2 py-8 px-2 w-full">
          <router-link to="/" class="py-2 px-2 hover:bg-base-200 rounded"
            >Inicio</router-link
          >
          <ul class="menu bg-base-200 rounded-box w-56">
            <li>
              <details open>
                <summary>Liquidacion</summary>
                <ul>
                  <li>
                    <a>
                      <router-link
                        to="/procesos"
                        class="py-1 px-2 hover:bg-base-100 rounded"
                        >Procesos ejecutados</router-link
                      ></a
                    >
                  </li>
                  <li>
                    <a
                      ><router-link
                        to="/ejecutar-consulta"
                        class="py-1 px-2 hover:bg-base-100 rounded"
                        >Ejecutar consultas configuradas</router-link
                      ></a
                    >
                  </li>
                  <li>
                    <a>
                      <router-link
                        to="/ejecutar-sql"
                        class="py-1 px-2 hover:bg-base-100 rounded"
                        >Ejecutar SQL libre</router-link
                      >
                    </a>
                  </li>
                  <li>
                    <details open>
                      <summary>Parent</summary>
                      <ul>
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
            <ul class="menu bg-base-200 rounded-box w-56">
              <li>
                <details open>
                  <summary>Desarrollo</summary>
                  <ui>
                    <li>
                      <a>
                        <router-link
                          to="/ejecutar-sql"
                          class="py-1 px-2 hover:bg-base-100 rounded"
                          >Ejecutar SQL libre</router-link
                        >
                      </a>
                    </li>
                  </ui>
                </details>
              </li>
            </ul>

          <button
            v-if="auth.isAuthenticated"
            class="btn btn-sm btn-outline mt-4"
            @click="auth.logout()"
          >
            Salir
          </button>
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
        {{ apiUrlStore.url }}
        &copy; 2025 API Demo - Powered by Vue, Vite, DaisyUI
      </template>
    </MainLayout>
  </div>
</template>
