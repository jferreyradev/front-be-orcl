<template>
  <form @submit.prevent="onSubmit" class="flex flex-row items-end gap-4 w-full max-w-xl mx-auto p-4">
    <div class="flex flex-col">
      <label class="label-text mb-1">Tipo de liquidación</label>
      <input v-model="tipoLiquidacion" type="text" class="input input-bordered" placeholder="Ej: 1, 2, 3..." required />
    </div>
    <div class="flex flex-col">
      <label class="label-text mb-1">Grupo adicional</label>
      <input v-model.number="grupoAdicional" type="number" min="1" class="input input-bordered" placeholder="Entero positivo" required />
    </div>
    <div class="flex flex-col">
      <label class="label-text mb-1">Mes</label>
      <select v-model="mes" class="select select-bordered" required>
        <option disabled value="">Mes</option>
        <option v-for="m in meses" :key="m.value" :value="m.value">{{ m.label }}</option>
      </select>
    </div>
    <div class="flex flex-col">
      <label class="label-text mb-1">Año</label>
      <input v-model="anio" type="number" min="2000" max="2100" class="input input-bordered w-24" placeholder="Año" required />
    </div>
    <button type="submit" class="btn btn-primary">Fijar</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useLiquidacionStore } from '../stores/liquidacion.js';
const liquidacionStore = useLiquidacionStore();
const tipoLiquidacion = ref('');
const grupoAdicional = ref(1);
const mes = ref('');
const anio = ref(new Date().getFullYear());
const meses = [
  { value: '01', label: 'Enero' },
  { value: '02', label: 'Febrero' },
  { value: '03', label: 'Marzo' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Mayo' },
  { value: '06', label: 'Junio' },
  { value: '07', label: 'Julio' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Septiembre' },
  { value: '10', label: 'Octubre' },
  { value: '11', label: 'Noviembre' },
  { value: '12', label: 'Diciembre' }
];

function onSubmit() {
  const payload = {
    tipoLiquidacion: tipoLiquidacion.value,
    grupoAdicional: grupoAdicional.value,
    periodo: `01/${mes.value}/${anio.value}` // Ejemplo: 202508
  };
  liquidacionStore.setConsulta(payload);
  console.log('Consulta guardada en store:', payload);
}
</script>
