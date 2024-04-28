<template>
  <div class="min-h-full">
    <Navigation />
    <Header :page-heading="pageHeading" />

    <Loader v-if="isLoading" />
    <main
      v-else
      class="min-w-0 border-t border-gray-200"
    >
      <div class="container mx-auto my-2">
        <button
          class="py-2 px-4 bg-slate-300 hover:bg-slate-600 hover:text-white transition-all rounded"
          @click="openMessageForm"
        >
          Add Message
        </button>
      </div>
      <div
        v-for="message in messageList"
        :key="message._id"
        class="py-2 container mx-auto my-3"
      >
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <p class="text-gray-700 text-base">
              {{ message.name }}
            </p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <p class="text-gray-700 text-base">
              {{ message.email }}
            </p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Message</label>
            <p class="text-gray-700 text-base">
              {{ message.message }}
            </p>
            <button
              class="rounded my-2 px-3 py-2 bg-danger-900 text-white hover:bg-danger-300"
              @click="deleteMessageUtil(message._id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
    <TransitionRoot
      appear
      :show="isFormOpen"
      as="template"
    >
      <Dialog
        as="div"
        class="relative z-10"
        @close="setIsFormOpened"
      >
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <ContactForm
                  :add-message-util="addMessageUtil"
                  @close="setIsFormOpened"
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useMessage } from "../store/message";
import Header from "../components/Header.vue";
import Navigation from "../components/Navigation.vue";
import Loader from "../components/Loader.vue";
import ContactForm from "../components/forms/ContactForm.vue";

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";

const messageStore = useMessage();
const isFormOpen = ref(false);
const pageHeading = ref("Contact Page");

const messageList = computed(() => messageStore.getMessageList);
const isLoading = computed(() => messageStore.isLoading);

const deleteMessageUtil = async (id) => {
  await messageStore.deleteMessageAction(id);
  await messageStore.getMessagesAction();
};

const openMessageForm = () => {
  isFormOpen.value = true;
};

const setIsFormOpened = () => {
  isFormOpen.value = false;
};

const addMessageUtil = async (payload) => {
  isFormOpen.value = false;
  await messageStore.addMessageAction(payload);
  await messageStore.getMessagesAction();
};

onMounted(() => {
  messageStore.getMessagesAction();
});
</script>
