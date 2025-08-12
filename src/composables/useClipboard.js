// Composable para copiar texto al portapapeles
import { ref } from 'vue';

export function useClipboard() {
  const copied = ref(false);

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      copied.value = true;
      setTimeout(() => copied.value = false, 1500);
    } catch {
      copied.value = false;
    }
  }

  return { copy, copied };
}
