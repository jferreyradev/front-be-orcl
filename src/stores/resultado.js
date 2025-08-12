import { defineStore } from 'pinia';

export const useResultadoStore = defineStore('resultado', {
  state: () => ({
    resultado: null,
    loading: false
  }),
  actions: {
    setResultado(data) {
      this.resultado = data;
    },
    setLoading(val) {
      this.loading = val;
    },
    clear() {
      this.resultado = null;
      this.loading = false;
    }
  }
});
