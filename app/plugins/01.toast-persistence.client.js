export default defineNuxtPlugin(() => {
	const authStore = useAuthStore();
	const { $toast } = useNuxtApp();

	if (import.meta.client) {
		const router = useRouter();

		router.afterEach(() => {
			const message = authStore.consumeSuccessMessage();
			if (message) {
				$toast.success(message);
			}
		});
	}
});
