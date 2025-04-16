<template>
  <div
    class="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-10"
  >
    <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
      Profile Information
    </h2>

    <div class="space-y-4">
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">Username</p>
        <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
          {{ userData?.username || "John Doe" }}
        </p>
      </div>

      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
        <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
          {{ userData?.email || "johndoe@gmail.com" }}
        </p>
      </div>
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">Address</p>
        <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
          {{ userData?.address.street + ", " + userData.address.city }}
        </p>
      </div>
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">Address</p>
        <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
          {{ userData?.address.street + ", " + userData.address.city }}
        </p>
      </div>
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
        <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
          {{ userData?.name.firstname + ", " + userData.name.lastname }}
        </p>
      </div>
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">Phone</p>
        <p class="text-lg font-medium text-gray-800 dark:text-gray-200">
          {{ userData?.phone}}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const id = 1;
const config = useRuntimeConfig();
const {
  data: userData,
  error: userDataError,
  pending: userDataPending,
} = useFetch(`${config.public.apiUrl}/users/${id}`);
console.log(userData);
</script>

<style scoped></style>
