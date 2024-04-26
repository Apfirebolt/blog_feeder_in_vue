<template>
    <main class="min-w-0 border-t border-gray-200">
      <div
        class="px-6 py-4 md:px-12 bg-gray-300 overflow-hidden"
      >
        <h2
          class="text-4xl lg:text-5xl text-center md:text-left text-blue-900 leading-tight font-medium"
        >
          Contact Page
        </h2>
      </div>
    </main>
  </template>
  
<script setup>
import { ref, computed, onMounted } from "vue";
import { useMessage } from "../store/message";

const messageStore = useMessage();

const messageList = computed(() => messageStore.getMessageList);
const isLoading = computed(() => messageStore.isLoading);

onMounted(() => {
  messageStore.getMessagesAction();
});
</script>
  