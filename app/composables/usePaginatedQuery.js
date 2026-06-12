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
	onMounted,
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

	let isInitializing = true;

	const debouncedValues = reactive({});
	const debounceTimers = {};

	for (const field of debouncedFields) {
		const filtersObj = unref(rawFilters);
		debouncedValues[field] = filtersObj?.[field] ?? "";
	}

	for (const field of debouncedFields) {
		watch(
			() => unref(rawFilters)?.[field],
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
		const filtersObj = unref(rawFilters);
		if (!filtersObj) return clean;
		const filterKeys = Object.keys(filtersObj);
		for (const key of filterKeys) {
			const val = debouncedFields.includes(key)
				? debouncedValues[key]
				: filtersObj[key];
			if (Array.isArray(val)) {
				if (val.length > 0) clean[key] = val;
			} else if (val !== undefined && val !== null && val !== "") {
				clean[key] = val;
			}
		}
		return clean;
	};
	const queryParams = computed(() => ({
		page: pageParam.value,
		pageSize: itemsPerPage,
		...buildCleanFilters(),
	}));

	if (!useLocalPagination && import.meta.client) {
		watch(
			() => ({ ...debouncedValues }),
			() => {
				syncFiltersToUrl();
			},
		);

		watch(
			() => {
				const filtersObj = unref(rawFilters);
				if (!filtersObj) return [];
				return Object.keys(filtersObj)
					.filter((key) => !debouncedFields.includes(key))
					.map((key) => filtersObj[key]);
			},
			() => {
				if (!useLocalPagination && import.meta.client) {
					syncFiltersToUrl();
				}
			},
			{ deep: true },
		);
	}

	function syncFiltersToUrl() {
		if (isInitializing) return;

		const newQuery = { ...route.query };
		const filtersObj = unref(rawFilters);
		if (filtersObj) {
			for (const key of Object.keys(filtersObj)) {
				delete newQuery[key];
			}
		}
		const clean = buildCleanFilters();

		for (const [key, value] of Object.entries(clean)) {
			if (Array.isArray(value)) {
				if (value.length > 0) {
					newQuery[key] = value.join(",");
				}
			} else {
				newQuery[key] = value;
			}
		}

		newQuery.page = 1;
		router.replace({ query: newQuery });
	}
	const initialFiltersObj = unref(rawFilters);
	if (initialFiltersObj && !useLocalPagination) {
		const filterKeys = Object.keys(initialFiltersObj);
		for (const key of filterKeys) {
			const urlVal = route.query[key];
			if (urlVal !== undefined && urlVal !== null && urlVal !== "") {
				const isCurrentlyArray = Array.isArray(initialFiltersObj[key]);
				let parsedVal = urlVal;

				if (isCurrentlyArray) {
					parsedVal = String(urlVal)
						.split(",")
						.map(Number)
						.filter((n) => !Number.isNaN(n));
				}

				if (isRef(rawFilters) && rawFilters.value) {
					rawFilters.value[key] = parsedVal;
				} else if (isRef(rawFilters[key])) {
					rawFilters[key].value = parsedVal;
				} else if (initialFiltersObj[key] !== undefined) {
					initialFiltersObj[key] = parsedVal;
				}

				if (debouncedFields.includes(key)) {
					debouncedValues[key] = parsedVal;
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
			const fetchKey = [
				...queryKey,
				{ ...queryParams.value, page: currentPage },
			];

			try {
				await queryClient.prefetchQuery({
					queryKey: fetchKey,
					queryFn: () => queryFn({ ...queryParams.value, page: currentPage }),
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
		placeholderData: (previousData, previousQuery) => {
			if (!previousQuery || !previousData) return undefined;
			const previousKey = previousQuery.queryKey;
			const previousParams = previousKey[previousKey.length - 1] || {};
			const currentParams = queryParams.value;

			const prevFiltersObj = { ...previousParams };
			delete prevFiltersObj.page;
			const curFiltersObj = { ...currentParams };
			delete curFiltersObj.page;

			if (JSON.stringify(prevFiltersObj) === JSON.stringify(curFiltersObj)) {
				return previousData;
			}
			return undefined;
		},
		...options,
		enabled: enabled,
	});

	const listData = computed(() => {
		if (!data?.value) return [];
		return typeof dataKey === "function"
			? dataKey(data.value)
			: data.value[dataKey] || [];
	});

	const paginationData = computed(() => {
		if (data.value?.pagination) return data.value.pagination;
		const root = data.value || {};
		return {
			totalPages: root.totalPages ?? root.TotalPages ?? 1,
			totalCount: root.totalCount ?? root.TotalCount ?? 0,
			pageNumber: root.pageNumber ?? root.PageNumber ?? 1,
			pageSize: root.pageSize ?? root.PageSize ?? 10,
		};
	});
	const totalPages = computed(() => paginationData.value.totalPages);

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

		if (currentPage > 1) {
			queryClient.prefetchQuery({
				queryKey: [
					...queryKey,
					{ ...queryParams.value, page: currentPage - 1 },
				],
				queryFn: () => queryFn({ ...queryParams.value, page: currentPage - 1 }),
			});
		}

		if (currentPage < total) {
			queryClient.prefetchQuery({
				queryKey: [
					...queryKey,
					{ ...queryParams.value, page: currentPage + 1 },
				],
				queryFn: () => queryFn({ ...queryParams.value, page: currentPage + 1 }),
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

	onMounted(() => {
		isInitializing = false;
	});

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
		pagination: reactive({
			currentPage: pageParam,
			totalPages: totalPages,
			itemsPerPage,
			totalItems: computed(() => paginationData.value.totalCount || 0),
			goToPage: changePage,
			nextPage: () => changePage(pageParam.value + 1),
			prevPage: () => changePage(pageParam.value - 1),
			hasNextPage: computed(() => pageParam.value < totalPages.value),
			hasPrevPage: computed(() => pageParam.value > 1),
		}),
	};
}
