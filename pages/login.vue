<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-900">
    <Transition
      appear
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="opacity-0 transform translate-y-12"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform translate-y-12"
    >
      <form
        @submit.prevent="handleLogin"
        class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-6"
      >
        <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>
        <p class="text-red-800">These are the known working credentials !</p>
        <div class="text-black">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            v-model="username"
            type="text"
            placeholder="Enter username"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            placeholder="Enter password"
            class="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
        >
          {{ loginPending ? "Logging in" : "Login" }}
        </button>

        <NuxtLink
          to="signup"
          class="border mt-4 flex self-end text-black rounded-md border-green-100"
          >Sign Up</NuxtLink
        >

        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 transform scale-95"
          enter-to-class="opacity-100 transform scale-100"
        >
          <div v-if="error" class="text-red-500 text-sm text-center">
            {{ error }}
          </div>
        </Transition>
      </form>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const username = ref("mor_2314");
const password = ref("83r5^_");
const error = ref("");
const loginPending = ref(false);
const authStore = useAuthStore();
const { setLoginStatus } = authStore;
const config = useRuntimeConfig();
const router = useRouter();
const handleLogin = async () => {
  error.value = "";
  loginPending.value = true;

  try {
    const { data, error: fetchError } = await useFetch(
      `${config.public.apiUrl}/auth/login`,
      {
        method: "POST",
        body: {
          username: username.value,
          password: password.value,
        },
      }
    );

    if (fetchError.value) {
      error.value = "Login failed. Please check your credentials.";
    } else {
      const token = data.value.token;
      localStorage.setItem("accessToken", token);
      setLoginStatus(true);
      navigateTo("/products");
    }
  } catch (e) {
    error.value = "An unexpected error occurred. Please try again.";
  } finally {
    loginPending.value = false;
  }
};
</script>

<style scoped>
/* You can add additional transition styles here if needed */
</style>
