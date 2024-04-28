<template>
  <div class="min-h-full">
    <Navigation />
    <Header :page-heading="pageHeading" />

    <Loader v-if="isLoading" />
    <main
      v-else
      class="min-w-0 border-t border-gray-200"
    >
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <p class="text-gray-700 text-base">
            {{ project.title }}
          </p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <p v-html="project.content" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Technologies</label>
          <p class="text-gray-700 text-base">
            {{ project.technology }}
          </p>
        </div>

        <div class="grid sm:grid-cols-3 gap-4">
          <div
            v-for="image in project.pictures"
            :key="image.id"
            class="relative"
          >
            <img
              :src="getImageUrl(image)"
              alt="Image"
              class="w-full h-auto"
            >
            <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <p class="text-sm">
                {{ image.title }}
              </p>
              <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-1"
                @click="deleteImage(image)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Comments -->
        <div class="my-3">
          <label class="block text-gray-700 text-lg font-bold mb-2">Comments</label>
          <div
            v-for="comment in project.comments"
            :key="comment.id"
            class="mb-2"
          >
            <div class="flex bg-neutral-100 shadow-md rounded my-2 py-4 px-2 justify-between">
              <div>
                <p class="text-gray-700 text-base">
                  {{ comment.content }}
                </p>
                <p class="text-gray-700 text-sm">
                  Posted By : {{ comment.name }}
                </p>
                <p>
                  <span class="text-gray-700 text-sm mx-2">Posted on</span>
                  <span class="text-gray-700 text-sm">{{ comment.date }}</span>
                </p>
              </div>
              <div>
                <button
                  class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-1"
                  @click="deleteComment(comment)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="my-3">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            @click="openAddImageForm"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Image
          </button>
          <button
            class="bg-violet-800 hover:bg-blue-400 ml-2 text-white font-bold py-2 px-4 rounded"
            @click="addComment"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Comment
          </button>
        </div>
      </div>
    </main>
    <TransitionRoot
      appear
      :show="isImageFormOpen"
      as="template"
    >
      <Dialog
        as="div"
        class="relative z-10"
        @close="closeAddImageForm"
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
          <div class="flex min-h-full items-center justify-center p-4 text-center">
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
                <ProjectImageForm
                  :add-project-image-util="addProjectImageUtil"
                  @close="closeAddImageForm"
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot
      appear
      :show="isDeleteConfirmModalOpen"
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
          <div class="flex min-h-full items-center justify-center p-4 text-center">
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
                  :confirm-action="deleteImageUtil"
                  :cancel-action="closeConfirmDeleteModal"
                  @close="closeConfirmDeleteModal"
                />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot
      appear
      :show="isAddCommentFormOpen"
      as="template"
    >
      <Dialog
        as="div"
        class="relative z-10"
        @close="closeAddCommentForm"
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
          <div class="flex min-h-full items-center justify-center p-4 text-center">
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
                <AddCommentForm
                  :add-comment-util="addCommentUtil"
                  @close="closeAddCommentForm"
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
import { useProject } from "../store/project";
import { useRoute } from "vue-router";
import Header from "../components/Header.vue";
import Navigation from "../components/Navigation.vue";
import Loader from "../components/Loader.vue";
import ProjectImageForm from "../components/forms/ProjectImage.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import AddCommentForm from "../components/forms/AddComment.vue";

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";

const projectStore = useProject();
const route = useRoute();
const pageHeading = computed(() => projectStore.getProject.title);

const project = computed(() => projectStore.getProject);
const isLoading = computed(() => projectStore.isLoading);
const isImageFormOpen = ref(false);
const isDeleteConfirmModalOpen = ref(false);
const isAddCommentFormOpen = ref(false);
const selectedImage = ref(null);
const deleteMessage = ref("");

const openAddImageForm = () => {
  isImageFormOpen.value = true;
};

const closeAddImageForm = () => {
  isImageFormOpen.value = false;
};

const closeAddCommentForm = () => {
  isAddCommentFormOpen.value = false;
};

const closeConfirmDeleteModal = () => {
  isDeleteConfirmModalOpen.value = false;
};

const getImageUrl = (image) => {
  return `https://apgiiit.com/uploads/${image.name}`;
};

const addProjectImageUtil = async (formData) => {
  closeAddImageForm();
  await projectStore.addProjectImageAction(route.params.id, formData);
  await projectStore.getProjectAction(route.params.id);
};

const deleteImage = (image) => {
  selectedImage.value = image;
  deleteMessage.value = `Are you sure you want to delete ${image.title}?`;
  isDeleteConfirmModalOpen.value = true;
};

const deleteImageUtil = async () => {
  closeConfirmDeleteModal();
  await projectStore.deleteProjectImageAction(
    project.value._id,
    selectedImage.value._id
  );
  await projectStore.getProjectAction(route.params.id);
};

const addCommentUtil = async (formData) => {
  closeAddCommentForm();
  await projectStore.addProjectCommentAction(route.params.id, formData);
  await projectStore.getProjectAction(route.params.id);
};

const addComment = () => {
  isAddCommentFormOpen.value = true;
};

const deleteComment = async (comment) => {
  await projectStore.deleteProjectCommentAction(
    project.value._id,
    comment._id
  );
  await projectStore.getProjectAction(route.params.id);
};

onMounted(() => {
  projectStore.getProjectAction(route.params.id);
});
</script>
