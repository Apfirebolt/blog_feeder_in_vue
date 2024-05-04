import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuth } from "./auth";
import httpClient from "../plugins/interceptor";

const authStore = useAuth();

export const useResume = defineStore("resume", {
  state: () => ({
    achievement: ref({}),
    achievementList: ref([]),
    experience: ref({}),
    experienceList: ref([]),
    loading: ref(false),
  }),

  getters: {
    getAchievement() {
      return this.achievement;
    },
    getAchievementList() {
      return this.achievementList;
    },
    getExperience() {
      return this.experience;
    },
    getExperienceList() {
      return this.experienceList;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async getAchievementsAction() {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.get(`resume/achievement`, {
          headers,
        });
        if (response) {
          this.achievementList = response.data;
          this.loading = false;
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
        const response = await httpClient.patch(
          `resume/achievement/${data.id}`,
          data,
          {
            headers,
          }
        );
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

    // Experience API Calls
    async getExperiencesAction() {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.get(`resume/experience`, {
          headers,
        });
        if (response) {
          this.experienceList = response.data;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async getExperienceAction(id) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.get(`resume/experience/${id}`, {
          headers,
        });
        if (response) {
          this.experience = response.data.data.project;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async addExperienceAction(data) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.post(`resume/experience`, data, {
          headers,
        });
        if (response) {
          this.experience = response.data.data.experience;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async updateExperienceAction(data) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.patch(
          `resume/experience/${data.id}`,
          data,
          {
            headers,
          }
        );
        if (response) {
          this.experience = response.data.data.experience;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async deleteExperienceAction(id) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        console.log('Passed id is ', id)
        this.loading = true;
        const response = await httpClient.delete(`resume/experience/${id}`, {
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
      this.experience = {};
      this.experienceList = [];
    },
  },
});
