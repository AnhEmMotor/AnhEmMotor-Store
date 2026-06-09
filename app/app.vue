<template>
	<NuxtLayout>
		<NuxtPage />
		<ClientOnly>
			<VueQueryDevtools v-if="isDevelopment" />
		</ClientOnly>
	</NuxtLayout>
</template>

<script setup>
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { useLayoutStore } from "@/core/application/stores/layout.store";
const isDevelopment = import.meta.dev;
const layoutStore = useLayoutStore();
await layoutStore.fetchLayoutData();

onMounted(() => {
	window.scrollTo(0, 0);
});

</script>
