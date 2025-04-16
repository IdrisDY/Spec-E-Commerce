export default defineNuxtRouteMiddleware((to) => {
  const publicRoutes = ["/", "/login", "/signup", "/products"];

  if (publicRoutes.includes(to.path)) return;

  if (process.client) {
    const toast = useToast();
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.info({
        message: "You must be logged in to access this page.",
      });

      return navigateTo("/login");
    }
  }
});
