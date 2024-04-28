import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuth } from "./auth";
import httpClient from "../plugins/interceptor";

const authStore = useAuth();

export const useProject = defineStore("projects", {
  state: () => ({
    project: ref({}),
    projectList: ref({}),
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
    async getProjectsAction(page = 1) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        if (page) {
          this.loading = true;
          const response = await httpClient.get(`projects?page=${page}`, {
            headers,
          });
          if (response) {
            this.projectList = response.data;
            this.loading = false;
          }
        } else {
          this.loading = true;
          const response = await httpClient.get(`projects`, {
            headers,
          });
          if (response) {
            this.projectList = response.data;
            this.loading = false;
          }
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

    async addProjectAction(data) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.post(`projects`, data, {
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

    async updateProjectAction(data) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.put(`projects/${data.id}`, data, {
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

    async deleteProjectAction(id) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.delete(`projects/${id}`, {
          headers,
        });
        if (response) {
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async addProjectImageAction(projectId, formData) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
          "Content-Type": "multipart/form-data",
        };
        this.loading = true;
        const response = await httpClient.post(`projects/${projectId}/images`, formData, {
          headers,
        });
        if (response) {
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    
    // action to delete a single project image
    async deleteProjectImageAction(projectId, imageId) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.delete(`projects/${projectId}/images/${imageId}`, {
          headers,
        });
        if (response) {
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
