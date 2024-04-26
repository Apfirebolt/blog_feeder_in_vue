import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuth } from "./auth";
import httpClient from "../plugins/interceptor";

const authStore = useAuth();

export const useBlog = defineStore("blog", {
  state: () => ({
    blog: ref({}),
    blogList: ref([]),
    loading: ref(false),
  }),

  getters: {
    getBlog() {
      return this.blog;
    },
    getBlogList() {
      return this.blogList;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async getBlogsAction() {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.get(`contact`, {
          headers,
        });
        if (response) {
          this.blogList = response.data;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    resetBlogData() {
      this.blog = {};
      this.blogList = [];
    },
  },
});
