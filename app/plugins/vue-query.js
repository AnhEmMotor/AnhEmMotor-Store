import {
	VueQueryPlugin,
	QueryClient,
	dehydrate,
	hydrate,
} from "@tanstack/vue-query";
import { defineNuxtPlugin, useState } from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
	const vueQueryState = useState("vue-query");
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 0,
				gcTime: Infinity,
				refetchOnWindowFocus: true,
			},
		},
	});
	const options = { queryClient };
	nuxtApp.vueApp.use(VueQueryPlugin, options);
	if (import.meta.server) {
		nuxtApp.hooks.hook("app:rendered", () => {
			vueQueryState.value = dehydrate(queryClient);
		});
	}
	if (import.meta.client) {
		hydrate(queryClient, vueQueryState.value);
	}
});
