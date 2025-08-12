import { ref } from 'vue';

const history = ref([]);

function addQuery(query) {
  history.value.unshift({
    ...query,
    timestamp: new Date().toISOString(),
  });
  // Limita a las últimas 20 consultas
  if (history.value.length > 20) history.value.pop();
}

function clearHistory() {
  history.value = [];
}

export function useQueryHistory() {
  return {
    history,
    addQuery,
    clearHistory,
  };
}
