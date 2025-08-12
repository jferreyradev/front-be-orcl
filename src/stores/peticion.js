import { defineStore } from 'pinia';

export const usePeticionStore = defineStore('peticion', {
  state: () => ({
    peticion: null
  }),
  actions: {
    setPeticion(payload) {
      this.peticion = payload;
    },
    clearPeticion() {
      this.peticion = null;
    }
  }
});
