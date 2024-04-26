<template>
    <main class="min-w-0 border-t border-gray-200">
      <div
        class="px-6 py-4 md:px-12 bg-gray-300 overflow-hidden"
      >
        <h2
          class="text-4xl lg:text-5xl text-center md:text-left text-blue-900 leading-tight font-medium"
        >
          Blog Page
        </h2>
      </div>
      <div v-for="post in blogList" :key="post._id" class="px-4 py-2 container mx-auto my-3">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {{ post.title }}
        </div>
      </div>
    </main>
  </template>
  
<script setup>
import { ref, computed, onMounted } from "vue";
import { useBlog } from "../store/blog";

const blogStore = useBlog();

const blogList = computed(() => blogStore.getBlogList);
const isLoading = computed(() => blogStore.isLoading);

onMounted(() => {
    blogStore.getBlogsAction();
});
</script>
  