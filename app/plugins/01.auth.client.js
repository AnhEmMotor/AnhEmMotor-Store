import { useAuthStore } from "@/stores/useAuthStore";
export default defineNuxtPlugin((nuxtApp) => {
	const authStore = useAuthStore();
	if (nuxtApp.payload.auth) {
		authStore.accessToken = nuxtApp.payload.auth.accessToken;
		authStore.user = nuxtApp.payload.auth.user;
		authStore.status = nuxtApp.payload.auth.status;
	}
});
