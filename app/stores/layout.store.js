import { defineStore } from "pinia";
import { ref } from "vue";
import layoutService from "@/services/layout.service";
import layoutMapper from "@/mappers/layout.mapper";

export const useLayoutStore = defineStore("layout", () => {
	const navItems = ref([]);
	const footerData = ref(null);
	const isLoading = ref(false);

	const fetchLayoutData = async () => {
		isLoading.value = true;
		try {
			const [rawNav, rawFooter] = await Promise.all([
				layoutService.getNavItems(),
				layoutService.getFooterData(),
			]);

			navItems.value = layoutMapper.mapNavItems(rawNav);
			footerData.value = layoutMapper.mapFooterData(rawFooter);
		} catch {
			// console.error("Error fetching layout data");
		} finally {
			isLoading.value = false;
		}
	};

	return {
		navItems,
		footerData,
		isLoading,
		fetchLayoutData,
	};
});
