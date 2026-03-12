import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useAxios } from "~/composables/useAxios";
import { useQueryClient } from "@tanstack/vue-query";
import { parseCookies, appendResponseHeader } from "h3";
import { useRouter } from "vue-router";

let refreshTokenPromise = null;

export const useAuthStore = defineStore("auth", () => {
	const router = useRouter();
	const config = useRuntimeConfig();
	const user = ref(null);
	const accessToken = ref(null);
	const expiresAt = ref(null);
	const ssrEvent = ref(null);
	const status = ref("idle");
	const queryClient = useQueryClient();

	let abortController = null;
	const sseStatus = ref("disconnected");
	let isLoggingOut = false;
	const successRedirectMessage = ref(null);

	const isLoggedIn = computed(() => !!accessToken.value && !!user.value);
	const authHeader = computed(() => ({
		Authorization: `Bearer ${accessToken.value}`,
	}));

	function setSsrEvent(event) {
		if (import.meta.server) {
			ssrEvent.value = event;
		}
	}

	const cleanState = () => {
		user.value = null;
		accessToken.value = null;
		expiresAt.value = null;
		closeSSE();
	};

	async function login(credentials) {
		if (status.value === "pending") return;
		status.value = "pending";
		isLoggingOut = false;
		const axios = useAxios();
		try {
			const { data } = await axios.post("/api/v1/auth/login", credentials);

			if (data && data.accessToken) {
				accessToken.value = data.accessToken;
				expiresAt.value = data.expiresAt;
				delete data.accessToken;
				delete data.expiresAt;
				await fetchUserSSR({ skipRetry: true });
				closeSSE();
				connectSSE();
				status.value = "success";
			} else {
				throw new Error("Login failed: No access token received");
			}
			return { success: true };
		} catch (error) {
			status.value = "error";
			accessToken.value = null;
			user.value = null;
			return { error };
		}
	}

	async function register(userInfo) {
		if (status.value === "pending") return;
		status.value = "pending";
		const axios = useAxios();
		try {
			const { data } = await axios.post("/api/v1/auth/register", userInfo);

			status.value = "success";
			return { data };
		} catch (error) {
			status.value = "error";
			return { error };
		}
	}

	const connectSSE = async (retryCount = 0) => {
		if (import.meta.server) return;
		if (abortController || isLoggingOut) return;

		let token = accessToken.value;
		if (!token) return;

		abortController = new AbortController();
		const sseUrl = `${config.public.apiBaseUrl}/api/v1/user/me`;

		sseStatus.value = "connecting";

		try {
			await fetchEventSource(sseUrl, {
				method: "GET",
				signal: abortController.signal,
				openWhenHidden: true,
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "text/event-stream",
				},
				async onopen(response) {
					if (
						response.ok &&
						response.headers.get("content-type")?.includes("text/event-stream")
					) {
						sseStatus.value = "connected";
						return;
					}

					if (response.status === 401) {
						throw new Error("SSE_AUTH_ERROR");
					}

					if (
						response.status >= 400 &&
						response.status < 500 &&
						response.status !== 429
					) {
						sseStatus.value = "error";
						throw new Error(`Fatal SSE error: ${response.status}`);
					}
					throw new Error(`SSE Connection failed: ${response.status}`);
				},
				onmessage(msg) {
					if (!msg.data || msg.data === "heartbeat") return;
					const data = JSON.parse(msg.data);
					if (data) {
						if (data.status === "Banned") {
							performLogout();
							return;
						}

						if (data.userName) {
							user.value = user.value ? { ...user.value, ...data } : data;

							if (import.meta.client) {
								const currentRoute = router.currentRoute.value;

								if (
									currentRoute.meta.permission &&
									!hasPermission(currentRoute.meta.permission)
								) {
									return navigateTo("/");
								}

								if (currentRoute.meta.permissions) {
									let oneOf, allOf;

									if (Array.isArray(currentRoute.meta.permissions)) {
										oneOf = currentRoute.meta.permissions;
									} else {
										oneOf = currentRoute.meta.permissions.oneOf;
										allOf = currentRoute.meta.permissions.allOf;
									}

									if (oneOf && !hasAnyPermission(oneOf)) {
										return navigateTo("/");
									}

									if (allOf && !hasAllPermissions(allOf)) {
										return navigateTo("/");
									}
								}
							}
						}
					}
				},
				onclose() {
					sseStatus.value = "disconnected";
					if (abortController?.signal.aborted || isLoggingOut) {
						abortController = null;
						throw new Error("SSE_CLOSED");
					}
				},
				onerror(err) {
					if (err.message === "SSE_AUTH_ERROR") {
						if (abortController) {
							abortController.abort();
							abortController = null;
						}

						if (retryCount < 3) {
							refreshToken()
								.then(({ error: refreshError }) => {
									if (!refreshError) {
										connectSSE(retryCount + 1);
									} else {
										performLogout();
									}
								})
								.catch(() => {
									performLogout();
								});
							throw err;
						} else {
							performLogout();
							throw err;
						}
					}

					if (err.message?.includes("Fatal")) {
						sseStatus.value = "error";
						if (abortController) {
							abortController.abort();
							abortController = null;
						}
						throw err;
					}

					sseStatus.value = "connecting";
				},
			});
		} catch (err) {
			if (err.message !== "SSE_AUTH_ERROR" && err.message !== "SSE_CLOSED") {
				sseStatus.value = "error";
				abortController = null;
			}
		}
	};

	const closeSSE = () => {
		if (abortController) {
			abortController.abort();
			abortController = null;
			sseStatus.value = "disconnected";
		}
	};

	const performLogout = async () => {
		if (isLoggingOut) return;
		isLoggingOut = true;

		cleanState();

		if (import.meta.client) {
			queryClient.cancelQueries();
			queryClient.removeQueries();
			queryClient.clear();
			await navigateTo("/");
		}

		const axios = useAxios();
		axios.post("/api/v1/auth/logout").catch(() => {});

		setTimeout(() => {
			isLoggingOut = false;
		}, 500);
	};

	async function fetchUserSSR(options = {}) {
		if (!accessToken.value && !options.headers?.Cookie) {
			return;
		}

		try {
			const headers = {
				...options.headers,
			};

			if (accessToken.value) {
				headers.Authorization = `Bearer ${accessToken.value}`;
			}

			const serverBaseUrl = import.meta.server
				? config.apiServerUrl
				: config.public.apiBaseUrl;
			const userData = await $fetch("/api/v1/user/me", {
				baseURL: serverBaseUrl,
				method: "GET",
				headers: headers,
				ignoreResponseError: false,
			});

			user.value = userData;
			status.value = "success";
		} catch (error) {
			if (options.skipRetry) {
				user.value = null;
				status.value = "error";
				return;
			}

			const statusCode = error.response?.status || error.statusCode;

			if (statusCode === 401) {
				const { error: refreshError } = await refreshToken();
				if (!refreshError) {
					await fetchUserSSR({ ...options, skipRetry: true });
				} else {
					user.value = null;
					status.value = "error";
				}
			} else {
				user.value = null;
				status.value = "error";
			}
		}
	}

	async function _performRefresh() {
		try {
			let headers = {};
			const backendUrl =
				(import.meta.server ? config.apiServerUrl : config.public.apiBaseUrl) ||
				"";

			let mainRequestEvent = null;
			if (import.meta.server) {
				mainRequestEvent = ssrEvent.value || useRequestEvent();
				if (mainRequestEvent) {
					const allCookies = parseCookies(mainRequestEvent);
					const refreshToken = allCookies["refreshToken"];

					if (!refreshToken) {
						return { error: "No refresh token available" };
					}

					headers.Cookie = `refreshToken=${refreshToken}`;
				}
			}

			const response = await $fetch.raw(
				`${backendUrl}/api/v1/auth/refresh-token`,
				{
					method: "POST",
					headers: headers,
					credentials: "include",
				},
			);

			let newCookieString = "";
			if (
				import.meta.server &&
				mainRequestEvent &&
				response.headers.has("set-cookie")
			) {
				const setCookieHeaders = response.headers.getSetCookie();
				for (const cookie of setCookieHeaders) {
					appendResponseHeader(mainRequestEvent, "Set-Cookie", cookie);
					newCookieString += `${cookie.split(";")[0]}; `;
				}
			}
			const data = response._data;
			if (data && data.accessToken) {
				accessToken.value = data.accessToken;
				expiresAt.value = data.expiresAt;
				return { data, newCookieString };
			} else {
				throw new Error("Refresh token failed: No new AT received");
			}
		} catch (error) {
			if (import.meta.client) {
				await logout();
			} else {
				accessToken.value = null;
				user.value = null;
				status.value = "idle";

				const event = ssrEvent.value;
				if (event) {
					appendResponseHeader(
						event,
						"Set-Cookie",
						"refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax",
					);
				}
			}
			return { error };
		}
	}

	async function refreshToken() {
		if (refreshTokenPromise) {
			return refreshTokenPromise;
		}
		refreshTokenPromise = _performRefresh().finally(() => {
			refreshTokenPromise = null;
		});
		return refreshTokenPromise;
	}

	async function logout(shouldRedirect = true) {
		status.value = "pending";
		closeSSE();
		const axios = useAxios();
		try {
			await axios.post("/api/v1/auth/logout");
		} finally {
			if (import.meta.client) {
				queryClient.cancelQueries();
				queryClient.removeQueries();
				queryClient.clear();
			}

			accessToken.value = null;
			user.value = null;
			status.value = "idle";

			if (shouldRedirect && import.meta.client) {
				await navigateTo("/");
			}
		}
	}

	async function initAuth() {
		if (accessToken.value) {
			return;
		}
		status.value = "pending";
		try {
			const { error, newCookieString } = await refreshToken();
			if (error) {
				throw new Error("Failed to initialize auth");
			}

			if (import.meta.server) {
				await fetchUserSSR({
					headers: newCookieString ? { Cookie: newCookieString } : {},
					skipRetry: true,
				});
			} else {
				await fetchUserSSR({ skipRetry: true });
				connectSSE();
			}
		} catch {
			accessToken.value = null;
			user.value = null;
			status.value = "unauthenticated";
		}
	}

	const permissions = computed(() => user.value?.permissions || []);

	function hasPermission(permission) {
		return permissions.value.includes(permission);
	}

	const roles = computed(() => user.value?.roles || []);

	function hasRole(role) {
		return roles.value.includes(role);
	}

	function hasAnyPermission(permissionList) {
		return permissionList.some((p) => hasPermission(p));
	}

	function hasAllPermissions(permissionList) {
		return permissionList.every((p) => hasPermission(p));
	}

	return {
		user,
		accessToken,
		status,
		isLoggedIn,
		authHeader,
		permissions,
		roles,
		hasPermission,
		hasRole,
		hasAnyPermission,
		hasAllPermissions,
		login,
		register,
		logout,
		fetchUser: fetchUserSSR,
		initAuth,
		refreshToken,
		setSsrEvent,
		sseStatus,
		successRedirectMessage: computed(() => successRedirectMessage.value),
		setSuccessMessage: (msg) => {
			successRedirectMessage.value = msg;
		},
		consumeSuccessMessage: () => {
			const msg = successRedirectMessage.value;
			successRedirectMessage.value = null;
			return msg;
		},
		reconnectSSE: () => {
			closeSSE();
			connectSSE();
		},
	};
});
