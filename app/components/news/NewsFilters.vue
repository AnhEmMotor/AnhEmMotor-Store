<script setup>
import { newsService } from "@/services/news.service";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, onServerPrefetch } from "vue";

const route = useRoute();
const queryClient = useQueryClient();
const activeTab = computed(() => route.query.category || "all");

const queryKey = ["news-categories"];
const nuxtApp = useNuxtApp();
const queryFn = () =>
	nuxtApp.runWithContext(() => newsService.getNewsCategories());

if (import.meta.server) {
	onServerPrefetch(async () => {
		await queryClient.prefetchQuery({
			queryKey,
			queryFn,
			staleTime: 5000,
		});
	});
}

const { data: dynamicCategories } = useQuery({
	queryKey,
	queryFn,
	staleTime: 5000,
});

const categories = computed(() => {
	const allNews = {
		id: "all",
		name: "Tất cả tin tức",
		slug: "all",
		icon: "ph:newspaper-fill",
	};
	return [allNews, ...(dynamicCategories.value || [])];
});

const getTabLink = (cat) => {
	if (cat.id === "all") return "/news";
	return `/news?category=${cat.slug}`;
};
</script>

<template>
	<div class="w-full overflow-hidden py-4 md:py-6 font-['Manrope'] relative">
		<!-- Gradient Fades for depth -->
		<div
			class="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none lg:hidden"
		/>
		<div
			class="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none lg:hidden"
		/>

		<div
			class="flex lg:justify-center overflow-x-auto lg:overflow-visible no-scrollbar scroll-smooth px-4 md:px-0"
		>
			<!-- Animated Wrapper for Mobile -->
			<div
				class="flex flex-nowrap lg:flex-wrap items-center gap-2 md:gap-4 p-1 md:p-2 bg-gray-50/50 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm marquee-container lg:animate-none"
			>
				<!-- First Set -->
				<NuxtLink
					v-for="cat in categories"
					:key="cat.id"
					:to="getTabLink(cat)"
					class="flex items-center gap-2 md:gap-3 px-4 md:px-8 py-2.5 md:py-4 rounded-xl md:rounded-2xl text-[9px] md:text-[11px] font-black uppercase tracking-widest transition-all duration-500 group relative whitespace-nowrap marquee-item flex-shrink-0"
					:class="[
						activeTab === cat.slug || (activeTab === 'all' && cat.id === 'all')
							? 'bg-red-600 text-white shadow-lg scale-105 z-20'
							: 'text-gray-400 hover:text-gray-900 hover:bg-white',
					]"
				>
					{{ cat.name }}
					<div
						v-if="
							activeTab === cat.slug ||
							(activeTab === 'all' && cat.id === 'all')
						"
						class="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff]"
					/>
				</NuxtLink>

				<!-- Duplicate Set for Seamless Loop (Mobile Only) -->
				<NuxtLink
					v-for="cat in categories"
					:key="`${cat.id}-clone`"
					:to="getTabLink(cat)"
					class="flex lg:hidden items-center gap-2 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-500 group relative whitespace-nowrap marquee-item flex-shrink-0"
					:class="[
						activeTab === cat.slug || (activeTab === 'all' && cat.id === 'all')
							? 'bg-red-600 text-white shadow-lg scale-105'
							: 'text-gray-400 hover:text-gray-900 hover:bg-white',
					]"
				>
					<Icon
						:name="cat.icon"
						class="text-base"
						:class="
							activeTab === cat.slug ||
							(activeTab === 'all' && cat.id === 'all')
								? 'text-white'
								: 'text-gray-400 group-hover:text-red-500'
						"
					/>
					{{ cat.name }}
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<style scoped>
@media (max-width: 1024px) {
	.marquee-container {
		animation: marquee 20s linear infinite;
		display: flex;
		width: max-content;
	}

	.marquee-container:hover,
	.marquee-container:active {
		animation-play-state: paused;
	}

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}
}

.no-scrollbar::-webkit-scrollbar {
	display: none;
}
.no-scrollbar {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
</style>
