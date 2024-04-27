<template>
  <div class="min-h-full">
    <Navigation />
    <Header :pageHeading="pageHeading" />

    <Loader v-if="isLoading" />
    <main v-else class="min-w-0 border-t border-gray-200">
      <div
        v-for="project in projectList" :key="project._id"
        class="px-4 py-2 container mx-auto my-3"
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
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Edit
              </button>
              <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
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
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProject } from "../store/project";
import { useRouter } from "vue-router";
import Header from "../components/Header.vue";
import Navigation from "../components/Navigation.vue";
import Loader from "../components/Loader.vue";

const projectStore = useProject();
const router = useRouter();
const pageHeading = ref("Projects");

const projectList = computed(() => projectStore.getProjectList);
const isLoading = computed(() => projectStore.isLoading);

const goToProjectDetail = (project) => {
  console.log("Go to project detail");
  router.push({ name: "ProjectDetail", params: { id: project._id } });
};

onMounted(() => {
  projectStore.getProjectsAction();
});
</script>
