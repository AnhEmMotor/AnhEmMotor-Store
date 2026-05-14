import axios from "axios";



export const useAxios = () => {
	const config = useRuntimeConfig();
	const authStore = useAuthStore();
	const nuxtApp = useNuxtApp();

	// Use nuxtApp context for request-scoped, non-serializable state
	// This avoids serialization errors during SSR
	if (!nuxtApp._axiosRefreshState) {
		nuxtApp._axiosRefreshState = {
			isRefreshing: false,
			failedQueue: []
		};
	}
	const refreshState = nuxtApp._axiosRefreshState;

	const processQueue = (error, token = null) => {
		refreshState.failedQueue.forEach((prom) => {
			if (error) {
				prom.reject(error);
			} else {
				prom.resolve(token);
			}
		});

		refreshState.failedQueue = [];
	};

	const baseURL =
		(import.meta.server
			? config.internalApiUrlForServer
			: config.public.apiUrlForBrowserClient) || "";

	const axiosInstance = axios.create({
		baseURL,
		withCredentials: true,
		headers: {
			"Content-Type": "application/json",
		},
	});

	axiosInstance.interceptors.request.use(
		async (config) => {
			config.params = { ...config.params, t: Date.now() };
			const authStore = useAuthStore();
			if (authStore.accessToken) {
				if (authStore.isTokenExpired) {
					if (!refreshState.isRefreshing) {
						refreshState.isRefreshing = true;
						try {
							const res = await authStore.refreshToken();
							if (res.error) throw res.error;
							const newAccessToken = res.data.accessToken;
							processQueue(null, newAccessToken);
							config.headers.Authorization = `Bearer ${newAccessToken}`;
						} catch (refreshError) {
							processQueue(refreshError, null);
							await authStore.logout(false);
							return Promise.reject(refreshError);
						} finally {
							refreshState.isRefreshing = false;
						}
					} else {
						return new Promise((resolve, reject) => {
							refreshState.failedQueue.push({ resolve, reject });
						}).then((token) => {
							config.headers.Authorization = `Bearer ${token}`;
							return config;
						});
					}
				} else {
					config.headers.Authorization = `Bearer ${authStore.accessToken}`;
				}
			}
			return config;
		},
		(error) => Promise.reject(error),
	);

	axiosInstance.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config;
			const authStore = useAuthStore();

			if (
				error.response?.status === 401 &&
				!originalRequest._retry &&
				authStore.accessToken
			) {
				if (
					originalRequest.url?.includes("/api/v1/auth/refresh-token") ||
					originalRequest.url?.includes("/api/v1/auth/login")
				) {
					if (originalRequest.url?.includes("/api/v1/auth/refresh-token")) {
						await authStore.logout(false);
					}
					return Promise.reject(error);
				}

				if (refreshState.isRefreshing) {
					return new Promise((resolve, reject) => {
						refreshState.failedQueue.push({ resolve, reject });
					})
						.then((token) => {
							originalRequest.headers.Authorization = `Bearer ${token}`;
							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							return Promise.reject(err);
						});
				}

				originalRequest._retry = true;
				refreshState.isRefreshing = true;

				try {
					const res = await authStore.refreshToken();

					if (res.error) {
						throw res.error;
					}

					const newAccessToken = res.data.accessToken;

					processQueue(null, newAccessToken);

					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					return axiosInstance(originalRequest);
				} catch (refreshError) {
					processQueue(refreshError, null);
					await authStore.logout(false);
					return Promise.reject(refreshError);
				} finally {
					refreshState.isRefreshing = false;
				}
			}

			return Promise.reject(error);
		},
	);

	return axiosInstance;
};
