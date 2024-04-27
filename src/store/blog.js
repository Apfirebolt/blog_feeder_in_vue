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
        const response = await httpClient.get(`posts`, {
          headers,
        });
        if (response) {
          this.blogList = response.data.posts;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async getBlogAction(id) {
      try {
        const headers = { 
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.get(`posts/${id}`, {
          headers,
        });
        if (response) {
          console.log('RESPONSE: ', response.data)
          this.blog = response.data.data;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async createBlogAction(blog) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.post(`posts`, blog, {
          headers,
        });
        if (response) {
          console.log('Response data ', response.data)
          this.blog = response.data.data;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async updateBlogAction(blog) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.put(`posts/${blog.id}`, blog, {
          headers,
        });
        if (response) {
          this.blog = response.data.data;
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
