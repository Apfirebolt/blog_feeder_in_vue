import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuth } from "./auth";
import httpClient from "../plugins/interceptor";

const authStore = useAuth();

export const useBlog = defineStore("blog", {
  state: () => ({
    blog: ref({}),
    blogList: ref({}),
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
    async getBlogsAction(page = 1) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        if (page) {
          this.loading = true;
          const response = await httpClient.get(`posts?page=${page}`, {
            headers,
          });
          if (response) {
            this.blogList = response.data;
            this.loading = false;
          }
        } else {
          this.loading = true;
          const response = await httpClient.get(`posts`, {
            headers,
          });
          if (response) {
            this.blogList = response.data;
            this.loading = false;
          }
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

    async deleteBlogAction(id) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        console.log('ID: ', id)
        this.loading = true;
        const response = await httpClient.delete(`posts/${id}`, {
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

    async addBlogImageAction(blogId, formData) {
      try {
        const headers = { 
          Authorization: `Bearer ${authStore.authData.token}`,
          "Content-Type": "multipart/form-data",
        };
        this.loading = true;
        const response = await httpClient.post(`posts/${blogId}/pictures`, formData, {
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

    // action to delete a single blog image
    async deleteBlogImageAction(blogId, imageId) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.delete(`posts/${blogId}/pictures/${imageId}`, {
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

    // add comment
    async addBlogCommentAction(blogId, data) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.post(`posts/${blogId}/comments`, data, {
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

    // delete comment
    async deleteBlogCommentAction(blogId, commentId) {
      try {
        const headers = { 
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.delete(`posts/${blogId}/comments/${commentId}`, {
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

    resetBlogData() {
      this.blog = {};
      this.blogList = [];
    },
  },
});
