<script setup>
import { ref } from "vue";

useSeoMeta({
	title: "Danh Mục Sản Phẩm | AnhEm Motor",
	ogTitle: "Danh Mục Sản Phẩm | AnhEm Motor",
	description:
		"Khám phá đầy đủ danh mục xe máy, phụ tùng và phụ kiện chính hãng tại AnhEm Motor.",
	ogDescription:
		"Khám phá đầy đủ danh mục xe máy, phụ tùng và phụ kiện chính hãng tại AnhEm Motor.",
	ogImage: "/assets/image/index/index-banner-bg.webp",
	twitterTitle: "Danh Mục Sản Phẩm | AnhEm Motor",
	twitterDescription:
		"Khám phá đầy đủ danh mục xe máy, phụ tùng và phụ kiện chính hãng tại AnhEm Motor.",
	twitterImage: "/assets/image/index/index-banner-bg.webp",
});

useHead({
	link: [
		{
			rel: "icon",
			type: "image/x-icon",
			href: "/favicon.ico",
		},
	],
});

const categories = ref([
	{
		href: "/products?page=1&categoryIds=1",
		imgSrc: "/assets/image/categories/xe.webp",
		alt: "Xe",
		title: "Xe",
	},
	{
		href: "/products?page=1&categoryIds=3",
		imgSrc: "/assets/image/categories/spare-parts.webp",
		alt: "Phụ tùng",
		title: "Phụ Tùng",
	},
	{
		href: "/products?page=1&categoryIds=2",
		imgSrc: "/assets/image/categories/accessories.webp",
		alt: "Phụ kiện",
		title: "Phụ Kiện",
	},
]);
</script>

<template>
	<div
		class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-6 sm:mb-12 pt-16 sm:pt-18 md:pt-20"
	>
		<div class="text-center mb-12">
			<h1 class="text-3xl md:text-4xl font-extrabold text-red-600 mb-3">
				Danh Mục Sản Phẩm
			</h1>
			<p class="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
				Khám phá bộ sưu tập xe máy đa dạng với chất lượng hàng đầu từ các thương
				hiệu uy tín
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
			<NuxtLink
				v-for="(category, index) in categories"
				:key="index"
				:to="category.href"
				class="group relative bg-white rounded-xl overflow-hidden shadow-md transform transition-transform duration-300 hover:-translate-y-2"
			>
				<div class="absolute inset-0 pointer-events-none z-20 overflow-hidden">
					<div
						class="absolute inset-0"
						style="
							background: linear-gradient(
								135deg,
								transparent,
								rgba(231, 76, 60, 0.06),
								transparent
							);
							opacity: 0;
						"
					/>
					<div
						class="absolute top-0 h-full group-hover:translate-x-[60%] transition-transform duration-900 ease-in-out opacity-80"
					/>
				</div>
				<div
					class="relative z-10 w-full h-72 md:h-96 lg:h-[400px] bg-gray-50 flex items-center justify-center"
				>
					<img
						:src="category.imgSrc"
						:alt="category.alt"
						class="object-contain w-full h-full p-6 sm:p-8 md:p-12 transition-transform duration-300 group-hover:scale-105"
					>
					<div
						class="absolute bottom-4 right-4 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white text-lg transition-all duration-300 group-hover:bg-red-700 group-hover:scale-110"
					>
						<Icon name="fa6-solid:arrow-right" />
					</div>
				</div>
				<div class="p-4 bg-gray-50 text-center z-10">
					<h3 class="text-base sm:text-lg font-semibold text-gray-700">
						{{ category.title }}
					</h3>
				</div>
			</NuxtLink>
		</div>
	</div>
</template>
