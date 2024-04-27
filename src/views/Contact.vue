<template>
  <div class="min-h-full">
    <Navigation />
    <Header />

    <main class="min-w-0 border-t border-gray-200">
      <div class="px-6 py-4 md:px-12 bg-gray-300 overflow-hidden">
        <h2
          class="text-xl lg:text-xl text-center md:text-left text-blue-900 leading-tight font-medium"
        >
          Contact Page
        </h2>
      </div>
      <div
        v-for="message in messageList"
        :key="message._id"
        class="px-4 py-2 container mx-auto my-3"
      >
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Name</label
            >
            <p class="text-gray-700 text-base">{{ message.name }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Email</label
            >
            <p class="text-gray-700 text-base">{{ message.email }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Message</label
            >
            <p class="text-gray-700 text-base">{{ message.message }}</p>
            <button @click="deleteMessageUtil(message._id)" class="rounded my-2 px-3 py-2 bg-danger-900 text-white hover:bg-danger-300">
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useMessage } from "../store/message";
import Header from "../components/Header.vue";
import Navigation from "../components/Navigation.vue";

const messageStore = useMessage();

const messageList = computed(() => messageStore.getMessageList);
const isLoading = computed(() => messageStore.isLoading);

const deleteMessageUtil = async (id) => {
  await messageStore.deleteMessageAction(id);
  await messageStore.getMessagesAction();
};

onMounted(() => {
  messageStore.getMessagesAction();
});
</script>
