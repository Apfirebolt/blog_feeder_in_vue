import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuth } from "./auth";
import httpClient from "../plugins/interceptor";

const authStore = useAuth();

export const useMessage = defineStore("message", {
  state: () => ({
    message: ref({}),
    messageList: ref([]),
    loading: ref(false),
  }),

  getters: {
    getmessage() {
      return this.message;
    },
    getMessageList() {
      return this.messageList;
    },
    isLoading() {
      return this.loading;
    },
  },

  actions: {
    async getMessagesAction() {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.get(`contact`, {
          headers,
        });
        if (response) {
          this.messageList = response.data.data;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async deleteMessageAction(id) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.delete(`contact/${id}`, {
          headers,
        });
        if (response) {
          this.getMessagesAction();
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async deleteAllMessagesAction() {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.delete(`contact/delete-all`, {
          headers,
        });
        if (response) {
          this.getMessagesAction();
        }
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    async addMessageAction(data) {
      try {
        const headers = {
          Authorization: `Bearer ${authStore.authData.token}`,
        };
        this.loading = true;
        const response = await httpClient.post(`contact`, data, {
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

    resetMessageData() {
      this.message = {};
      this.messageList = [];
    },
  },
});
