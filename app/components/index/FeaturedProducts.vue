<script setup>
import { useQuery } from "@tanstack/vue-query";


const productStore = useProductStore();

const { data: ssrData } = await useAsyncData("featured-products-ssr", () =>
	productStore.getProducts({ pageSize: 4, categoryIds: "1" }),
);

const { data: products, isPending } = useQuery({
	queryKey: ["featured-products"],
	queryFn: () => productStore.getProducts({ pageSize: 4, categoryIds: "1" }),
	select: (res) => res.items,
	initialData: ssrData.value,
});

const handleViewDetail = (product) => {
	const variant =
		product.variants && product.variants.length > 0
			? product.variants[0]
			: null;
	if (variant?.url) {
		navigateTo(`/product/${variant.url}`);
	}
};
</script>

<template>
	<section
		id="featured-products"
		class="py-24 bg-white relative overflow-hidden"
	>
		<div
			class="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"
		/>

		<div class="container mx-auto px-4 relative z-10">
			<div
				class="flex flex-col md:flex-row justify-between items-center gap-10 mb-16 px-4"
			>
				<div class="space-y-4">
					<h2
						class="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 leading-none"
					>
						Sản phẩm <span class="text-red-600">Nổi Bật</span>
					</h2>
					<p class="text-gray-500 text-lg max-w-2xl mx-auto lg:mx-0">
						Khám phá các mẫu xe mới nhất với giá lăn bánh minh bạch.
					</p>
				</div>

				<div class="flex items-center gap-4">
					<NuxtLink
						to="/products"
						class="px-8 py-4 bg-white hover:bg-slate-900 hover:text-white border-2 border-slate-200 rounded-2xl font-black uppercase tracking-widest transition-all shadow-sm whitespace-nowrap"
					>
						Tất cả mẫu xe
					</NuxtLink>
				</div>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
				<template v-if="isPending && !products">
					<div
						v-for="i in 4"
						:key="i"
						class="bg-white rounded-[40px] p-5 h-[400px] border border-slate-100 animate-pulse"
					>
						<div class="w-full h-48 bg-slate-50 rounded-[32px] mb-4" />
						<div class="h-6 bg-slate-50 rounded-full w-3/4 mb-2" />
						<div class="h-4 bg-slate-50 rounded-full w-1/2 mb-8" />
						<div class="h-12 bg-slate-50 rounded-2xl w-full" />
					</div>
				</template>

				<ProductCard
					v-for="product in products"
					v-else
					:key="product.id"
					:product="product"
					show-action
					@click="handleViewDetail(product)"
				/>
			</div>
		</div>
	</section>
</template>

<style scoped>
#featured-products :deep(.ProductCard) {
	@apply h-full;
}
</style>
