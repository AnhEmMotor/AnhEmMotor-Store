<script setup>
import { useQuery } from "@tanstack/vue-query";

const productStore = useProductStore();

const { data: products, isPending } = useQuery({
	queryKey: ["personalized-recommendations"],
	queryFn: () => productStore.getProducts({ pageSize: 4, categoryIds: "1" }), // Simulating AI with random/featured for now
	select: (res) => res.items,
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
	<section class="py-24 bg-slate-50 relative overflow-hidden">
		<div class="container mx-auto px-6 relative z-10">
			<div class="flex flex-col gap-4 mb-16">
                <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest w-fit">
                    <Icon name="ph:sparkle-bold" />
                    AI Personalization
                </div>
				<h2 class="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
					Gợi ý <span class="text-primary">Dành Cho Bạn</span>
				</h2>
				<p class="text-slate-500 text-lg font-medium max-w-2xl">
					Dựa trên sở thích và nhu cầu của bạn, chúng tôi đề xuất những mẫu xe phù hợp nhất.
				</p>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
				<template v-if="isPending">
					<div
						v-for="i in 4"
						:key="i"
						class="bg-white rounded-24 p-6 h-[400px] border border-slate-100 animate-pulse"
					/>
				</template>

				<ProductCard
					v-for="product in products"
					:key="product.id"
					:product="product"
					@click="handleViewDetail(product)"
				/>
			</div>
		</div>
	</section>
</template>
