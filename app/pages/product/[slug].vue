<script setup>
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/useProductStore";
import { useCart } from "~/composables/useCart";

const route = useRoute();
const slug = computed(() => route.params.slug);
const productStore = useProductStore();

const {
	data: detail,
	pending: isLoading,
	error,
} = await useAsyncData(
	"product-detail-" + slug.value,
	() => productStore.getProductStoreDetailBySlug(slug.value),
	{
		watch: [slug],
	},
);

const { data: attributeLabels } = await useAsyncData(
	"product-attribute-labels",
	() => productStore.getProductAttributeLabels(),
	{
		staleTime: 1000 * 60 * 60,
	},
);

const currentVariant = computed(() => detail.value?.current_variant);

const selectedImage = ref(null);
const mainImage = computed({
	get: () => {
		if (selectedImage.value) return selectedImage.value;
		const variant = detail.value?.current_variant;
		if (variant?.cover_image_url) return variant.cover_image_url;
		if (variant?.photo_collection?.length > 0)
			return variant.photo_collection[0];
		return "/assets/image/placeholder-product.webp";
	},
	set: (val) => {
		selectedImage.value = val;
	},
});

const isPlaceholderActive = computed(() => {
	if (
		selectedImage.value &&
		selectedImage.value !== "/assets/image/placeholder-product.webp"
	)
		return false;
	const variant = detail.value?.current_variant;
	return !(variant?.cover_image_url || variant?.photo_collection?.length > 0);
});

const allPhotos = computed(() => {
	const photos = [];
	const variant = detail.value?.current_variant;

	if (variant?.cover_image_url) {
		photos.push(variant.cover_image_url);
	}

	if (variant?.photo_collection?.length > 0) {
		const otherPhotos = variant.photo_collection.filter(
			(p) => p !== variant.cover_image_url,
		);
		photos.push(...otherPhotos);
	}

	return photos;
});

const formattedPrice = computed(() => {
	if (!currentVariant.value?.price) return "Liên hệ";
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(currentVariant.value.price);
});

const variantName = computed(() => {
	return currentVariant.value?.display_name || "";
});

const specifications = computed(() => {
	if (!detail.value?.product || !attributeLabels.value) return [];

	const product = detail.value.product;
	const labels = attributeLabels.value;

	return Object.entries(product)
		.filter(
			([key, value]) =>
				labels[key] && value !== null && value !== undefined && value !== "",
		)
		.map(([key, value]) => ({
			key,
			label: labels[key],
			value: value,
		}));
});

const handleVariantChange = (event) => {
	const targetSlug = event.target.value;
	if (targetSlug) {
		navigateTo(`/product/${targetSlug}`);
	}
};

const seoTitle = computed(() => {
	const name =
		detail.value?.product?.meta_title ||
		detail.value?.product?.name ||
		"Chi tiết sản phẩm";
	return variantName.value ? `${name} - ${variantName.value}` : name;
});

const seoDescription = computed(() => {
	return (
		detail.value?.product?.meta_description ||
		detail.value?.product?.short_description ||
		detail.value?.product?.description ||
		"Thông tin chi tiết sản phẩm tại AnhEm Motor."
	);
});

useSeoMeta({
	title: () => `${seoTitle.value} | AnhEm Motor`,
	ogTitle: () => `${seoTitle.value} | AnhEm Motor`,
	description: () => seoDescription.value,
	ogDescription: () => seoDescription.value,
	ogImage: () =>
		detail.value?.current_variant?.cover_image_url ||
		detail.value?.current_variant?.photo_collection?.[0] ||
		"/assets/image/index/index-banner-bg.webp",
	twitterTitle: () => `${seoTitle.value} | AnhEm Motor`,
	twitterDescription: () => seoDescription.value,
	twitterImage: () =>
		detail.value?.current_variant?.cover_image_url ||
		detail.value?.current_variant?.photo_collection?.[0] ||
		"/assets/image/index/index-banner-bg.webp",
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

const { addItem } = useCart();

const onAddToCart = () => {
	if (!currentVariant.value) return;

	const productToAdd = {
		id: currentVariant.value.id,
		name:
			detail.value.product.name +
			(variantName.value ? ` - ${variantName.value}` : ""),
		price: currentVariant.value.price,
		image:
			currentVariant.value.cover_image_url ||
			"/assets/image/placeholder-product.webp",
	};

	addItem(productToAdd, 1);
};
</script>

<template>
	<div class="min-h-screen bg-gray-50/50 py-5 lg:py-10">
		<div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
			<nav
				v-if="detail?.product"
				class="flex mb-8 text-sm font-medium"
				aria-label="Breadcrumb"
			>
				<ol class="inline-flex items-center">
					<li>
						<NuxtLink
							to="/"
							class="text-gray-500 hover:text-primary transition-colors"
							>Trang chủ</NuxtLink
						>
					</li>
					<li>
						<div class="flex items-center">
							<i class="fas fa-chevron-right text-gray-400 mx-2 text-[10px]" />
							<NuxtLink
								to="/products"
								class="text-gray-500 hover:text-primary transition-colors"
								>Sản phẩm</NuxtLink
							>
						</div>
					</li>
					<li aria-current="page">
						<div class="flex items-center">
							<i class="fas fa-chevron-right text-gray-400 mx-2 text-[10px]" />
							<span class="text-gray-900 line-clamp-1">
								{{ detail.product.name }}
								<span v-if="variantName" class="text-gray-500 font-medium">
									({{ variantName }})</span
								>
							</span>
						</div>
					</li>
				</ol>
			</nav>

			<div v-if="error" class="text-center py-20">
				<div
					class="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6"
				>
					<i class="fas fa-exclamation-triangle text-3xl text-red-600" />
				</div>
				<h2 class="text-2xl font-bold text-gray-900 mb-2">
					Không tìm thấy sản phẩm
				</h2>
				<p class="text-gray-500 mb-8">
					Sản phẩm có thể đã bị xóa hoặc đường dẫn không chính xác.
				</p>
				<NuxtLink
					to="/products"
					class="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/25"
				>
					Quay lại danh sách
				</NuxtLink>
			</div>

			<div
				v-else-if="isLoading && !detail"
				class="flex flex-col lg:flex-row gap-8 animate-pulse"
			>
				<div class="lg:w-2/3 aspect-[16/9] bg-gray-200 rounded-3xl" />
				<div class="lg:w-1/3 space-y-6">
					<div class="h-8 bg-gray-200 rounded w-3/4" />
					<div class="h-6 bg-gray-200 rounded w-1/2" />
					<div class="h-20 bg-gray-200 rounded w-full" />
					<div class="h-10 bg-gray-200 rounded w-1/3" />
				</div>
			</div>

			<div
				v-else
				class="bg-white rounded-[2.5rem] lg:rounded-[3.5rem] p-6 lg:p-12 shadow-xl shadow-gray-200/40 border border-gray-100"
			>
				<div class="flex flex-col lg:flex-row gap-12">
					<div class="lg:w-[58%] space-y-12">
						<div class="space-y-6">
							<div
								class="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-white shadow-lg border border-gray-100 group"
							>
								<img
									:src="mainImage"
									:alt="detail.product.name"
									class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
								/>
							</div>

							<div
								v-if="!isPlaceholderActive && allPhotos.length > 1"
								class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
							>
								<button
									v-for="(photo, index) in allPhotos"
									:key="index"
									class="relative w-20 sm:w-24 aspect-square rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 border-2"
									:class="
										mainImage === photo
											? 'border-primary ring-4 ring-primary/10 scale-105 shadow-md'
											: 'border-white hover:border-gray-200 shadow-sm opacity-80 hover:opacity-100'
									"
									@click="mainImage = photo"
								>
									<img :src="photo" class="w-full h-full object-cover" />
								</button>
							</div>
						</div>

						<div class="space-y-4">
							<h3
								class="text-base font-black text-gray-900 uppercase tracking-wider flex items-center gap-3"
							>
								<span class="w-1.5 h-6 bg-primary rounded-full" />
								Mô tả sản phẩm
							</h3>
							<div
								class="prose prose-sm max-w-none text-gray-500 font-medium leading-relaxed whitespace-pre-line text-sm"
							>
								{{ detail.product.description }}
							</div>
						</div>
					</div>

					<div class="lg:w-[42%]">
						<div class="sticky top-24">
							<div class="space-y-6">
								<div class="space-y-2">
									<h1 class="text-2xl font-black text-gray-900 leading-tight">
										{{ detail.product.name }}
									</h1>
									<p
										v-if="detail.product.short_description"
										class="text-gray-500 text-sm font-medium"
									>
										{{ detail.product.short_description }}
									</p>
									<div class="flex items-baseline gap-2 pt-2">
										<span class="text-2xl font-black text-primary">
											{{ formattedPrice }}
										</span>
									</div>
								</div>

								<div
									v-if="
										detail.other_variants && detail.other_variants.length > 0
									"
									class="space-y-3"
								>
									<label
										class="block text-[10px] font-black text-gray-400 uppercase tracking-widest"
									>
										Các phiên bản khác
									</label>
									<div class="relative">
										<select
											class="w-full pl-5 pr-10 py-3.5 bg-gray-50/50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-xl text-gray-900 font-bold text-xs appearance-none transition-all outline-none"
											@change="handleVariantChange"
										>
											<option value="" disabled selected>
												Chọn một phiên bản khác...
											</option>
											<option
												v-for="v in detail.other_variants"
												:key="v.slug"
												:value="v.slug"
											>
												{{ v.display_name }} -
												{{
													new Intl.NumberFormat("vi-VN", {
														style: "currency",
														currency: "VND",
													}).format(v.price)
												}}
											</option>
										</select>
										<div
											class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs"
										>
											<i class="fas fa-chevron-down" />
										</div>
									</div>
								</div>

								<div class="space-y-4 pt-4 border-b border-gray-100 pb-8">
									<button
										class="w-full py-4 bg-primary text-white font-black text-sm rounded-xl hover:bg-primary-dark transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/20 flex items-center justify-center gap-3"
										@click="onAddToCart"
									>
										<i class="fas fa-shopping-cart" />
										THÊM VÀO GIỎ HÀNG
									</button>
									<div class="grid grid-cols-2 gap-4">
										<button
											class="py-3 px-4 bg-white border border-gray-200 rounded-xl text-gray-600 font-bold text-xs hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
										>
											<i class="fas fa-heart text-red-500" />
											Yêu thích
										</button>
										<button
											class="py-3 px-4 bg-white border border-gray-200 rounded-xl text-gray-600 font-bold text-xs hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
										>
											<i class="fas fa-share text-blue-500" />
											Chia sẻ
										</button>
									</div>
								</div>

								<div v-if="specifications.length > 0" class="space-y-4">
									<h3
										class="text-xs font-black text-gray-900 uppercase tracking-widest"
									>
										Thông số
									</h3>
									<div
										class="bg-gray-50/50 border border-gray-100 rounded-xl overflow-hidden shadow-sm"
									>
										<table class="w-full text-left border-collapse">
											<tbody>
												<tr class="border-b border-gray-100">
													<td
														class="py-3 px-4 bg-gray-100/50 w-1/3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-r border-gray-100"
													>
														Thương hiệu
													</td>
													<td class="py-3 px-4 text-xs font-bold text-gray-900">
														{{ detail.product.brand }}
													</td>
												</tr>
												<tr class="border-b border-gray-100">
													<td
														class="py-3 px-4 bg-gray-100/50 w-1/3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-r border-gray-100"
													>
														Loại xe
													</td>
													<td class="py-3 px-4 text-xs font-bold text-gray-900">
														{{ detail.product.category }}
													</td>
												</tr>
												<tr
													v-for="spec in specifications"
													:key="spec.key"
													class="border-b last:border-0 border-gray-100"
												>
													<td
														class="py-3 px-4 bg-gray-100/50 w-1/3 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-r border-gray-100"
													>
														{{ spec.label }}
													</td>
													<td class="py-3 px-4 text-xs font-bold text-gray-900">
														{{ spec.value }}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.text-primary {
	color: #e31837;
}
.bg-primary {
	background-color: #e31837;
}
.bg-primary-dark {
	background-color: #c4122d;
}
.shadow-primary\/25 {
	box-shadow:
		0 10px 15px -3px rgba(227, 24, 55, 0.25),
		0 4px 6px -2px rgba(227, 24, 55, 0.1);
}

.scrollbar-hide::-webkit-scrollbar {
	display: none;
}
.scrollbar-hide {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
</style>
