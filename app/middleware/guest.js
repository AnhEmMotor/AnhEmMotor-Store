import { useAuthStore } from "@/stores/auth.store";
export default defineNuxtRouteMiddleware(() => {
	const authStore = useAuthStore();

	if (authStore.accessToken) {
		return navigateTo("/");
	}
});
