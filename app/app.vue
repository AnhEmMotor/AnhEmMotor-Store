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
const isDevelopment = import.meta.dev;
const layoutStore = useLayoutStore();
await layoutStore.fetchLayoutData();
</script>
