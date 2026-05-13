<script setup>
import { storeToRefs } from "pinia";




const compareStore = useCompareStore();
const productStore = useProductStore();
const { products: compareProducts } = storeToRefs(compareStore);

const detailedProducts = ref([]);
const isLoading = ref(true);

const fetchComparisonData = async () => {
	isLoading.value = true;
	try {
		const promises = compareProducts.value.map(p => productStore.fetchFullProductDetail(p.slug));
		const results = await Promise.all(promises);
		detailedProducts.value = results.filter(Boolean);
	} catch (error) {
		console.error("Failed to fetch comparison data", error);
	} finally {
		isLoading.value = false;
	}
};

onMounted(fetchComparisonData);
watch(compareProducts, fetchComparisonData, { deep: true });

// Common specification keys for motorcycle comparison
const specGroups = [
	{
		name: 'Động cơ & Truyền động',
		keys: [
			'engine_type', 'displacement', 'bore_stroke', 'compression_ratio', 
			'max_power', 'max_torque', 'fuel_system', 'transmission_type', 'starter_system'
		]
	},
	{
		name: 'Kích thước & Trọng lượng',
		keys: [
			'dimensions', 'weight', 'wheelbase', 'seat_height', 'ground_clearance', 'fuel_capacity'
		]
	},
	{
		name: 'Hệ thống phanh & Giảm xóc',
		keys: [
			'front_suspension', 'rear_suspension', 'front_tire_size', 'rear_tire_size', 'front_brake', 'rear_brake'
		]
	},
	{
		name: 'Tiện ích & Khác',
		keys: [
			'fuel_consumption', 'oil_capacity', 'battery_type', 'lighting_system', 'dashboard_type'
		]
	}
];

const specLabels = {
	engine_type: 'Loại động cơ',
	displacement: 'Dung tích xy-lanh',
	bore_stroke: 'Đường kính x Hành trình piston',
	compression_ratio: 'Tỷ số nén',
	max_power: 'Công suất tối đa',
	max_torque: 'Moment xoắn cực đại',
	fuel_system: 'Hệ thống cung cấp nhiên liệu',
	transmission_type: 'Loại truyền động',
	starter_system: 'Hệ thống khởi động',
	dimensions: 'Kích thước (D x R x C)',
	weight: 'Trọng lượng bản thân',
	wheelbase: 'Khoảng cách trục bánh xe',
	seat_height: 'Độ cao yên',
	ground_clearance: 'Khoảng sáng gầm xe',
	fuel_capacity: 'Dung tích bình xăng',
	front_suspension: 'Phuộc trước',
	rear_suspension: 'Phuộc sau',
	front_tire_size: 'Kích cỡ lốp trước',
	rear_tire_size: 'Kích cỡ lốp sau',
	front_brake: 'Phanh trước',
	rear_brake: 'Phanh sau',
	fuel_consumption: 'Mức tiêu thụ nhiên liệu',
	oil_capacity: 'Dung tích nhớt máy',
	battery_type: 'Loại ắc quy',
	lighting_system: 'Hệ thống chiếu sáng',
	dashboard_type: 'Đồng hồ hiển thị'
};

const getSpecValue = (productDetail, key) => {
	const spec = productDetail.specifications.find(s => s.key === key);
	return spec ? spec.value : '—';
};

const removeProduct = (productId) => {
	compareStore.removeProduct(productId);
};

const formatPrice = (price) => productMapper.formatPrice(price);
</script>

<template>
	<div class="min-h-screen bg-gray-50 pt-32 pb-24">
		<div class="max-w-[1400px] mx-auto px-6">
			<!-- Header -->
			<div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
				<div>
					<div class="flex items-center gap-3 text-[#CC0000] font-black uppercase tracking-[0.3em] text-[10px] mb-3">
						<Icon name="fa6-solid:code-compare" />
						So sánh sản phẩm
					</div>
					<h1 class="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none italic">
						So sánh <span class="text-[#CC0000]">Thông số xe</span>
					</h1>
				</div>
				
				<div class="flex items-center gap-4">
					<span class="text-sm font-bold text-gray-400">{{ compareProducts.length }}/3 mẫu xe</span>
					<button 
						v-if="compareProducts.length > 0"
						@click="compareStore.clearAll"
						class="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#CC0000] transition-colors"
					>
						Xóa tất cả
					</button>
					<NuxtLink 
						to="/products"
						class="px-8 py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#CC0000] transition-all shadow-xl shadow-black/10 active:scale-95"
					>
						+ Thêm xe khác
					</NuxtLink>
				</div>
			</div>

			<!-- Comparison Table -->
			<div v-if="compareProducts.length === 0" class="bg-white rounded-[40px] p-24 text-center border border-gray-100 shadow-xl">
				<div class="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
					<Icon name="fa6-solid:motorcycle" class="text-5xl text-gray-200" />
				</div>
				<h2 class="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4">Chưa có xe để so sánh</h2>
				<p class="text-gray-500 max-w-md mx-auto mb-10 font-medium">Hãy chọn tối đa 3 mẫu xe bạn đang quan tâm để xem bảng so sánh thông số kỹ thuật chi tiết nhất.</p>
				<NuxtLink to="/products" class="inline-flex items-center gap-3 px-10 py-5 bg-[#CC0000] text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-red-200 hover:bg-black transition-all active:scale-95">
					Khám phá ngay <Icon name="fa6-solid:arrow-right" />
				</NuxtLink>
			</div>

			<div v-else class="relative">
				<!-- Sticky Header for Products -->
				<div class="sticky top-20 z-40 bg-gray-50/80 backdrop-blur-md pb-6">
					<div class="grid grid-cols-12 gap-6 items-stretch">
						<div class="col-span-3"></div>
						<div 
							v-for="item in detailedProducts" 
							:key="item.product.id"
							class="col-span-3 bg-white rounded-3xl p-6 border border-gray-100 shadow-xl relative group"
						>
							<button 
								@click="removeProduct(item.product.id)"
								class="absolute -top-2 -right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#CC0000] transition-colors z-10 opacity-0 group-hover:opacity-100"
							>
								<Icon name="fa6-solid:xmark" />
							</button>
							<div class="aspect-square mb-4 rounded-2xl overflow-hidden bg-gray-50 p-2">
								<img :src="item.currentVariant.colors[0]?.image" :alt="item.product.name" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700">
							</div>
							<div class="space-y-1">
								<p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">{{ item.product.brand }}</p>
								<h3 class="text-lg font-black text-gray-900 uppercase leading-tight italic line-clamp-1">{{ item.product.name }}</h3>
								<p class="text-lg font-black text-[#CC0000]">{{ formatPrice(item.currentVariant.price) }}</p>
							</div>
							<NuxtLink :to="`/product/${item.currentVariant.slug}`" class="mt-4 block w-full py-3 bg-gray-50 text-center rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-black hover:text-white transition-all">
								Chi tiết xe
							</NuxtLink>
						</div>
						<!-- Empty Slots if < 3 -->
						<div 
							v-for="i in (3 - detailedProducts.length)" 
							:key="'empty-' + i"
							class="col-span-3 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 hover:border-[#CC0000] hover:bg-red-50/50 transition-all cursor-pointer group"
							@click="navigateTo('/products')"
						>
							<div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#CC0000] group-hover:text-white transition-all">
								<Icon name="fa6-solid:plus" />
							</div>
							<span class="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#CC0000]">Thêm xe</span>
						</div>
					</div>
				</div>

				<!-- Spec Sections -->
				<div class="space-y-12">
					<div v-for="group in specGroups" :key="group.name" class="animate-in fade-in slide-in-from-bottom-8 duration-700">
						<div class="bg-black text-white p-6 rounded-t-[32px] flex items-center gap-4">
							<div class="w-1.5 h-6 bg-[#CC0000]"></div>
							<h4 class="text-sm font-black uppercase tracking-[0.4em]">{{ group.name }}</h4>
						</div>
						<div class="bg-white rounded-b-[32px] border-x border-b border-gray-100 shadow-xl overflow-hidden">
							<div 
								v-for="(key, idx) in group.keys" 
								:key="key"
								class="grid grid-cols-12 items-center border-t border-gray-50 first:border-t-0"
								:class="idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'"
							>
								<div class="col-span-3 p-6 border-r border-gray-100">
									<span class="text-[11px] font-black text-gray-400 uppercase tracking-widest">{{ specLabels[key] }}</span>
								</div>
								<div 
									v-for="item in detailedProducts" 
									:key="item.product.id"
									class="col-span-3 p-6 text-center"
								>
									<span class="text-sm font-bold text-gray-900">{{ getSpecValue(item, key) }}</span>
								</div>
								<!-- Empty slots alignment -->
								<div v-for="i in (3 - detailedProducts.length)" :key="'empty-val-' + i" class="col-span-3 p-6 text-center text-gray-300">
									—
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
.sticky {
	transition: all 0.3s ease;
}
</style>
