<script setup>
import BaseSectionHeader from '../ui/BaseSectionHeader.vue';
import CategoryCard from '../ui/CategoryCard.vue';
import { categoryMapper } from '../../mappers/category.mapper';

const categoryStore = useCategoryStore();
const { data: categories, isLoading } = useAsyncData('home-categories', async () => {
  const response = await categoryStore.getProductCategories({ pageSize: 50 });
  const all = categoryMapper.toUIList(response.items);
  const allowed = ['xe máy', 'phụ tùng', 'phụ kiện'];
  return all.filter((c) => allowed.includes(c.name.toLowerCase()));
});
</script>

<template>
  <section class="py-10 md:py-16 bg-white relative">
    <div class="container mx-auto px-4">
      <BaseSectionHeader title="Danh Mục" highlight-text="Sản Phẩm" center show-separator />

      <div
        v-if="!isLoading"
        class="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-10 max-w-6xl mx-auto"
      >
        <CategoryCard v-for="cat in categories" :key="cat.id" :category="cat" />
      </div>
      <div v-else class="flex justify-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    </div>
  </section>
</template>
