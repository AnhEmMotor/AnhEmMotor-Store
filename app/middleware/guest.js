import { useAuthStore } from "@/core/application/stores/auth.store";
export default defineNuxtRouteMiddleware(() => {
	const authStore = useAuthStore();

	if (authStore.accessToken) {
		return navigateTo("/");
	}
});
