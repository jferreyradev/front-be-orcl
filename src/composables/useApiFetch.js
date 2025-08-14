// Composable para llamadas a API
import { ref } from 'vue';
// ...existing code...

export function useApiFetch() {
  const loading = ref(false);
  const error = ref(null);
  const result = ref(null);

  // ...existing code...
  async function fetchApi({ url, method = 'GET', body = null, params = '', headers = {} }) {
    loading.value = true;
    error.value = null;
    result.value = null;
    let apiUrl = url;
    if (method === 'GET' && params) {
      apiUrl += `/${params}`;
    }
    const defaultHeaders = {};
    if (method === 'POST') {
      defaultHeaders['Content-Type'] = 'application/json';
    }
  // ...existing code...
    // Fusionar headers personalizados
    const mergedHeaders = { ...defaultHeaders, ...headers };
    const options = { method, headers: mergedHeaders };
    if (method === 'POST' && body) {
      options.body = JSON.stringify(body);
    }
    try {
      const response = await fetch(apiUrl, options);
      const status = response.status;
      if (!response.ok) throw new Error('No se pudo consultar la API');
      result.value = await response.json();
      return { result: result.value, error: error.value, loading: loading.value, status };
    } catch (e) {
      error.value = e.message;
      return { result: null, error: error.value, loading: loading.value, status: null };
    } finally {
      loading.value = false;
    }
  }

  return { fetchApi, loading, error, result };
}
