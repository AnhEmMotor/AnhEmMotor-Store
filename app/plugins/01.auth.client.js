import { useAuthStore } from "@/stores/auth.store";
export default defineNuxtPlugin((nuxtApp) => {
	const authStore = useAuthStore();
	if (nuxtApp.payload.auth) {
		authStore.$patch({
			accessToken: nuxtApp.payload.auth.accessToken,
			user: nuxtApp.payload.auth.user,
			status: nuxtApp.payload.auth.status,
		});
	}
});
