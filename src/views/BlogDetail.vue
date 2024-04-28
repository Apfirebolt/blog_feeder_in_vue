<template>
  <div class="min-h-full">
    <Navigation />
    <Header :pageHeading="pageHeading" />

    <Loader v-if="isLoading" />
    <main v-else class="min-w-0 border-t border-gray-200">
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <p class="text-gray-700 text-base">{{ blog.title }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2"
            >Description</label
          >
          <p v-html="blog.content" />
        </div>

        <div class="grid sm:grid-cols-3 gap-4">
          <div v-for="image in blog.pictures" :key="image.id" class="relative">
            <img :src="getImageUrl(image)" alt="Image" class="w-full h-auto" />
            <div
              class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2"
            >
              <p class="text-sm">{{ image.title }}</p>
              <button
                @click="deleteImage(image)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-1"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div class="my-3">
          <button @click="openAddImageForm" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Image
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 inline-block mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </main>
    <TransitionRoot appear :show="isImageFormOpen" as="template">
      <Dialog as="div" @close="closeAddImageForm" class="relative z-10">
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
                class="w-full max-w-lg transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <BlogImageForm
                  @close="closeAddImageForm"
                  :addBlogImageUtil="addBlogImageUtil"
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot appear :show="isConfirmDeleteModalOpen" as="template">
      <Dialog as="div" @close="closeConfirmDeleteModal" class="relative z-10">
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
                class="w-full max-w-lg transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <ConfirmModal
                  :message="deleteMessage"
                  @close="closeConfirmDeleteModal"
                  :confirm-action="deleteImageUtil"
                  :cancel-action="closeConfirmDeleteModal"
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
import { useBlog } from "../store/blog";
import { useRoute } from "vue-router";
import Header from "../components/Header.vue";
import Navigation from "../components/Navigation.vue";
import Loader from "../components/Loader.vue";
import BlogImageForm from "../components/forms/BlogImage.vue";
import ConfirmModal from "../components/ConfirmModal.vue";

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";

const blogStore = useBlog();
const route = useRoute();
const isImageFormOpen = ref(false);
const isConfirmDeleteModalOpen = ref(false);
const selectedImage = ref(null);
const deleteMessage = ref("");
const pageHeading = computed(() => blogStore.getBlog.title);

const blog = computed(() => blogStore.getBlog);
const isLoading = computed(() => blogStore.isLoading);

const openAddImageForm = () => {
  isImageFormOpen.value = true;
};

const closeAddImageForm = () => {
  isImageFormOpen.value = false;
};

const closeConfirmDeleteModal = () => {
  isConfirmDeleteModalOpen.value = false;
};

const deleteImage = (image) => {
  selectedImage.value = image;
  deleteMessage.value = `Are you sure you want to delete ${image.title}?`;
  isConfirmDeleteModalOpen.value = true;
};

const deleteImageUtil = async () => {
  closeConfirmDeleteModal();
  await blogStore.deleteBlogImageAction(route.params.id, selectedImage.value._id);
  await blogStore.getBlogAction(route.params.id);
};

const addBlogImageUtil = async (formData) => {
  closeAddImageForm();
  await blogStore.addBlogImageAction(route.params.id, formData);
  await blogStore.getBlogAction(route.params.id);
};

const getImageUrl = (image) => {
  return `https://apgiiit.com/uploads/${image.name}`;
};

onMounted(() => {
  blogStore.getBlogAction(route.params.id);
});
</script>
