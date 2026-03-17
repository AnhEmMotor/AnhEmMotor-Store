<script setup>
import ProductCard from "./ProductCard.vue";

defineProps({
	products: {
		type: Array,
		required: true,
	},
	isLoading: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(["view-detail"]);
</script>

<template>
	<div class="w-full">
		<div
			v-if="isLoading && products.length === 0"
			class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
		>
			<div
				v-for="i in 6"
				:key="i"
				class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse"
			>
				<div class="aspect-[4/3] bg-gray-200" />
				<div class="p-6 space-y-4">
					<div class="h-6 bg-gray-200 rounded w-3/4" />
					<div class="h-4 bg-gray-100 rounded w-1/2" />
					<div class="flex justify-between items-center pt-4">
						<div class="h-8 bg-gray-200 rounded w-1/3" />
						<div class="h-8 bg-gray-100 rounded w-1/4" />
					</div>
				</div>
			</div>
		</div>

		<div
			v-else-if="products.length === 0"
			class="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200"
		>
			<div
				class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6"
			>
				<i class="fas fa-search text-3xl text-gray-400" />
			</div>
			<h3 class="text-xl font-bold text-gray-900 mb-2">
				Không tìm thấy sản phẩm nào
			</h3>
			<p class="text-gray-500">
				Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.
			</p>
		</div>

		<div
			v-else
			class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
		>
			<ProductCard
				v-for="product in products"
				:key="product.id"
				:product="product"
				@view-detail="emit('view-detail', $event)"
			/>
		</div>
	</div>
</template>

<style scoped></style>
