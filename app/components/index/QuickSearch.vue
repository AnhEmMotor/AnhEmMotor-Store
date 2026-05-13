<script setup>
import { reactive } from "vue";

const searchFilters = reactive({
	keyword: "",
});

const handleSearch = () => {
	if (searchFilters.keyword.trim()) {
		navigateTo({
			path: "/products",
			query: { search: searchFilters.keyword.trim() },
		});
	} else {
		navigateTo("/products");
	}
};
</script>

<template>
	<section class="max-w-4xl mx-auto px-4 -mt-20 relative z-20">
		<div
			class="bg-white rounded-3xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.18)] p-3 md:p-4 flex flex-col md:flex-row gap-3 items-center border border-gray-100"
		>
			<div class="relative flex-1 w-full">
				<Icon
					name="fa6-solid:motorcycle"
					class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
				/>
				<input
					v-model="searchFilters.keyword"
					type="text"
					placeholder="Nhập tên xe bạn muốn tìm... (VD: SH 160i, Winner X...)"
					class="w-full h-16 pl-14 pr-6 bg-gray-50/50 border border-gray-200 rounded-2xl focus:border-gray-300 focus:ring-0 outline-none transition-all font-semibold text-lg placeholder:text-gray-400 placeholder:font-normal"
					@keyup.enter="handleSearch"
				>
			</div>

			<button
				class="h-16 w-full md:w-56 bg-red-600 text-white rounded-2xl font-black uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl shadow-red-600/20 hover:shadow-none active:scale-95"
				@click="handleSearch"
			>
				<Icon name="fa6-solid:magnifying-glass" class="text-lg" />
				Tìm Kiếm Ngay
			</button>
		</div>
	</section>
</template>
