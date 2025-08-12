import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ConsultasView from './views/ConsultasView.vue';
import HistorialView from './views/HistorialView.vue';
import ResultadosView from './views/ResultadosView.vue';
import ConfiguracionView from './views/ConfiguracionView.vue';
import InicioView from './views/InicioView.vue';
import { createPinia } from 'pinia';

const routes = [
  { path: '/', name: 'Inicio', component: InicioView },
  { path: '/consultas', name: 'Consultas', component: ConsultasView },
  { path: '/historial', name: 'Historial', component: HistorialView },
  { path: '/resultados', name: 'Resultados', component: ResultadosView },
  { path: '/configuracion', name: 'Configuración', component: ConfiguracionView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
