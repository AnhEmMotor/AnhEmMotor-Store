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
	<section class="max-w-4xl mx-auto px-4 -mt-10 relative z-20">
		<div
			class="bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] p-3 flex flex-col md:flex-row gap-3 items-center border border-gray-100/50"
		>
			<div class="relative flex-1 w-full">
				<Icon
					name="fa6-solid:magnifying-glass"
					class="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-lg"
				/>
				<input
					v-model="searchFilters.keyword"
					type="text"
					placeholder="Bạn đang tìm mẫu xe nào?"
					class="w-full h-14 pl-14 pr-6 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#E60012]/30 focus:ring-0 outline-none transition-all font-semibold text-gray-800 placeholder:text-gray-400 placeholder:font-normal"
					@keyup.enter="handleSearch"
				>
			</div>

			<button
				class="h-14 w-full md:w-52 bg-[#E60012] text-white rounded-xl font-bold uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-red-500/10"
				@click="handleSearch"
			>
				Tìm Kiếm
			</button>
		</div>
	</section>
</template>
