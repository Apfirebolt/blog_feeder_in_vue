<template>
  <div class="min-h-full">
    <Navigation />
    <Header />

    <main class="pt-8 pb-16">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="px-4 sm:px-0">
          <h2 class="text-lg font-medium text-gray-900">Home</h2>
        </div>
      </div>
    </main>
    <p>
      A new content {{ quillContent }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Navigation from '../components/Navigation.vue'
</script>