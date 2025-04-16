import { defineStore } from "pinia";

type userStoreState = {
  products: any[];
};
export const useProductsStore = defineStore({
  id: "ProductsStore",
  state: (): userStoreState => {
    return {
      products: [],
    };
  },

  actions: {
    setUserDetails(value: {}) {},
    async fetchProducts(userType: string) {
      const productsResponse = await useNuxtApp().$axios.get(`/products`);
      this.fetchProducts = productsResponse.data;
      console.log(productsResponse, "userDetailsResponse");
    },
    setAuthenticationState(value: boolean) {
      this.isAuthenticated = value;
    },
  },
  getters: {
    getProducts: (state: userStoreState) => {
      return state.products;
    },
  },
  persist: true,
});
