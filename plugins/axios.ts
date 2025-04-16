import axios from "axios";

export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig();

  const authStore = useAuthStore();
  const { setLoginStatus } = authStore;
  console.log(authStore);

  const router = useRouter();

  const $axios = axios.create({
    baseURL: runtimeConfig.public.apiUrl,
    timeout: 10000,
  });

  $axios.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  $axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // clear local storage to log out
        localStorage.clear();
        if (!authStore.isLoggedIn) {
          router.push({ name: "login" });
        }
        return Promise.reject(error);
      }
    }
  );
  return {
    provide: {
      axios: $axios,
    },
  };
});
