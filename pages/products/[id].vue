<template>
  <div class="min-h-screen bg-gray-900 text-white py-10 px-4">
    <!--  Loading Spinner -->
    <div v-if="pending" class="flex justify-center items-center py-20">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
      ></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-red-400 text-center">
      <p>Error loading product: {{ error.message }}</p>
    </div>

    <!-- Product Display -->
    <div
      v-else-if="product"
      class="max-w-5xl mx-auto grid md:grid-cols-2 gap-10"
    >
      <!-- 📸 Product Image -->
      <div class="bg-gray-800 rounded-lg p-4">
        <img
          :src="product.image"
          :alt="product.title"
          loading="lazy"
          class="w-full h-[400px] object-contain rounded"
        />
      </div>

      <!-- 🛒 Product Info -->
      <div class="space-y-6 flex flex-col justify-center">
        <h1 class="text-3xl font-bold">{{ product.title }}</h1>
        <p class="text-gray-300">{{ product.description }}</p>
        <p class="text-2xl text-green-400 font-semibold">
          ${{ product.price.toFixed(2) }}
        </p>

        <button
          @click="toggleAddCart"
          class="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded transition w-full "
        >
          {{ isInCart ? "Remove from Cart" : "Add to Cart" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
const cartStore = useCartStore();
const { addToCart, removeFromCart } = cartStore;
const { cart } = storeToRefs(cartStore);

const id = Number(route.params.id);
const {
  data: product,
  pending,
  error,
} = await useFetch(() => `${config.public.apiUrl}/products/${id}`);

const isInCart = computed(() => cart.value.some((item) => item.id === id));

function toggleAddCart() {
  if (!product.value) return;
  isInCart.value
    ? removeFromCart(id)
    : addToCart({ ...product.value, quantity: 1 });
}
</script>
