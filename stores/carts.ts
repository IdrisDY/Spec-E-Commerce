import { defineStore } from "pinia";
type Product = {
  id: number;
  quantity: number;
  [key: string]: any;
};
export const useCartStore = defineStore("CartStore", {
  state: () => ({
    cart: [] as Product[],
  }),
  actions: {
    addToCart(product: Product) {
      this.cart.push(product);
    },
    removeFromCart(productId: number) {
      console.log(this.cart, "top");

      const arr = this.cart.filter((item) => item.id !== productId);
      console.log(productId, this.cart, arr);
      this.cart = arr;
    },

    emptyCart() {
      this.cart = [];
    },
    updateQuantity(productId: number, quantity: number) {
      const item = this.cart.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});
