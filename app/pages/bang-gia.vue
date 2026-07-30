<script setup>
import { ref, onMounted } from 'vue';

const productStore = useProductStore();
const products = ref([]);
const isLoading = ref(true);

const fetchPriceList = async () => {
    try {
        const res = await productStore.getProducts({ categoryIds: "8", pageSize: 100 });
        products.value = res.items || [];
    } catch {
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchPriceList();
});

const formatPrice = (price) => {
    if (!price) return "0 VNĐ";
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price).replace('₫', 'VNĐ');
};

useSeoMeta({
    title: 'Bảng giá xe máy | AnhEm Motor',
    description: 'Bảng giá cập nhật mới nhất cho tất cả các dòng xe máy tại AnhEm Motor.',
});
</script>

<template>
    <div class="bg-gray-50 min-h-screen pb-12">
        <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <h1 class="text-3xl sm:text-5xl font-black text-gray-900 mb-8 uppercase tracking-tighter text-center">BẢNG GIÁ XE MÁY</h1>
            
            <div v-if="isLoading" class="flex justify-center py-12">
                <Icon name="fa6-solid:spinner" class="animate-spin text-4xl text-primary" />
            </div>

            <div v-else class="overflow-x-auto shadow-sm rounded-xl border border-gray-200">
                <table class="w-full text-sm text-left text-gray-700 min-w-[800px] bg-white">
                    <thead class="text-sm bg-[#a3a3a3] text-white font-black text-center">
                        <tr>
                            <th scope="col" class="px-6 py-4 border-r border-white/20 w-[25%]">Hình ảnh</th>
                            <th scope="col" class="px-6 py-4 border-r border-white/20 w-[25%]">Dòng xe</th>
                            <th scope="col" class="px-6 py-4 border-r border-white/20 w-[25%]">Màu xe</th>
                            <th scope="col" class="px-6 py-4 w-[25%]">Giá bán lẻ đề xuất</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(product) in products" :key="product.id">
                            <tr
v-for="(variant, vIndex) in product.variants" :key="variant.id" 
                                class="bg-white hover:bg-gray-50 transition-colors text-center"
                                :class="vIndex === product.variants.length - 1 ?'border-b-[8px] border-gray-100' : 'border-b border-gray-100'">
                                <td v-if="vIndex === 0" :rowspan="product.variants.length" class="px-6 py-6 border-r border-gray-200 align-middle">
                                    <div class="flex flex-col items-center gap-3">
                                        <img :src="product.image || '/assets/image/placeholder-product.webp'" :alt="product.name" class="w-32 h-auto object-contain mix-blend-multiply" >
                                        <span class="font-bold text-gray-900 text-base">{{ product.name }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 border-r border-gray-200 font-bold text-gray-800">
                                    {{ variant.option_values_text || 'Tiêu chuẩn' }}
                                </td>
                                <td class="px-6 py-4 border-r border-gray-200 text-gray-600">
                                    {{ variant.colors && variant.colors.length > 0 ? variant.colors.map(c => c.name).join(' / ') : 'Cơ bản' }}
                                </td>
                                <td class="px-6 py-4 font-black text-primary text-base">
                                    {{ formatPrice(variant.price) }}
                                </td>
                            </tr>
                        </template>
                        <tr v-if="products.length === 0">
                            <td colspan="4" class="px-6 py-8 text-center text-gray-500 font-medium">Chưa có dữ liệu bảng giá.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.text-primary { color: #e31837; }
</style>
