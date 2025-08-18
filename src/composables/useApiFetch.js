// Composable para llamadas a API
import { ref } from 'vue';

export function useApiFetch() {
  const loading = ref(false);
  const error = ref(null);
  const result = ref(null);

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
    // Fusionar headers personalizados
    const mergedHeaders = { ...defaultHeaders, ...headers };
    const options = { method, headers: mergedHeaders };
    if (method === 'POST' && body) {
      options.body = JSON.stringify(body);
    }
    try {
      console.log(apiUrl, options);
      const response = await fetch(apiUrl, options);
      const status = response.status;
      const text = await response.text();
      let json = null;
      try {
        json = JSON.parse(text);
      } catch (e) {
        error.value = 'Respuesta no es JSON válido';
        result.value = text;
        return { result: text, error: error.value, loading: loading.value, status };
      }
      if (!response.ok) throw new Error('No se pudo consultar la API');
      result.value = json;
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
