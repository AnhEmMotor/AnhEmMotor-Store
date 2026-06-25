import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";

const toNumber = (value, fallback = 0) => {
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : fallback;
};

export function useStoreSettings() {
	const axios = useAxios();

	const { data, isPending, error, refetch } = useQuery({
		queryKey: ["store-settings"],
		queryFn: async () => {
			const { data } = await axios.get("/api/v1/Setting/store");
			return data || {};
		},
		staleTime: 1000 * 60 * 10,
	});

	const depositSettings = computed(() => ({
		orderValueExceeds: toNumber(data.value?.Order_value_exceeds, 0),
		depositRatio: toNumber(data.value?.Deposit_ratio, 0),
	}));

	return {
		settings: data,
		depositSettings,
		isPending,
		error,
		refetch,
	};
}

export default useStoreSettings;
