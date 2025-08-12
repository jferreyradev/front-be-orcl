<template>
  <div :data-theme="theme" class="min-h-screen bg-base-200 flex flex-col font-sans">
    <!-- Header -->
    <header class="w-full bg-base-100 border-b border-base-300 p-6 flex items-center justify-between shadow-sm">
      <slot name="header" />
    </header>
    <div class="flex flex-1 w-full">
      <!-- Panel lateral -->
      <aside class="hidden md:flex flex-col w-64 bg-base-100 border-r border-base-300 p-6 shadow-sm">
        <slot name="sidebar" />
      </aside>
      <!-- Main content -->
      <main class="flex-1 flex items-center justify-center">
        <div class="w-full max-w-3xl flex flex-col gap-12 px-4 py-10 md:px-10 md:py-14">
          <slot name="main" />
        </div>
      </main>
    </div>
    <!-- Sección de resultado -->
    <section class="w-full flex items-center justify-center py-6">
      <div class="w-full max-w-3xl">
        <slot name="result" />
      </div>
    </section>
    <!-- Footer -->
    <footer class="w-full bg-base-100 border-t border-base-300 p-6 text-center text-xs text-gray-400 tracking-wide shadow-sm">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const theme = ref('light');
</script>
