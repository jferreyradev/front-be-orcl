// Composable para llamadas a API
import { ref } from 'vue';

export function useApiFetch() {
  const loading = ref(false);
  const error = ref(null);
  const result = ref(null);

  async function fetchApi({ url, method = 'GET', body = null, params = '' }) {
    loading.value = true;
    error.value = null;
    result.value = null;
    let apiUrl = url;
    if (method === 'GET' && params) {
      apiUrl += `/${params}`;
    }
    const options = { method };
    if (method === 'POST') {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(body);
    }
    try {
      const response = await fetch(apiUrl, options);
      if (!response.ok) throw new Error('No se pudo consultar la API');
      result.value = await response.json();
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
    return { result: result.value, error: error.value, loading: loading.value };
  }

  return { fetchApi, loading, error, result };
}
