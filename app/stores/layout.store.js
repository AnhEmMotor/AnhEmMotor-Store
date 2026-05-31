import { defineStore } from "pinia";
import { ref } from "vue";
import layoutService from "../services/layout.service";
import layoutMapper from "../mappers/layout.mapper";
import { FLOATING_BUTTONS, HERO_BIKE_MODELS } from "../constants/layout";

export const useLayoutStore = defineStore("layout", () => {
	const navItems = ref([]);
	const footerData = ref(null);
	const isLoading = ref(false);
	const floatingButtons = ref(FLOATING_BUTTONS);
	const heroBikeModels = ref(HERO_BIKE_MODELS);

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
		} finally {
			isLoading.value = false;
		}
	};

	return {
		navItems,
		footerData,
		isLoading,
		floatingButtons,
		heroBikeModels,
		fetchLayoutData,
	};
});
