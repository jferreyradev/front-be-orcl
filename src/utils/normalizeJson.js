// Función para normalizar un JSON
export function normalizeJson(json) {
  // Si es string, limpiar saltos de línea y espacios
  if (typeof json === 'string') {
    // Elimina saltos de línea y espacios al principio y final
    const cleaned = json.replace(/\n/g, '').trim();
    try {
      return JSON.parse(cleaned);
    } catch {
      return cleaned;
    }
  }
  // Si es objeto, aplicar lógica de normalización
  if (json && typeof json === 'object') {
    // Ejemplo: si el resultado viene anidado, solo mostrar la propiedad 'data' si existe
    if ('data' in json && Array.isArray(json.data)) {
      return json.data;
    }
    // Si tiene una propiedad 'resultado', mostrar solo esa
    if ('resultado' in json) {
      return json.resultado;
    }
  }
  return json;
}
