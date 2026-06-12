<script setup>
const categoryStore = useCategoryStore();

const { data: categories, isLoading } = useAsyncData('all-categories', async () => {
    const response = await categoryStore.getProductCategories({ pageSize: 100 });
    return categoryMapper.toUIList(response.items);
});

useSeoMeta({
    title: 'Danh mục sản phẩm | AnhEm Motor',
    description: 'Khám phá các danh mục xe máy, phụ tùng và phụ kiện chính hãng tại AnhEm Motor.',
});
</script>

<template>
    <div class="bg-white min-h-screen py-20">
        <div class="max-w-[1440px] mx-auto px-10">
            <div class="mb-16">
                <h1 class="text-5xl font-black text-gray-900 mb-4 italic uppercase tracking-tighter">
                    Danh Mục <span class="text-primary">Sản Phẩm</span>
                </h1>
                <p class="text-gray-400 font-medium text-lg max-w-2xl">
                    AnhEm Motor cung cấp đầy đủ các dòng xe máy, phụ tùng chính hãng và phụ kiện bảo hộ cao cấp nhất.
                </p>
            </div>

            <div v-if="!isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <CategoryCard
                    v-for="cat in categories"
                    :key="cat.id"
                    :category="cat"
                />
            </div>
            <div v-else class="flex justify-center items-center h-64">
                <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"/>
            </div>

            <div v-if="!isLoading && (!categories || categories.length === 0)" class="text-center py-20 bg-gray-50 rounded-[3rem]">
                <Icon name="ph:folder-open-light" class="text-7xl text-gray-200 mb-6" />
                <h3 class="text-xl font-bold text-gray-900">Không tìm thấy danh mục nào</h3>
                <p class="text-gray-400 mt-2">Dữ liệu đang được cập nhật, vui lòng quay lại sau.</p>
                <NuxtLink to="/" class="inline-block mt-8 px-8 py-3 bg-primary text-white font-black uppercase tracking-widest rounded-xl shadow-lg">
                    Quay về trang chủ
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
@reference "../assets/main.css";
</style>
