<template>
  <div class="min-h-screen text-white">
    <nav
      class="flex items-center sticky z-[3] justify-between px-6 py-4 shadow-md bg-slate-800"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="text-2xl font-bold text-white">
        🛒 MyStore
      </NuxtLink>

      <!-- Right Side Icons -->
      <div class="flex items-center space-x-6">
        <!-- Cart Icon -->
        <NuxtLink
          to="/cart"
          class="hover:text-blue-400 relative transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
          >
            <path
              d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2c1.103 0 2-.896 2-2s-.897-2-2-2zm10 0c-1.104 
              0-2 .896-2 2s.896 2 2 2c1.103 0 2-.896 2-2s-.897-2-2-2zM7.16 
              13l.938-2h7.45c.824 0 1.548-.502 1.85-1.25l3.234-7.75H5.21L3.27 
              0H0v2h2l3.6 7.59-1.35 2.44C3.52 13.37 4.48 15 6 15h12v-2H7.16z"
            />
          </svg>

          <span
            v-show="cart.length > 0"
            class="absolute px-2 top-[-.5em] right-[-1em] bg-red-800 text-white rounded-[50%]"
            >{{ cart.length }}</span
          >
        </NuxtLink>

        <!-- Profile Icon -->
        <NuxtLink
          to="/profile"
          class="hover:text-blue-400 transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 
              12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8V22h19.2v-2.8c0-3.2-6.4-4.8-9.6-4.8z"
            />
          </svg>
        </NuxtLink>
      </div>
    </nav>

    <!-- Page Content -->
    <main class="">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { cart } = storeToRefs(useCartStore());
const { checkLoginStatus } = useAuthStore();
onMounted(() => {
  checkLoginStatus();
});
</script>

<style scoped></style>
