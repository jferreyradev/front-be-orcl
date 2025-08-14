import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async login(username, password) {
      // Simulación de login. Reemplaza por tu API real.
      if (username === 'admin' && password === 'admin') {
        this.$patch({
          user: { username },
        });
        localStorage.setItem('user', JSON.stringify({ username }));
      } else {
        throw new Error('Credenciales inválidas');
      }
    },
    logout() {
      this.$patch({
        user: null,
      });
      localStorage.removeItem('user');
    },
  },
});
