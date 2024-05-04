import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuth } from "./auth";
import httpClient from "../plugins/interceptor";

const authStore = useAuth();

export const useResume = defineStore("resume", {
  state: () => ({
    achievement: ref({}),
    achievementList: ref([]),
    loading: ref(false),
  }),

  getters: {
    getAchievement() {
      return this.achievement;
    },
    getAchievementList() {
      return this.achievementList;
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

    async getAchievementAction(id) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.get(`resume/achievement/${id}`, {
          headers,
        });
        if (response) {
          this.achievement = response.data.data.project;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async addAchievementAction(data) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.post(`resume/achievement`, data, {
          headers,
        });
        if (response) {
          this.achievement = response.data.data.achievement;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async updateAchievementAction(data) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.put(`resume/achievement/${data.id}`, data, {
          headers,
        });
        if (response) {
          this.achievement = response.data.data.achievement;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async deleteAchievementAction(id) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.delete(`resume/achievement/${id}`, {
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
    
    resetResumeData() {
      this.achievement = {};
      this.achievementList = [];
    },
  },
});
