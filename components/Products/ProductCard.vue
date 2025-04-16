<template>
  <div
    :key="product.id"
    class="bg-gray-800 hover:scale-[1.05] flex flex-col justify-between shadow-lg rounded-xl p-5 hover:shadow-2xl transition duration-300"
  >
    <div>
      <img
        :src="product.image"
        alt="Product Image"
        class="w-full h-48 object-cover rounded-md"
      />
      <h2 class="text-xl font-semibold mt-4">{{ product.title }}</h2>
      <p class="text-gray-300 mt-2 overflow-ellipsis">
        {{
          product.description.length > 150
            ? `${product.description.slice(0, 150)}...`
            : product.description
        }}
      </p>
    </div>

    <div class="mt-4">
      <div class="flex justify-between">
        <p class="text-lg font-bold text-green-400">${{ product.price }}</p>
        <NuxtLink
          :to="`/products/${product.id}`"
          class="text-blue-200 hover:underline"
        >
          View Details
        </NuxtLink>
      </div>
      <div class="flex flex-col items-center justify-between mt-4">
        <div
          v-if="isInCart"
          class="flex items-center w-full justify-center mb-4 bg-gray-700 px-2 py-1 rounded"
        >
          <button @click="decrement" class="text-white px-2">-</button>
          <span class="text-white">{{ count }}</span>
          <button @click="increment" class="text-white px-2">+</button>
        </div>

        <button
          @click="toggleCart"
          class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition duration-200 w-full"
        >
          {{ isInCart ? "Remove from Cart" : "Add to Cart" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const toast = useToast();
const cartStore = useCartStore();
const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);
const { addToCart, removeFromCart } = cartStore;
const { cart } = storeToRefs(cartStore);
const count = ref(1);

const isInCart = computed(() =>
  cart.value.some((item) => item.id === props.product.id)
);

function toggleCart() {
  console.log(isLoggedIn);
  if (!isLoggedIn.value) {
    toast.error({
      title: "Error!",
      message: "You need to login to add to cart.",
    });

    return;
  }

  if (isInCart.value) {
    removeFromCart(props.product.id);
    count.value = 1;
  } else {
    addToCart({
      id: props.product.id,
      ...props.product,
      quantity: count.value,
    });
  }
}

function increment() {
  count.value++;
  updateCartCount();
}

function decrement() {
  if (count.value > 1) {
    count.value--;
    updateCartCount();
  }
}

function updateCartCount() {
  if (isInCart.value) {
    cartStore.updateQuantity(props.product.id, count.value);
  }
}
</script>
