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
        @submit.prevent="handleSignup"
        class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-6"
      >
        <h2 class="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

        <div class="text-black">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            v-model="username"
            type="text"
            placeholder="Create a username"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="text-black">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
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
            placeholder="Create a password"
            class="w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
        >
          {{ signupPending ? "Creating Account..." : "Sign Up" }}
        </button>

        <p class="text-center text-sm text-gray-600">
          Already have an account?
          <a href="/login" class="text-blue-600 hover:underline">Login</a>
        </p>

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
      </form>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const username = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const success = ref("");
const signupPending = ref(false);
const config = useRuntimeConfig();
const authStore = useAuthStore();
const { setLoginStatus } = authStore;

const generateRandomId = () => {
  return Math.floor(Math.random() * 9000) + 1000;
};

const handleSignup = async () => {
  error.value = "";
  success.value = "";
  signupPending.value = true;

  const userId = generateRandomId();

  const { data, error: fetchError } = await useFetch(
    `${config.public.apiUrl}/users`,
    {
      method: "POST",
    }
  );

  if (data.value) {
    signupPending.value = false;
    success.value = "Account created successfully!";
    setLoginStatus(true);
    setTimeout(() => {
      navigateTo("/login");
    }, 1000);
  } else {
    signupPending.value = false;
    error.value = "Signup failed. Please try again.";
  }
};
</script>

<style scoped>
/* You can add additional transition styles here if needed */
</style>
