import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuth } from "./auth";
import httpClient from "../plugins/interceptor";

const authStore = useAuth();

export const useGallery = defineStore("gallery", {
  state: () => ({
    gallery: ref({}),
    galleryList: ref([]),
    loading: ref(false),
  }),

  getters: {
    getGallery() {
      return this.gallery;
    },
    getGalleryList() {
      return this.galleryList;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async getSingleGalleryAction() {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.get(`gallery`, {
          headers,
        });
        if (response) {
          this.gallery = response.data;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async getGalleryListAction(page = 1) {
        try {
            const headers = {
                Authorization: `Bearer ${authStore.authData.token}`,
            };
            if (page) {
                this.loading = true;
                const response = await httpClient.get(`gallery?page=${page}`, {
                    headers,
                });
                if (response) {
                    this.galleryList = response.data;
                    this.loading = false;
                }
            } else {
                this.loading = true;
                const response = await httpClient.get(`gallery`, {
                    headers,
                });
                if (response) {
                    this.galleryList = response.data;
                    this.loading = false;
                }
            }
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    },

    async getGalleryAction(id) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.get(`gallery/${id}`, {
          headers,
        });
        if (response) {
          this.gallery = response.data.data;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async createGalleryAction(data) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.post(`gallery`, data, {
          headers,
        });
        if (response) {
          this.gallery = response.data.data;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async updateGalleryAction(data) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.put(`gallery/${data.id}`, data, {
          headers,
        });
        if (response) {
          this.gallery = response.data.data;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async deleteGalleryAction(id) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.delete(`gallery/${id}`, {
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

    async addGalleryImageAction(galleryId, formData) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
          "Content-Type": "multipart/form-data",
        };
        this.loading = true;
        const response = await httpClient.post(`gallery/${galleryId}/pictures`, formData, {
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

    resetGalleryData() {
      this.gallery = {};
      this.galleryList = [];
    },
  },
});
