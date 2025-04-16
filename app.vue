<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts">
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap",
    },
  ],
});
</script>
