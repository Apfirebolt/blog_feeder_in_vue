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

    async getGalleryListAction() {
        try {
            const headers = {
                Authorization: `Bearer ${authStore.authData.token}`,
            };
            this.loading = true;
            const response = await httpClient.get(`gallery`, {
                headers,
            });
            if (response) {
                this.galleryList = response.data.data;
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
