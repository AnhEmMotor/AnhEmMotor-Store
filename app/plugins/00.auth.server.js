import { useAuthStore } from "~/stores/auth.store";
import { parseCookies } from "h3";

export default defineNuxtPlugin(async (nuxtApp) => {
	if (!import.meta.server) return;

	const event = nuxtApp.ssrContext?.event ?? useRequestEvent();
	if (!event) return;

	const authStore = useAuthStore();
	authStore.setSsrEvent(event);

	if (event.context._authCalculated) {
		authStore.setAuthResult(event.context._authCalculated);
	} else {
		const cookies = parseCookies(event);
		if (cookies.refreshToken) {
			await authStore.initAuth();
		} else {
			authStore.$patch({ status: "unauthenticated" });
		}

		event.context._authCalculated = {
			accessToken: authStore.accessToken,
			user: authStore.user,
			status: authStore.status,
		};
	}

	nuxtApp.payload.auth = {
		accessToken: authStore.accessToken,
		user: authStore.user,
		status: authStore.status,
	};
});
