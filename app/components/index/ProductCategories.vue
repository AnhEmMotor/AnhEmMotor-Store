<script setup>
import { PRODUCT_CATEGORIES } from "@/constants/category.constant";
import BaseSectionHeader from "@/components/ui/BaseSectionHeader.vue";
import CategoryCard from "@/components/ui/CategoryCard.vue";
</script>

<template>
	<section class="py-16 bg-white relative">
		<div class="container mx-auto px-4">
			<BaseSectionHeader
				title="Danh Mục"
				highlight-text="Sản Phẩm"
				center
				show-separator
			/>

			<div
				class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
			>
				<CategoryCard
					v-for="cat in PRODUCT_CATEGORIES"
					:key="cat.name"
					:category="cat"
				/>
			</div>
		</div>
	</section>
</template>
