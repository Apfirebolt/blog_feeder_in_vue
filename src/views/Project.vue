<template>
  <div class="min-h-full">
    <Navigation />
    <Header :pageHeading="pageHeading" />

    <Loader v-if="isLoading" />
    <main v-else class="min-w-0 border-t border-gray-200">
      <div class="container mx-auto my-2">
        <button
          @click="openProjectForm"
          class="py-2 px-4 bg-slate-300 hover:bg-slate-600 hover:text-white transition-all rounded"
        >
          Add Project
        </button>
      </div>
      <div
        v-for="project in projectList.projects" :key="project._id"
        class="py-2 container mx-auto my-3"
      >
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Name</label
            >
            <p class="text-gray-700 text-base">{{ project.title }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Description</label
            >
            <p v-html="project.content" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Technologies</label
            >
            <p class="text-gray-700 text-base">{{ project.technology }}</p>
          </div>
          <div>
            <div>
              <button @click="openEditForm(project)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Edit
              </button>
              <button @click="deleteProject(project)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Delete
              </button>
              <button @click="goToProjectDetail(project)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                View
              </button>
            </div>
          </div>
        </div>
      </div>
      <Pagination v-if="projectList" :currentPage="currentPage" :totalPages="projectList && projectList.lastPage" :on-page-change="onPageChange" />
    </main>
    <TransitionRoot appear :show="isFormOpened" as="template">
      <Dialog as="div" @close="closeProjectForm" class="relative z-10">
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
                <ProjectForm
                  @close="closeProjectForm"
                  :project="selectedProject"
                  :addProjectUtil="addProjectUtil"
                  :updateProjectUtil="updateProjectUtil"
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
                class="w-full max-w-xxl transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <ConfirmModal
                  :message="`Are you sure you want to delete ${selectedProject.title} project?`"
                  :confirmAction="deleteProjectUtil"
                  :cancelAction="closeConfirmDeleteModal"
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
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";
import Navigation from "../components/Navigation.vue";
import Loader from "../components/Loader.vue";
import ProjectForm from "../components/forms/ProjectForm.vue";
import Pagination from "../components/Pagination.vue";
import ConfirmModal from "../components/ConfirmModal.vue";

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";

const projectStore = useProject();
const router = useRouter();
const isFormOpened = ref(false);
const selectedProject = ref(null);
const isConfirmDeleteModalOpen = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(3);
const pageHeading = ref("Projects");

const projectList = computed(() => projectStore.getProjectList);
const isLoading = computed(() => projectStore.isLoading);

const goToProjectDetail = (project) => {
  router.push({ name: "ProjectDetail", params: { id: project._id } });
};

const onPageChange = async (page) => {
  currentPage.value = page;
  await projectStore.getProjectsAction(currentPage.value);
};

const openProjectForm = () => {
  isFormOpened.value = true;
};

const closeProjectForm = () => {
  isFormOpened.value = false;
};

const closeConfirmDeleteModal = () => {
  isConfirmDeleteModalOpen.value = false;
};

const deleteProjectUtil = async () => {
  isConfirmDeleteModalOpen.value = false;
  await projectStore.deleteProjectAction(selectedProject.value._id);
  await projectStore.getProjectsAction(currentPage.value);
};

const deleteProject = (project) => {
  selectedProject.value = project;
  isConfirmDeleteModalOpen.value = true;
};

const addProjectUtil = async (project) => {
  isFormOpened.value = false;
  await projectStore.addProjectAction(project);
  await projectStore.getProjectsAction();
};

const updateProjectUtil = async (project) => {
  isFormOpened.value = false;
  await projectStore.updateProjectAction(project);
  await projectStore.getProjectsAction();
};

const openEditForm = (project) => {
  selectedProject.value = project;
  isFormOpened.value = true;
};

onMounted(() => {
  projectStore.getProjectsAction();
});
</script>
