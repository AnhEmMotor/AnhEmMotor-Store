import { useAuthStore } from "~/stores/useAuthStore";

export default defineNuxtPlugin(async (nuxtApp) => {
	const authStore = useAuthStore();
	if (import.meta.server && nuxtApp.ssrContext) {
		authStore.setSsrEvent(nuxtApp.ssrContext.event);
	}
	if (!authStore.accessToken) {
		await authStore.initAuth();
	}

	nuxtApp.payload.auth = {
		accessToken: authStore.accessToken,
		user: authStore.user,
		status: authStore.status,
	};
});
