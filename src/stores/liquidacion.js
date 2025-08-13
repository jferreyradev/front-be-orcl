import { defineStore } from 'pinia';

export const useLiquidacionStore = defineStore('liquidacion', {
  state: () => ({
    consulta: null
  }),
  actions: {
    setConsulta(payload) {
      this.consulta = payload;
    },
    clearConsulta() {
      this.consulta = null;
    }
  }
});
