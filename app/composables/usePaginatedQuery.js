import { useQuery, useQueryClient } from "@tanstack/vue-query";
import {
	ref,
	reactive,
	unref,
	computed,
	watch,
	watchEffect,
	isRef,
	onServerPrefetch,
} from "vue";
import { useRoute, useRouter, useNuxtApp, navigateTo } from "#app";

export function usePaginatedQuery(config) {
	const {
		queryKey,
		queryFn,
		itemsPerPage = 10,
		filters: rawFilters = {},
		debouncedFields = [],
		options = {},
		useLocalPagination = false,
		dataKey = "data",
		initialData = undefined,
		enabled = true,
	} = config;

	const route = useRoute();
	const router = useRouter();
	const queryClient = useQueryClient();
	const nuxtApp = useNuxtApp();

	const debouncedValues = reactive({});
	const debounceTimers = {};

	for (const field of debouncedFields) {
		debouncedValues[field] = unref(rawFilters[field]) ?? "";
	}

	for (const field of debouncedFields) {
		watch(
			() => unref(rawFilters[field]),
			(newVal) => {
				if (debounceTimers[field]) clearTimeout(debounceTimers[field]);
				debounceTimers[field] = setTimeout(() => {
					debouncedValues[field] = newVal ?? "";
				}, 300);
			},
		);
	}

	const localPage = ref(1);

	const pageParam = computed({
		get: () => {
			if (useLocalPagination) return localPage.value;
			const p = Number(route.query.page);
			return Number.isNaN(p) || p < 1 ? 1 : p;
		},
		set: (val) => {
			if (useLocalPagination) {
				localPage.value = val;
			} else {
				router.replace({ query: { ...route.query, page: val } });
			}
		},
	});

	const buildCleanFilters = () => {
		const clean = {};
		if (!rawFilters) return clean;
		const filterKeys = Object.keys(rawFilters);
		for (const key of filterKeys) {
			const val = debouncedFields.includes(key)
				? debouncedValues[key]
				: unref(rawFilters[key]);
			if (val !== undefined && val !== null && val !== "") {
				clean[key] = val;
			}
		}
		return clean;
	};

	const queryParams = computed(() => ({
		page: pageParam.value,
		limit: itemsPerPage,
		...buildCleanFilters(),
	}));

	if (!useLocalPagination && import.meta.client) {
		watch(
			() => ({ ...debouncedValues }),
			() => {
				syncFiltersToUrl();
			},
		);

		if (rawFilters) {
			const nonDebouncedKeys = Object.keys(rawFilters).filter(
				(k) => !debouncedFields.includes(k),
			);
			if (nonDebouncedKeys.length > 0) {
				watch(
					() => nonDebouncedKeys.map((k) => unref(rawFilters[k])),
					() => {
						syncFiltersToUrl();
					},
				);
			}
		}
	}

	function syncFiltersToUrl() {
		const newQuery = { ...route.query };
		if (rawFilters) {
			for (const key of Object.keys(rawFilters)) {
				delete newQuery[key];
			}
		}
		const clean = buildCleanFilters();
		Object.assign(newQuery, clean);
		newQuery.page = 1;
		router.replace({ query: newQuery });
	}

	if (rawFilters && !useLocalPagination) {
		const filterKeys = Object.keys(rawFilters);
		for (const key of filterKeys) {
			const urlVal = route.query[key];
			if (urlVal !== undefined && urlVal !== null && urlVal !== "") {
				if (isRef(rawFilters[key])) {
					rawFilters[key].value = urlVal;
				}
				if (debouncedFields.includes(key)) {
					debouncedValues[key] = urlVal;
				}
			}
		}
	}

	if (import.meta.server) {
		onServerPrefetch(async () => {
			if (unref(enabled) === false) return;

			const rawPage = Number(route.query.page);

			if (!Number.isNaN(rawPage) && rawPage < 1 && !useLocalPagination) {
				await nuxtApp.runWithContext(() =>
					navigateTo({
						path: route.path,
						query: { ...route.query, page: 1 },
					}),
				);
				return;
			}

			const currentPage = pageParam.value;
			const prefetchOptions = { staleTime: 5000 };
			const fetchKey = [
				...queryKey,
				{ ...queryParams.value, page: currentPage },
			];

			try {
				await queryClient.prefetchQuery({
					queryKey: fetchKey,
					queryFn: () => queryFn({ ...queryParams.value, page: currentPage }),
					...prefetchOptions,
				});

				const fetchedData = queryClient.getQueryData(fetchKey);
				const paginationRes = fetchedData?.pagination || {};
				const total = paginationRes.totalPages || 0;

				if (total > 0 && currentPage > total && !useLocalPagination) {
					await nuxtApp.runWithContext(() =>
						navigateTo({
							path: route.path,
							query: { ...route.query, page: total },
						}),
					);
					return;
				}

				const neighborPromises = [];

				if (currentPage < total) {
					neighborPromises.push(
						queryClient.prefetchQuery({
							queryKey: [
								...queryKey,
								{ ...queryParams.value, page: currentPage + 1 },
							],
							queryFn: () =>
								queryFn({ ...queryParams.value, page: currentPage + 1 }),
							...prefetchOptions,
						}),
					);
				}

				if (currentPage > 1) {
					neighborPromises.push(
						queryClient.prefetchQuery({
							queryKey: [
								...queryKey,
								{ ...queryParams.value, page: currentPage - 1 },
							],
							queryFn: () =>
								queryFn({ ...queryParams.value, page: currentPage - 1 }),
							...prefetchOptions,
						}),
					);
				}

				if (neighborPromises.length > 0) {
					await Promise.all(neighborPromises);
				}
			} catch (error) {
				if (
					error?.statusCode === 301 ||
					error?.statusCode === 302 ||
					error?.message?.includes("Navigate")
				) {
					throw error;
				}
			}
		});
	}

	const {
		data,
		isLoading,
		isFetching,
		isPlaceholderData,
		status,
		...restQuery
	} = useQuery({
		queryKey: computed(() => [...queryKey, queryParams.value]),
		queryFn: () => queryFn(queryParams.value),
		initialData: initialData,
		placeholderData: (previousData) => previousData,
		staleTime: 5000,
		...options,
		enabled: enabled,
	});

	const listData = computed(() => {
		if (!data.value) return [];
		return typeof dataKey === "function"
			? dataKey(data.value)
			: data.value[dataKey] || [];
	});

	const paginationData = computed(() => data.value?.pagination || {});
	const totalPages = computed(() => paginationData.value.totalPages || 1);

	const isInitialLoading = computed(
		() => status.value === "pending" && !data.value,
	);

	watch(
		[() => route.query.page, totalPages, isLoading, data],
		async ([routePage, total, loading, currentData]) => {
			if (useLocalPagination || import.meta.server) return;

			const pageNum = Number(routePage);

			if (!Number.isNaN(pageNum) && pageNum < 1) {
				await router.replace({ query: { ...route.query, page: 1 } });
				return;
			}

			if (!loading && currentData && pageParam.value > total && total > 0) {
				await router.replace({ query: { ...route.query, page: total } });
			}
		},
		{ immediate: true },
	);

	watchEffect(() => {
		if (isPlaceholderData.value || !data.value) return;

		const currentPage = pageParam.value;
		const total = totalPages.value;
		const prefetchOptions = { staleTime: 5000 };

		if (currentPage > 1) {
			queryClient.prefetchQuery({
				queryKey: [
					...queryKey,
					{ ...queryParams.value, page: currentPage - 1 },
				],
				queryFn: () => queryFn({ ...queryParams.value, page: currentPage - 1 }),
				...prefetchOptions,
			});
		}

		if (currentPage < total) {
			queryClient.prefetchQuery({
				queryKey: [
					...queryKey,
					{ ...queryParams.value, page: currentPage + 1 },
				],
				queryFn: () => queryFn({ ...queryParams.value, page: currentPage + 1 }),
				...prefetchOptions,
			});
		}
	});

	const changePage = (page) => {
		const target = Math.max(1, Math.min(page, totalPages.value));
		if (target === pageParam.value) return;

		pageParam.value = target;

		if (import.meta.client && !useLocalPagination) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	return {
		data: listData,
		rawData: data,
		isLoading,
		isInitialLoading,
		isFetching,
		status,
		pageParam,
		isPlaceholderData,
		...restQuery,
		pagination: computed(() => ({
			currentPage: pageParam.value,
			totalPages: totalPages.value,
			itemsPerPage,
			totalItems: paginationData.value.totalCount,
			goToPage: changePage,
			nextPage: () => changePage(pageParam.value + 1),
			prevPage: () => changePage(pageParam.value - 1),
			hasNextPage: pageParam.value < totalPages.value,
			hasPrevPage: pageParam.value > 1,
		})),
	};
}
