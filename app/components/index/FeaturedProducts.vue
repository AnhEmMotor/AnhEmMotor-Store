<script setup>
import { useQuery } from "@tanstack/vue-query";


const productStore = useProductStore();
const activeTab = ref("new");

const tabs = [
	{ id: "new", label: "Mới nhất", categoryIds: "1" },
	{ id: "best", label: "Bán chạy nhất", categoryIds: "1" },
	{ id: "promo", label: "Khuyến mãi hot", categoryIds: "1" },
];

const { data: products, isPending, refetch } = useQuery({
	queryKey: ["featured-products", activeTab],
	queryFn: () => productStore.getProducts({ pageSize: 4, categoryIds: tabs.find(t => t.id === activeTab.value).categoryIds }),
	select: (res) => res.items,
});

watch(activeTab, () => {
	refetch();
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

		<div class="container mx-auto px-6 relative z-10">
			<div
				class="flex flex-col md:flex-row justify-between items-end gap-10 mb-16"
			>
				<div class="space-y-4 max-w-3xl">
                    <div class="text-primary font-bold uppercase tracking-widest text-sm">Lựa chọn hàng đầu</div>
					<h2
						class="text-4xl md:text-5xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-tight"
					>
						Sản phẩm <span class="text-primary">Nổi Bật</span>
					</h2>
					<p class="text-slate-500 text-lg font-medium max-w-2xl">
						Khám phá các mẫu xe mới nhất với giá lăn bánh minh bạch & ưu đãi hấp dẫn nhất khu vực.
					</p>
				</div>

				<div class="flex items-center gap-4">
					<NuxtLink
						to="/products"
						class="px-8 py-4 bg-white hover:bg-slate-900 hover:text-white border border-slate-200 rounded-xl font-bold transition-all shadow-soft whitespace-nowrap flex items-center gap-2"
					>
						Tất cả mẫu xe
                        <Icon name="ph:arrow-right-bold" />
					</NuxtLink>
				</div>
			</div>

			<div class="flex flex-wrap gap-4 mb-12 border-b border-slate-100 pb-6">
				<button
					v-for="tab in tabs"
					:key="tab.id"
					class="px-6 py-3 rounded-full font-bold transition-all"
					:class="activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'"
					@click="activeTab = tab.id"
				>
					{{ tab.label }}
				</button>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
				<template v-if="isPending && !products">
					<div
						v-for="i in 4"
						:key="i"
						class="bg-white rounded-24 p-6 h-[450px] border border-slate-50 animate-pulse space-y-6"
					>
						<div class="w-full aspect-[4/5] bg-slate-50 rounded-18" />
						<div class="h-6 bg-slate-50 rounded-full w-3/4" />
						<div class="h-4 bg-slate-50 rounded-full w-1/2" />
						<div class="h-12 bg-slate-50 rounded-xl w-full" />
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
