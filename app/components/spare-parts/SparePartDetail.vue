<template>
	<transition name="fade" mode="out-in">
		<div
			v-if="product"
			:key="product.id"
			class="container mx-auto px-4 py-8 mt-4 min-h-screen"
		>
			<nav class="flex text-sm text-gray-500 mb-6 gap-2 items-center">
				<router-link to="/" class="hover:text-red-600 transition-colors"
					>Trang chủ</router-link
				>
				<Icon name="fa6-solid:chevron-right" class="text-[10px]" />
				<router-link
					to="/spare-parts"
					class="hover:text-red-600 transition-colors"
					>Phụ tùng</router-link
				>
				<Icon name="fa6-solid:chevron-right" class="text-[10px]" />
				<span class="text-gray-900 font-medium truncate max-w-[200px]">{{
					product.name
				}}</span>
			</nav>

			<div
				class="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 mb-16"
			>
				<div class="flex flex-col lg:flex-row gap-12">
					<div class="w-full lg:w-1/2">
						<div
							class="bg-gray-50 rounded-2xl p-6 md:p-12 flex items-center justify-center border border-gray-50 sticky top-24"
						>
							<img
								:src="product.image"
								:alt="product.name"
								class="max-w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
							>
						</div>
					</div>

					<div class="w-full lg:w-1/2 flex flex-col">
						<div class="mb-6">
							<span
								class="inline-block px-3 py-1 bg-red-50 text-[#de0000] text-xs font-bold rounded-full mb-4 uppercase tracking-widest"
							>
								{{ product.type }}
							</span>
							<h1
								class="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight"
							>
								{{ product.name }}
							</h1>
							<div class="text-3xl font-bold text-[#de0000]">
								{{ formatCurrency(product.price) }}
								<span class="text-lg">VNĐ</span>
							</div>
						</div>

						<div class="space-y-8 flex-grow">
							<div class="pt-6 border-t border-gray-100">
								<h3
									class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3"
								>
									Mô tả phụ tùng
								</h3>
								<p class="text-gray-600 leading-relaxed text-lg">
									{{
										product.description ||
										"Thông tin kỹ thuật đang được cập nhật cho loại phụ tùng này."
									}}
								</p>
							</div>

							<div class="pt-6 border-t border-gray-100">
								<h3
									class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3"
								>
									Số lượng đặt hàng
								</h3>
								<div class="flex items-center gap-6">
									<div
										class="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white"
									>
										<button
											class="px-5 py-3 bg-gray-50 hover:bg-gray-200 transition-colors border-r border-gray-200 text-gray-600"
											@click="changeQty(-1)"
										>
											<Icon name="fa6-solid:minus" />
										</button>
										<input
											v-model.number="quantity"
											type="number"
											class="w-14 text-center font-bold text-lg focus:outline-none pointer-events-none"
											min="1"
										>
										<button
											class="px-5 py-3 bg-gray-50 hover:bg-gray-200 transition-colors border-l border-gray-200 text-gray-600"
											@click="changeQty(1)"
										>
											<Icon name="fa6-solid:plus" />
										</button>
									</div>
									<span
										class="text-green-600 text-sm font-medium flex items-center gap-2"
									>
										<span
											class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
										/>
										Chính hãng sẵn có
									</span>
								</div>
							</div>

							<div class="pt-8">
								<button
									class="w-full md:w-auto px-16 py-4 bg-[#de0000] text-white rounded-xl font-bold text-lg hover:bg-black hover:shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-3"
									@click="handleAddToCart"
								>
									<Icon name="fa6-solid:screwdriver-wrench" /> THÊM VÀO GIỎ HÀNG
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-20">
				<div
					class="flex items-center justify-between mb-8 border-b border-gray-200 pb-5"
				>
					<div class="flex items-center gap-3">
						<div class="w-2 h-8 bg-[#de0000] rounded-full" />
						<h2
							class="text-2xl font-bold text-gray-800 uppercase tracking-tight"
						>
							Có thể bạn cần
						</h2>
					</div>
					<router-link
						to="/spare-parts"
						class="text-[#de0000] font-bold hover:text-black transition-colors flex items-center gap-2 group"
					>
						Xem thêm
						<Icon
							name="fa6-solid:arrow-right"
							class="text-sm group-hover:translate-x-1 transition-transform"
						/>
					</router-link>
				</div>

				<div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
					<ProductCard
						v-for="item in relatedSpareParts"
						:key="item.id"
						:product="item"
						@add-to-cart="quickAddToCart"
						@view-details="goToRelatedDetail"
					/>
				</div>
			</div>
		</div>

		<div
			v-else
			class="flex flex-col justify-center items-center h-[80vh] text-gray-400 gap-4"
		>
			<div
				class="w-12 h-12 border-4 border-gray-200 border-t-[#de0000] rounded-full animate-spin"
			/>
			<div class="text-lg font-medium animate-pulse">Đang tải phụ tùng...</div>
		</div>
	</transition>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { products } from "../components/spare-parts/products-data";
import { useCart } from "~/composables/useCart";
import ProductCard from "~/components/accessories/ProductCard.vue";

const route = useRoute();
const router = useRouter();
const { addItem } = useCart();

const product = ref(null);
const quantity = ref(1);

const formatCurrency = (val) => val?.toLocaleString("vi-VN");

const changeQty = (val) => {
	const newQty = quantity.value + val;
	if (newQty >= 1) quantity.value = newQty;
};

const loadData = () => {
	const id = route.params.id;
	if (!id) return;

	const foundProduct = products.find((p) => String(p.id) === String(id));

	if (foundProduct) {
		product.value = foundProduct;
		quantity.value = 1;
		window.scrollTo({ top: 0, behavior: "smooth" });
	} else {
		router.replace({ name: "spare-parts" });
	}
};

const relatedSpareParts = computed(() => {
	if (!product.value) return [];
	return products
		.filter(
			(p) =>
				p.type === product.value.type &&
				String(p.id) !== String(product.value.id),
		)
		.slice(0, 4);
});

const handleAddToCart = () => {
	if (product.value) {
		addItem(product.value, quantity.value);
	}
};

const goToRelatedDetail = (p) => {
	if (p?.id) {
		router.push({ name: "spare-part-detail", params: { id: String(p.id) } });
	}
};

const quickAddToCart = (p) => addItem(p, 1);

onMounted(loadData);

watch(
	() => route.params.id,
	(newId) => {
		if (newId) loadData();
	},
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.container {
	scrollbar-gutter: stable;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>
