// Función para formatear un objeto/JSON
export function formatJson(obj) {
  if (!obj) return '';
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
}
