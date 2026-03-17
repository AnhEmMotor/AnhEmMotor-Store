<template>
	<NuxtLayout>
		<NuxtRouteAnnouncer />
		<NuxtPage />
		<VueQueryDevtools v-if="isDevelopment" />
	</NuxtLayout>
</template>

<script setup>
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
const isDevelopment = process.env.NODE_ENV === "development";
</script>
