// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  ssr: true,
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-toast"],
  imports: {
    dirs: ["stores"],
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
});