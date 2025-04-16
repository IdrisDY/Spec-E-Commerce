<template>
  <div class="min-h-screen text-white px-[40px] md:px-[100px] py-8">
    <h1 class="text-3xl font-bold mb-6 text-center">Our Products</h1>

    <!-- Search Input -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search products..."
        class="w-full sm:w-1/2 px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-green-500"
      />

      <div class="flex gap-3">
        <button
          @click="changeItemsDisplay('grid')"
          class="border border-green-200 p-2 hover:border-green-500 hover:scale-[1.05] rounded-sm"
        >
          Grid
        </button>
        <button
          @click="changeItemsDisplay('list')"
          class="border border-green-200 p-2 hover:border-green-500 hover:scale-[1.05] rounded-sm"
        >
          List
        </button>
      </div>
    </div>

    <!--  Loading -->
    <div v-if="productsPending" class="text-center text-gray-400">
      Loading Products <span class="animate-pulse">.....</span>
    </div>

    <!--  Error -->
    <div v-else-if="productsError" class="text-red-500 text-center">
      Error loading products: {{ productsError.message }}
    </div>

    <!-- Product List -->
    <div v-else-if="filteredProducts.length > 0">
      <div
        :class="`${
          itemsDisplay === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            : 'flex flex-col md:w-3/5 md:mx-auto'
        } gap-6`"
      >
        <ProductsProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>

    <!-- ❕ No Results -->
    <div v-else class="text-center text-gray-400 mt-10">
      No products found.
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const itemsDisplay = ref("grid");
const searchQuery = ref("");

const {
  data: products,
  error: productsError,
  pending: productsPending,
} = await useFetch(`${config.public.apiUrl}/products`, {
  default: () => [],
});

function changeItemsDisplay(item: string) {
  itemsDisplay.value = item;
}

const filteredProducts = computed(() => {
  if (!products.value) return [];
  const query = searchQuery.value.toLowerCase().trim();
  return products.value.filter((product: any) =>
    product.title.toLowerCase().includes(query)
  );
});
</script>
