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
          @click="setIsConfirmOpenTrue"
        >
          Add Gallery
        </button>
      </div>
      <div
        v-for="post in galleryList.gallery"
        :key="post._id"
        class="py-2 container mx-auto my-3"
      >
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <p class="text-gray-700 text-base">
              {{ post.title }}
            </p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <p v-html="post.content" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Created :</label>
            <p class="text-gray-700 text-base">
              {{ post.createdAt }}
            </p>
          </div>
          <div>
            <div>
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="openGalleryEditForm(post)"
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Edit
              </button>
              <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                @click="deleteGallery(post)"
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
              <button
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                @click="goToPostDetail(post)"
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                View
              </button>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        v-if="galleryList"
        :current-page="currentPage"
        :total-pages="galleryList && galleryList.lastPage"
        :on-page-change="onPageChange"
      />
    </main>
    <TransitionRoot
      appear
      :show="isFormOpened"
      as="template"
    >
      <Dialog
        as="div"
        class="relative z-10"
        @close="setIsConfirmOpenFalse"
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
                class="w-full max-w-xxl transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <GalleryForm
                  :gallery="selectedGallery"
                  :add-gallery-util="addGalleryUtil"
                  :update-gallery-util="updateGalleryUtil"
                  @close="setIsConfirmOpenFalse"
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot
      appear
      :show="isConfirmDeleteModalOpen"
      as="template"
    >
      <Dialog
        as="div"
        class="relative z-10"
        @close="closeConfirmDeleteModal"
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
                class="w-full max-w-lg transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <ConfirmModal
                  :message="`Are you sure you want to delete ${selectedGallery.title} Gallery?`"
                  :confirm-action="deleteGalleryUtil"
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
import { useGallery } from "../store/gallery";
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";
import Navigation from "../components/Navigation.vue";
import Loader from "../components/Loader.vue";
import GalleryForm from "../components/forms/GalleryForm.vue";
import Pagination from "../components/Pagination.vue";
import ConfirmModal from "../components/ConfirmModal.vue";

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";

const router = useRouter();
const galleryStore = useGallery();
const pageHeading = ref("Gallery");
const selectedGallery = ref(null);
const isConfirmDeleteModalOpen = ref(false);
const isFormOpened = ref(false);
const currentPage = ref(1);

const galleryList = computed(() => galleryStore.getGalleryList);
const isLoading = computed(() => galleryStore.isLoading);

const goToPostDetail = (post) => {
  router.push({ name: "GalleryDetail", params: { id: post._id } });
};

const setIsConfirmOpenTrue = () => {
  isFormOpened.value = true;
};

const openGalleryEditForm = (post) => {
  selectedGallery.value = post;
  setIsConfirmOpenTrue();
};

const setIsConfirmOpenFalse = () => {
  isFormOpened.value = false;
};

const closeConfirmDeleteModal = () => {
  isConfirmDeleteModalOpen.value = false;
};

const deleteGallery = (post) => {
  selectedGallery.value = post;
  isConfirmDeleteModalOpen.value = true;
};

const deleteGalleryUtil = async () => {
  await galleryStore.deleteGalleryAction(selectedGallery.value._id);
  await galleryStore.getGalleryListAction(currentPage.value);
  closeConfirmDeleteModal();
};

const onPageChange = async (page) => {
  currentPage.value = page;
  await galleryStore.getGalleryListAction(currentPage.value);
};

const addGalleryUtil = async (payload) => {
  setIsConfirmOpenFalse();
  await galleryStore.createGalleryAction(payload);
  await galleryStore.getGalleryListAction();
};

const updateGalleryUtil = async (payload) => {
  setIsConfirmOpenTrue();
  await galleryStore.updateGalleryAction(payload);
  await galleryStore.getGalleryListAction();
  setIsConfirmOpenFalse();
};

onMounted(() => {
    galleryStore.getGalleryListAction();
});
</script>
