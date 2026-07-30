<script setup>
import { storeToRefs } from "pinia";
import { ref, computed, onMounted } from "vue";

const compareStore = useCompareStore();
const productStore = useProductStore();
const { products: compareProducts } = storeToRefs(compareStore);

// State
const isComparing = ref(false);
const isModalOpen = ref(false);
const searchQuery = ref("");

// All products for selection
const allProducts = ref([]);
const { data, pending: isLoadingProducts } = await useAsyncData(
	"all-products-compare",
	() => productStore.getProducts({ pageSize: 100 })
);

if (data.value && data.value.items) {
	allProducts.value = data.value.items.filter(p => {
		const cat = p.category?.toLowerCase() || '';
		return cat.includes("xe máy") || cat.includes("motor");
	});
}

// Comparison details
const detailedProducts = ref([null, null, null]);
const isLoadingComparison = ref(true);

const fetchComparisonData = async () => {
	if (compareProducts.value.length === 0) {
		detailedProducts.value = [null, null, null];
		isLoadingComparison.value = false;
		return;
	}
	isLoadingComparison.value = true;
	try {
		// Remove products no longer in compareProducts
		for (let i = 0; i < 3; i++) {
			if (detailedProducts.value[i] && !compareProducts.value.find(p => p.id === detailedProducts.value[i].product.id)) {
				detailedProducts.value[i] = null;
			}
		}

		// Add new products
		const promises = compareProducts.value.map(async (p) => {
			if (!detailedProducts.value.find(item => item && item.product.id === p.id)) {
				const detail = await productStore.fetchFullProductDetail(p.slug);
				if (detail && detail.product) {
					detail.product.id = p.id;
				}
				return detail;
			}
			return null;
		});
		const results = await Promise.all(promises);
		
		results.forEach(res => {
			if (res) {
				const emptySlot = detailedProducts.value.findIndex(item => item === null);
				if (emptySlot !== -1) {
					detailedProducts.value[emptySlot] = res;
				}
			}
		});
	} catch {
	} finally {
		isLoadingComparison.value = false;
	}
};

onMounted(() => {
	if (compareProducts.value.length >= 2) {
		isComparing.value = true;
	}
	fetchComparisonData();
});

const specGroups = [
	{
		name: "Động cơ",
		keys: [
			"engine_type",
			"transmission_type",
		],
	},
	{
		name: "Kích thước & Trọng lượng",
		keys: [
			"dimensions",
			"weight",
			"wheelbase",
			"seat_height",
			"ground_clearance",
			"fuel_capacity",
		],
	},
	{
		name: "Hệ thống phanh & Giảm xóc",
		keys: [
			"front_suspension",
			"rear_suspension",
			"front_tire_size",
			"rear_tire_size",
			"front_brake",
			"rear_brake",
		],
	},
	{
		name: "Công nghệ",
		keys: [
			"starter_system",
			"fuel_system",
		],
	},
	{
		name: "Tiện ích",
		keys: [
			"lighting_system",
			"dashboard_type",
		],
	},
	{
		name: "Thông số kỹ thuật",
		keys: [
			"displacement",
			"bore_stroke",
			"compression_ratio",
			"max_power",
			"max_torque",
			"fuel_consumption",
			"oil_capacity",
			"battery_type",
		],
	},
];

const specLabels = {
	engine_type: "Loại động cơ",
	displacement: "Dung tích xy-lanh",
	bore_stroke: "Đường kính x Hành trình piston",
	compression_ratio: "Tỷ số nén",
	max_power: "Công suất tối đa",
	max_torque: "Moment xoắn cực đại",
	fuel_system: "Hệ thống cung cấp nhiên liệu",
	transmission_type: "Loại truyền động",
	starter_system: "Hệ thống khởi động",
	dimensions: "Kích thước (D x R x C)",
	weight: "Trọng lượng bản thân",
	wheelbase: "Khoảng cách trục bánh xe",
	seat_height: "Độ cao yên",
	ground_clearance: "Khoảng sáng gầm xe",
	fuel_capacity: "Dung tích bình xăng",
	front_suspension: "Phuộc trước",
	rear_suspension: "Phuộc sau",
	front_tire_size: "Kích cỡ lốp trước",
	rear_tire_size: "Kích cỡ lốp sau",
	front_brake: "Phanh trước",
	rear_brake: "Phanh sau",
	fuel_consumption: "Mức tiêu thụ nhiên liệu",
	oil_capacity: "Dung tích nhớt máy",
	battery_type: "Loại ắc quy",
	lighting_system: "Hệ thống chiếu sáng",
	dashboard_type: "Đồng hồ hiển thị",
};

const getSpecValue = (productDetail, key) => {
	const spec = productDetail.specifications.find((s) => s.key === key);
	return spec ? spec.value : "—";
};

const removeProduct = (productId) => {
	compareStore.removeProduct(productId);
	const index = detailedProducts.value.findIndex(item => item && item.product.id === productId);
	if (index !== -1) {
		detailedProducts.value[index] = null;
	}
	if (compareProducts.value.length === 0) {
		isComparing.value = false;
	}
};

const formatPrice = (price) => productMapper.formatPrice(price);

const getProductImage = (item) => {
	return (
		item?.currentVariant?.colors?.[0]?.image ||
		item?.currentVariant?.photos?.[0] ||
		item?.currentVariant?.image ||
		item?.currentVariant?.coverImageUrl ||
		item?.currentVariant?.cover_image_url ||
		item?.product?.image ||
		item?.product?.coverImageUrl ||
		item?.product?.cover_image_url ||
		"/assets/image/placeholder-product.webp"
	);
};

const getBasicProductImage = (product) => {
	return (
		product?.image ||
		product?.coverImageUrl ||
		product?.cover_image_url ||
		"/assets/image/placeholder-product.webp"
	);
};

// Selection Actions
const toggleSelect = (product) => {
	const isSelected = compareProducts.value.some(p => p.id === product.id);
	if (isSelected) {
		compareStore.removeProduct(product.id);
		const index = detailedProducts.value.findIndex(item => item && item.product.id === product.id);
		if (index !== -1) {
			detailedProducts.value[index] = null;
		}
		if (compareProducts.value.length === 0) {
			isComparing.value = false;
		}
	} else {
		if (compareProducts.value.length < 3) {
			compareStore.addProduct(product);
			if (isComparing.value) {
				productStore.fetchFullProductDetail(product.slug).then(res => {
					if (res && res.product) {
						res.product.id = product.id;
						const emptySlot = detailedProducts.value.findIndex(item => item === null);
						if (emptySlot !== -1) {
							detailedProducts.value[emptySlot] = res;
						}
					}
				});
			}
		}
	}
};

const handleCompare = async () => {
	if (compareProducts.value.length >= 2) {
		const currentCount = detailedProducts.value.filter(Boolean).length;
		if (currentCount !== compareProducts.value.length) {
			await fetchComparisonData();
		}
		isComparing.value = true;
	}
};

// Modal Filter
const filteredProducts = computed(() => {
	if (!searchQuery.value) return allProducts.value;
	return allProducts.value.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});
</script>

<template>
	<div class="min-h-screen bg-white pt-32 pb-24">
		<div class="max-w-[1400px] mx-auto px-6">
			
			<!-- Tiêu đề Header -->
			<div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
				<div class="flex flex-col">
					<button
						v-if="isComparing"
						class="flex items-center text-sm font-bold text-gray-900 hover:text-[#CC0000] transition-colors mb-4"
						@click="isComparing = false"
					>
						<Icon name="fa6-solid:chevron-left" class="mr-2 text-xs" /> Quay về bộ sưu tập sản phẩm
					</button>
					
					<div v-if="!isComparing">
						<h1 class="text-3xl font-black text-gray-900 uppercase tracking-tighter leading-none">
							SO SÁNH THÔNG SỐ XE
						</h1>
					</div>
					<h1 v-else class="text-3xl font-black text-[#CC0000] uppercase tracking-tighter leading-none italic mt-4">
						SO SÁNH SẢN PHẨM
					</h1>
				</div>

				<div class="flex items-center gap-4">
					<span v-if="!isComparing" class="text-sm font-bold text-gray-400">{{ compareProducts.length }}/3 mẫu xe</span>
					
					<button
						v-if="compareProducts.length > 0 && !isComparing"
						class="text-[10px] font-black uppercase tracking-widest text-[#CC0000] hover:text-black transition-colors"
						@click="compareStore.clearAll"
					>
						Xóa lựa chọn
					</button>
					
					<button
						v-if="!isComparing"
						:disabled="compareProducts.length < 2"
						:class="compareProducts.length >= 2 ? 'bg-black text-white hover:bg-[#CC0000] cursor-pointer active:scale-95' : 'bg-black text-white cursor-not-allowed opacity-50'"
						class="px-8 py-3 rounded-none font-black uppercase tracking-widest text-[10px] transition-all"
						@click="handleCompare"
					>
						So sánh ngay <Icon name="fa6-solid:arrow-right" class="ml-1" />
					</button>
				</div>
			</div>

			<!-- Bước 1: Màn hình Danh sách Sản phẩm (Selection Mode) -->
			<div v-if="!isComparing" class="bg-gray-50/30 p-8 lg:p-12 border border-gray-100">
				<div v-if="isLoadingProducts" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
					<div v-for="i in 8" :key="i" class="aspect-square bg-gray-100" />
				</div>
				<div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
					<div
						v-for="product in allProducts"
						:key="product.id"
						class="relative group cursor-pointer transition-all duration-300 flex flex-col justify-between"
						@click="toggleSelect(product)"
					>
						<div>
							<h3 class="text-sm font-black text-black uppercase leading-tight line-clamp-1 mb-2">{{ product.name }}</h3>
							<!-- MỚI Badge -->
							<span class="inline-block px-2 py-0.5 bg-red-500 text-white text-[8px] font-black uppercase mb-2">MỚI</span>
							
							<div class="aspect-[4/3] mb-4 relative p-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
								<img :src="getBasicProductImage(product)" :alt="product.name" class="max-w-full max-h-full object-contain mix-blend-multiply" >
							</div>
						</div>
						
						<div class="flex items-center justify-between mt-4">
							<p class="text-xs font-medium text-gray-500">Giá từ: <span class="text-gray-900 font-black text-xs">{{ formatPrice(product.price) }}</span></p>
							<!-- Checkbox -->
							<div
								class="w-5 h-5 rounded-full flex items-center justify-center transition-colors shadow-sm"
								:class="compareProducts.some(p => p.id === product.id) ? 'bg-[#CC0000] text-white' : 'bg-gray-100 text-transparent group-hover:border-gray-300'"
							>
								<Icon name="fa6-solid:check" class="text-[9px]" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Bước 2: Bảng so sánh (Comparison Mode) -->
			<div v-else class="relative bg-white border border-gray-100 pb-12">
				<div class="overflow-x-auto scrollbar-hide">
					<div class="min-w-[900px] lg:min-w-0">
						
						<!-- Header Cột Xe -->
						<div class="bg-white pt-8 pb-4 border-b border-gray-200">
							<div class="grid grid-cols-12 items-stretch">
								
								<!-- Vòng lặp xe đã chọn & ô trống -->
								<template v-for="(item, idx) in detailedProducts" :key="item ? item.product.id : 'empty-' + idx">
									<!-- Slot Xe -->
									<div
										v-if="item"
										class="col-span-4 flex flex-col items-center relative border-r border-gray-200 px-6 last:border-r-0"
									>
										<div class="aspect-[4/3] w-full mb-4 overflow-hidden flex items-center justify-center pt-4">
											<img
												:src="getProductImage(item)"
												:alt="item.product.name"
												class="w-full h-full object-contain hover:scale-105 transition-transform duration-500 p-4"
												@error="$event.target.src = '/assets/image/placeholder-product.webp'"
											>
										</div>

										<div class="w-full flex items-center justify-between bg-[#CC0000] text-white px-4 py-3">
											<h3 class="text-base font-black truncate flex-1">{{ item.product.name }}</h3>
											<div class="flex gap-4 shrink-0 ml-2">
												<button class="hover:opacity-70 transition-opacity" @click="isModalOpen = true"><Icon name="fa6-solid:arrows-rotate" class="text-sm" /></button>
												<button class="hover:opacity-70 transition-opacity" @click="removeProduct(item.product.id)"><Icon name="fa6-solid:xmark" class="text-xl font-light" /></button>
											</div>
										</div>
										<div class="w-full bg-white border-x border-b border-gray-200 relative">
											<select v-model="item.currentVariant" class="w-full text-[13px] font-black text-gray-700 py-4 px-4 outline-none cursor-pointer appearance-none bg-transparent relative z-10">
												<option :value="item.currentVariant">Phiên bản {{ item.currentVariant.name || 'Tiêu chuẩn' }}</option>
												<option v-for="v in item.otherVariants" :key="v.slug" :value="v">Phiên bản {{ v.name || 'Tiêu chuẩn' }}</option>
											</select>
											<!-- Chevron overlay -->
											<Icon name="fa6-solid:chevron-down" class="absolute right-4 top-[50%] -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
										</div>
										<div class="w-full text-center bg-white border-x border-b border-gray-200">
											<NuxtLink :to="`/product/${item.currentVariant.slug}`" class="block w-full py-4 text-[#CC0000] text-[11px] font-black uppercase tracking-widest hover:bg-red-50 transition-colors">
												XEM CHI TIẾT XE <Icon name="fa6-solid:arrow-right" class="ml-1" />
											</NuxtLink>
										</div>
									</div>

									<!-- Slot Ô trống -->
									<div
										v-else
										class="col-span-4 flex flex-col items-center justify-center bg-white border-r border-gray-200 p-8 min-h-[300px] last:border-r-0"
									>
										<div class="mb-10 relative opacity-20 flex justify-center items-center">
											<Icon name="fa6-solid:motorcycle" class="text-8xl text-gray-400" />
											<Icon name="fa6-solid:plus" class="absolute top-0 right-0 text-3xl text-gray-500 font-bold" />
										</div>
										<div class="w-full mt-auto">
											<button class="w-full py-4 border border-[#CC0000] text-[#CC0000] hover:bg-[#CC0000] hover:text-white text-[11px] font-black uppercase tracking-widest transition-colors flex justify-center items-center gap-2 bg-white group hover:bg-[#CC0000]" @click="isModalOpen = true">
												CHỌN THÊM SẢN PHẨM <Icon name="fa6-solid:plus" />
											</button>
										</div>
									</div>
								</template>
							</div>
						</div>

						<!-- Nội dung bảng thông số -->
						<div class="relative">
							<!-- Hàng Giá bán -->
							<div class="grid grid-cols-12 items-stretch border-b border-gray-200 bg-white">
								<template v-for="(item, idx) in detailedProducts" :key="'price-'+(item ? item.product.id : idx)">
									<div v-if="item" class="col-span-4 p-8 border-r border-gray-200 last:border-r-0 flex flex-col justify-center">
										<h4 class="text-[17px] font-black text-[#CC0000] mb-3">Giá bán lẻ đề xuất</h4>
										<span class="text-[15px] text-gray-900 font-medium">{{ formatPrice(item.currentVariant.price) }}</span>
									</div>
									<div v-else class="col-span-4 p-8 border-r border-gray-200 last:border-r-0 flex flex-col justify-center bg-gray-50/50">
										<h4 class="text-[17px] font-black text-gray-400 mb-3">Giá bán lẻ đề xuất</h4>
										<span class="text-[15px] text-gray-400 font-medium">-</span>
									</div>
								</template>
							</div>

							<!-- Lặp qua từng nhóm thông số -->
							<div v-for="(group, gIdx) in specGroups" :key="group.name" class="grid grid-cols-12 items-stretch border-b border-gray-200 bg-white">
								
								<template v-for="(item, idx) in detailedProducts" :key="'group-'+gIdx+'-'+(item ? item.product.id : idx)">
									<div v-if="item" class="col-span-4 p-8 border-r border-gray-200 last:border-r-0">
										<h4 class="text-[17px] font-black text-[#CC0000] mb-6">{{ group.name }}</h4>
										<div class="space-y-6">
											<div v-for="key in group.keys" :key="'val-'+key">
												<div class="text-[14px] text-gray-500 font-medium mb-1.5">{{ specLabels[key] }}</div>
												<div class="text-[15px] text-gray-900 font-medium leading-relaxed pr-4">
													{{ getSpecValue(item, key) }}
												</div>
											</div>
										</div>
									</div>

									<div v-else class="col-span-4 p-8 border-r border-gray-200 last:border-r-0 bg-gray-50/50"/>
								</template>

							</div>

						</div>
					</div>
				</div>
			</div>

			<!-- Modal CHỌN THÊM SẢN PHẨM -->
			<div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
				<div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="isModalOpen = false" />
				<div class="relative w-full max-w-5xl bg-white rounded-none shadow-2xl flex flex-col h-[85vh] animate-in fade-in zoom-in-95 duration-200">
					
					<!-- Nút Tắt (X) màu Đỏ -->
					<div class="absolute top-0 right-0 z-10">
						<button class="w-12 h-12 bg-[#CC0000] text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer" @click="isModalOpen = false">
							<Icon name="fa6-solid:xmark" class="text-xl" />
						</button>
					</div>

					<!-- Header & Tabs -->
					<div class="pt-6 px-8 border-b border-gray-200 bg-white sticky top-0 z-0">
						<div class="flex gap-8 overflow-x-auto scrollbar-hide pr-12">
							<button class="pb-3 border-b-2 border-[#CC0000] text-black font-black text-[13px] tracking-widest whitespace-nowrap">Tất cả</button>
							<button class="pb-3 border-b-2 border-transparent text-gray-600 font-medium hover:text-black text-[13px] tracking-widest whitespace-nowrap">Xe tay ga</button>
							<button class="pb-3 border-b-2 border-transparent text-gray-600 font-medium hover:text-black text-[13px] tracking-widest whitespace-nowrap">Xe số</button>
							<button class="pb-3 border-b-2 border-transparent text-gray-600 font-medium hover:text-black text-[13px] tracking-widest whitespace-nowrap">Xe côn tay</button>
							<button class="pb-3 border-b-2 border-transparent text-gray-600 font-medium hover:text-black text-[13px] tracking-widest whitespace-nowrap">Xe phân khối lớn</button>
						</div>
					</div>

					<!-- Thanh Tìm kiếm -->
					<div class="p-6 pb-2 bg-white sticky top-[57px] z-0">
						<div class="relative border border-gray-300 flex items-center group focus-within:border-gray-900">
							<input v-model="searchQuery" type="text" placeholder="Nhập tên loại xe" class="w-full h-12 pl-4 pr-12 outline-none text-sm font-medium bg-transparent" >
							<Icon name="fa6-solid:magnifying-glass" class="absolute right-4 text-gray-500 text-lg" />
						</div>
					</div>

					<!-- Danh sách xe -->
					<div class="flex-1 overflow-y-auto p-6 scrollbar-hide bg-white">
						<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
							<div
								v-for="product in filteredProducts"
								:key="product.id"
								class="group cursor-pointer flex flex-col justify-between"
								@click="toggleSelect(product)"
							>
								<div>
									<h3 class="text-[13px] font-black text-black leading-tight line-clamp-1 mb-2">{{ product.name }}</h3>
									<div class="aspect-[4/3] flex items-center justify-center p-2 transition-transform duration-300 group-hover:scale-105">
										<img :src="getBasicProductImage(product)" :alt="product.name" class="max-w-full max-h-full object-contain mix-blend-multiply" @error="$event.target.src = '/assets/image/placeholder-product.webp'" >
									</div>
								</div>
								
								<div>
									<span class="inline-block px-2 py-0.5 bg-red-600 text-white text-[9px] font-black uppercase mb-3">MỚI</span>
									<div class="flex items-center justify-between mt-1">
										<p class="text-[11px] font-medium text-black">Giá từ: <span class="font-black">{{ formatPrice(product.price) }}</span></p>
										<div
class="w-5 h-5 rounded-full flex items-center justify-center border transition-all"
											 :class="compareProducts.some(p => p.id === product.id) ? 'bg-[#CC0000] border-[#CC0000] text-white' : 'border-transparent bg-gray-100 text-transparent'">
											<Icon name="fa6-solid:check" class="text-[9px]" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Footer Modal -->
					<div class="p-6 border-t border-gray-200 flex justify-center bg-white">
						<button class="px-10 py-3 bg-white border border-[#CC0000] text-[#CC0000] hover:bg-[#CC0000] hover:text-white font-black uppercase tracking-widest text-[11px] transition-colors flex items-center gap-2" @click="isModalOpen = false">
							XÁC NHẬN <Icon name="fa6-solid:arrow-right" />
						</button>
					</div>

				</div>
			</div>

		</div>
	</div>
</template>

<style scoped>
.sticky {
	transition: all 0.3s ease;
}
</style>
