<template>
  <div class="container mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
    <h1 class="text-3xl font-bold mb-6">Your Cart</h1>

    <div v-if="cart.length === 0" class="text-center py-20">
      <p class="text-xl text-gray-500 dark:text-gray-400">
        Your cart is empty.
      </p>
      <NuxtLink
        to="/products"
        class="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-500 transition"
      >
        Browse Products
      </NuxtLink>
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="product in cart"
        :key="product.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row overflow-hidden"
      >
        <img
          :src="product.image"
          :alt="product.title"
          class="w-full md:w-48 h-48 object-cover"
        />

        <div class="p-4 flex-1">
          <h2 class="text-xl font-semibold">{{ product.title }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 my-2">
            {{ product.description }}
          </p>

          <div class="flex flex-wrap items-center justify-between mt-4">
            <div class="text-blue-600 font-bold text-lg dark:text-blue-400">
              ${{ (product.price * product.quantity).toFixed(2) }}
            </div>

            <div class="flex items-center">
              <button
                @click="decrementQuantity(product)"
                :disabled="product.quantity <= 1"
                class="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-l"
              >
                -
              </button>
              <span class="px-4 py-1 bg-gray-100 dark:bg-gray-600">
                {{ product.quantity }}
              </span>
              <button
                @click="incrementQuantity(product)"
                class="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-r"
              >
                +
              </button>
            </div>

            <button
              @click="removeFromCart(product.id)"
              class="text-red-500 hover:text-red-700 dark:hover:text-red-400 mt-4 md:mt-0"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mt-8 shadow-inner">
        <div class="flex justify-between items-center text-xl font-semibold">
          <span>Total:</span>
          <span>${{ calculateTotal().toFixed(2) }}</span>
        </div>
        <div class="mt-6 flex justify-end">
          <button
            @click="submitProductsToCart"
            class="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-500 transition"
          >
            {{ submitPending ? "Checking Out ... " : "Proceed to Checkout" }}
          </button>
        </div>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 transform scale-95"
      enter-to-class="opacity-100 transform scale-100"
    >
      <div v-if="error" class="text-red-500 text-sm text-center">
        {{ error }}
      </div>
    </Transition>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 transform scale-95"
      enter-to-class="opacity-100 transform scale-100"
    >
      <div v-if="success" class="text-green-500 text-sm text-center">
        {{ success }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
const cartStore = useCartStore();
const { emptyCart } = cartStore;
const { cart } = storeToRefs(cartStore);
const config = useRuntimeConfig();
const success = ref("");
const error = ref("");
const submitPending = ref(false);

const incrementQuantity = (product) => {
  product.quantity += 1;
  cartStore.updateQuantity(product.id, product.quantity);
};

const decrementQuantity = (product) => {
  if (product.quantity > 1) {
    product.quantity -= 1;
    cartStore.updateQuantity(product.id, product.quantity);
  }
};

const removeFromCart = (productId) => {
  cartStore.removeFromCart(productId);
};

const calculateTotal = () => {
  return cart.value.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
};

async function submitProductsToCart() {
  submitPending.value = true;
  const { data, pending, error } = await useFetch(
    `${config.public.apiUrl}/carts`,
    {
      id: 0,
      userId: 0,
      products: cart.value.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.title,
        price: item.price,
        category: item.category,
        image: item.image,
      })),
    }
  );

  if (data) {
    success.value = "Account created successfully!";
    emptyCart();
    setTimeout(() => {
      navigateTo("/products");
      submitPending.value = false;
    }, 500);
  } else {
    error.value = "Something went wrong!";
    submitPending.value = false;
  }
}
</script>
