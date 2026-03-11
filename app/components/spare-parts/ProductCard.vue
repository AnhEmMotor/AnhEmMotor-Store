<template>
	<div
		class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform transition-all hover:-translate-y-2 cursor-pointer flex flex-col"
		@click="$emit('viewDetails', product)"
	>
		<div class="relative overflow-hidden h-48 sm:h-56 md:h-64">
			<img
				:src="product.image"
				:alt="product.name"
				class="w-full h-full aspect-square object-contain p-5 transition-transform duration-300 group-hover:scale-110"
			/>
		</div>

		<div class="p-4 flex flex-col flex-1">
			<div
				class="text-sm sm:text-base font-semibold text-gray-800 mb-2 line-clamp-2"
			>
				{{ product.name }}
			</div>
			<div class="text-base sm:text-lg font-bold text-[#de0000] mb-4">
				{{ formatCurrency(product.price) }} VNĐ
			</div>

			<BaseButton @click.stop="$emit('addToCart', product)">
				<i class="fas fa-shopping-cart"></i>
				Thêm vào giỏ hàng
			</BaseButton>
		</div>
	</div>
</template>

<script setup>
import BaseButton from "~/components/ui/button/BaseButton.vue";
defineProps({
	product: {
		type: Object,
		required: true,
	},
});

defineEmits(["addToCart", "viewDetails"]);

const formatCurrency = (amount) => {
	return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
</script>
