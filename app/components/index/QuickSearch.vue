<script setup>
import { ref, reactive } from 'vue';

const searchFilters = reactive({
  keyword: '',
});
const isLoading = ref(false);

const handleSearch = async () => {
  const keyword = searchFilters.keyword.trim();
  if (!keyword) return;

  isLoading.value = true;
  try {
    const axios = useAxios();
    const res = await axios.post('/api/Ai/search', { keyword });

    if (res.data?.isSuccess) {
      navigateTo({
        path: res.data.redirectUrl,
        query: res.data.queryParams,
      });
      return;
    }
  } catch (error) {
    logError('QuickSearch.aiSearch', { error: error.message });
  } finally {
    isLoading.value = false;
  }

  navigateTo({
    path: '/products',
    query: { search: keyword },
  });
};
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
    <div
      class="bg-white rounded-24 shadow-elevated p-5 sm:p-6 flex flex-col gap-4 border border-slate-100"
    >
      <div class="relative group w-full">
        <Icon
          name="ph:magnifying-glass-bold"
          class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-primary transition-colors"
        />
        <input
          v-model="searchFilters.keyword"
          type="text"
          :disabled="isLoading"
          placeholder="Nhập yêu cầu tìm kiếm bằng AI... (VD: Xe tay ga nữ dưới 40 triệu)"
          class="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-16 focus:border-primary/30 focus:bg-white outline-none transition-all font-semibold text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          @keyup.enter="handleSearch"
        />
      </div>

      <button
        class="h-14 w-full bg-slate-900 text-white rounded-16 font-bold hover:bg-primary transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-black/5 disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-slate-900"
        :disabled="isLoading"
        @click="handleSearch"
      >
        <template v-if="isLoading">
          <Icon name="ph:spinner-gap-bold" class="animate-spin text-xl" />
          Đang phân tích yêu cầu...
        </template>
        <template v-else>
          Tìm kiếm AI ngay
          <Icon name="ph:sparkle-bold" />
        </template>
      </button>
    </div>
  </section>
</template>
