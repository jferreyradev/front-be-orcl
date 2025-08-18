import { defineStore } from 'pinia';

export const useApiUrlStore = defineStore('apiUrl', {
  state: () => ({
    url: ''
  }),
  actions: {
    setUrl(newUrl) {
      this.url = newUrl;
    },
  }
});
