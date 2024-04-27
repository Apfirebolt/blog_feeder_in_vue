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
            <p class="text-gray-700 text-base">{{ project.content }}</p>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2"
              >Technologies</label
            >
            <p class="text-gray-700 text-base">{{ project.technology }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProject } from "../store/project";
import Header from "../components/Header.vue";
import Navigation from "../components/Navigation.vue";
import Loader from "../components/Loader.vue";

const projectStore = useProject();
const pageHeading = ref("Project Page");

const projectList = computed(() => projectStore.getProjectList);
const isLoading = computed(() => projectStore.isLoading);

onMounted(() => {
  projectStore.getProjectsAction();
});
</script>
