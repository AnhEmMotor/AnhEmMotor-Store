import { computed } from "vue";

export const usePermissions = () => {
	const { data: permissionConfig } = usePermissionConfig();

	const PERMISSION_METADATA = computed(
		() => permissionConfig.value?.metadata || {},
	);
	const PERMISSION_GROUPS = computed(
		() => permissionConfig.value?.groups || [],
	);

	return {
		PERMISSIONS,
		PERMISSION_METADATA,
		PERMISSION_GROUPS,

		getPermissionLabel: (key) => PERMISSION_METADATA.value[key]?.label || key,
		getPermissionDescription: (key) =>
			PERMISSION_METADATA.value[key]?.description || "",

		groupedPermissions: computed(() =>
			PERMISSION_GROUPS.value.map((group) => ({
				...group,
				items: group.permissions.map((key) => ({
					key,
					...PERMISSION_METADATA.value[key],
				})),
			})),
		),
	};
};

