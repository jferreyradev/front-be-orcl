<template>
  <div class="flex items-center justify-center min-h-screen bg-white">
    <div class="w-full max-w-xs p-6 bg-white rounded-lg shadow border border-base-200">
      <h2 class="text-lg font-semibold text-center mb-6 text-gray-700">Iniciar sesión</h2>
      <form @submit.prevent="login" class="flex flex-col gap-3">
        <input ref="userInput" v-model="username" type="text" class="input input-bordered input-sm w-full bg-white text-black border-gray-400 focus:border-primary" placeholder="Usuario" required autofocus />
        <input v-model="password" type="password" class="input input-bordered input-sm w-full bg-white text-black border-gray-400 focus:border-primary" placeholder="Contraseña" required />
        <button class="btn btn-sm btn-primary w-full mt-2" type="submit" :disabled="loading">Entrar</button>
        <div v-if="error" class="text-error text-xs mt-2 text-center">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();
const auth = useAuthStore();
const userInput = ref(null);

onMounted(() => {
  if (userInput.value) {
    userInput.value.focus();
  }
});

async function login() {
  error.value = '';
  loading.value = true;
  try {
    await auth.login(username.value, password.value);
    router.push('/');
  } catch (e) {
    error.value = 'Usuario o contraseña incorrectos';
  } finally {
    loading.value = false;
  }
}
</script>
