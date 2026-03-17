export default defineNuxtPlugin(() => {
	const authStore = useAuthStore();
	const { $toast } = useNuxtApp();

	// Chỉ chạy ở phía client
	if (import.meta.client) {
		// Theo dõi sự thay đổi route hoặc đơn giản là check khi plugin init
		// Nuxt plugins chạy lại mỗi khi app init (F5) hoặc khi chuyển hướng thủ công trong một số trường hợp
		// Tuy nhiên, để bắt được chuyển hướng nội bộ, ta dùng watch hoặc hook
		const router = useRouter();

		router.afterEach(() => {
			const message = authStore.consumeSuccessMessage();
			if (message) {
				$toast.success(message);
			}
		});
	}
});
