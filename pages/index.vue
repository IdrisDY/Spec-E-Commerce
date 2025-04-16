<template>
  <div class="home-container">
    <div
      class="home-background relative w-full md:fixed md:inset-0 flex flex-col md:flex-row md:gap-8 items-center justify-between md:p-[40px] p-[100px_40px_20px_40px]"
    >
      <!-- Left Content -->
      <div class="text-white flex flex-col gap-4">
        <h1 class="text-[32px] md:text-[56px] font-bold">
          My E-commerce Store
        </h1>
        <h2 class="text-xl md:text-2xl">Welcome to Our E-commerce Store</h2>
        <p class="text-lg">Your one-stop shop for all your needs!</p>
      </div>

      <!-- Right Button -->

      <div class="flex mt-6 md:mt-0 flex-col md:flex-row gap-4">
        <NuxtLink
          to="/products"
          class="bg-white text-black whitespace-nowrap text-lg px-6 py-3 rounded-md font-semibold animate-pulse transition hover:bg-gray-300"
        >
          See Our Products
        </NuxtLink>
        <NuxtLink
          to="/login"
          class="bg-white text-black whitespace-nowrap text-lg px-6 py-3 rounded-md font-semibold animate-pulse transition hover:bg-gray-300"
        >
          Login
        </NuxtLink>
        <NuxtLink
          to="/signup"
          class="bg-white text-black whitespace-nowrap text-lg px-6 py-3 rounded-md font-semibold animate-pulse transition hover:bg-gray-300"
        >
          Become a Customer
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("/images/homeMockup.jpg") no-repeat bottom center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
}

.home-background {
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
  display: flex;
}
</style>
