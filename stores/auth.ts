import { defineStore } from "pinia";
export const useAuthStore = defineStore("authstore", {
  state: () => ({
    isLoggedIn: false,
  }),

  actions: {
    setLoginStatus(status: boolean) {
      this.isLoggedIn = status;
    },
    checkLoginStatus() {
      if (process.client) {
        const token = localStorage.getItem("accessToken");
        this.isLoggedIn = !!token;
      }
    },
  },

  getters: {
    getLoginStatus: (state) => state.isLoggedIn,
  },
  // persist: true,
});
