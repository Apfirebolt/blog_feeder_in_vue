import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuth } from "./auth";
import httpClient from "../plugins/interceptor";

const authStore = useAuth();

export const useProject = defineStore("projects", {
  state: () => ({
    project: ref({}),
    projectList: ref([]),
    loading: ref(false),
  }),

  getters: {
    getProject() {
      return this.project;
    },
    getProjectList() {
      return this.projectList;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async getProjectsAction() {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.get(`projects`, {
          headers,
        });
        if (response) {
          this.projectList = response.data.projects;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async getProjectAction(id) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.get(`projects/${id}`, {
          headers,
        });
        if (response) {
          this.project = response.data.data.project;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    resetProjectData() {
      this.project = {};
      this.projectList = [];
    },
  },
});