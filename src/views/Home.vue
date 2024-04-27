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
    <button class="bg-red-800 p-3 rounded text-white" @click="showData">
      Show Data
    </button>
    <div class="container my-3 mx-auto">
      <QuillEditor
          theme="snow"
          v-model:content="quillContent"
          contentType="html"
          ref="quill"
        />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Header from '../components/Header.vue'
import Navigation from '../components/Navigation.vue'

const showData = () => {
  console.log('Value of content ', content.value)
}

const quillContent = ref('')
const quill = ref()
</script>