export default defineNuxtRouteMiddleware(async (to) => {
	const authStore = useAuthStore();

	if (!authStore.accessToken && authStore.status === "idle") {
		await authStore.initAuth();
	}

	const token = authStore.accessToken;

	const protectedPages = [
		"/settings",
		"/transactions",
		"/users",
		"/roles",
		"/stats",
		"/profile",
		"/process-order",
		"/orders",
	];
	const publicPages = ["/login", "/register"];

	const isProtectedPage = protectedPages.some((path) => {
		if (path === "/") {
			return to.path === "/";
		}
		return to.path.startsWith(path);
	});
	const isPublicPage = publicPages.includes(to.path);

	if (isProtectedPage && !token) {
		const redirect = encodeURIComponent(to.fullPath);
		return navigateTo(`/login?redirect=${redirect}`);
	}

	if (isPublicPage && token) {
		return navigateTo("/");
	}
});
