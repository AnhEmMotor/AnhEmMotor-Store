<script setup>
import { computed } from "vue";

const props = defineProps({
	totalPages: {
		type: Number,
		required: true,
	},
	currentPage: {
		type: Number,
		required: true,
	},
	loading: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(["update:currentPage"]);

const goToPage = (page) => {
	if (
		page !== props.currentPage &&
		page >= 1 &&
		page <= props.totalPages &&
		!props.loading
	) {
		emit("update:currentPage", page);
	}
};

const prevPage = () => {
	if (props.currentPage > 1 && !props.loading) {
		emit("update:currentPage", props.currentPage - 1);
	}
};

const nextPage = () => {
	if (props.currentPage < props.totalPages && !props.loading) {
		emit("update:currentPage", props.currentPage + 1);
	}
};

const isPrevDisabled = computed(() => {
	return props.loading || props.currentPage <= 1;
});

const isNextDisabled = computed(() => {
	return props.loading || props.currentPage >= props.totalPages;
});

const pageNumbers = computed(() => {
	const total = props.totalPages;
	const current = props.currentPage;
	if (!total || total <= 0) return [];
	if (total <= 7) {
		return Array.from({ length: total }, (_, i) => i + 1);
	}
	if (current <= 3) {
		return [1, 2, 3, "...", total];
	}
	if (current >= total - 2) {
		return [1, "...", total - 2, total - 1, total];
	}
	return [1, "...", current - 1, current, current + 1, "...", total];
});
</script>

<template>
	<div
		v-if="totalPages > 1"
		class="mt-12 mb-8 flex justify-center items-center h-12"
	>
		<div class="flex items-center space-x-2">
			<!-- Prev Button -->
			<button
				:disabled="isPrevDisabled"
				class="inline-flex items-center justify-center w-10 h-10 sm:w-auto sm:px-4 rounded-xl font-bold transition-all duration-300 border text-sm"
				:class="
					isPrevDisabled
						? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
						: 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary hover:shadow-lg active:scale-95'
				"
				@click="prevPage"
			>
				<i class="fas fa-chevron-left sm:mr-2 text-[10px]" />
				<span class="hidden sm:inline">Trước</span>
			</button>

			<!-- Page Numbers -->
			<div class="flex items-center space-x-1.5 sm:space-x-2">
				<template v-for="(page, index) in pageNumbers" :key="index">
					<span
						v-if="page === '...'"
						class="w-10 h-10 flex items-center justify-center text-gray-400 font-bold"
					>
						<i class="fas fa-ellipsis-h text-[10px]" />
					</span>
					<button
						v-else
						class="w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all duration-300 border text-sm"
						:class="
							page === currentPage
								? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-110'
								: 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary hover:shadow-md'
						"
						@click="goToPage(page)"
					>
						{{ page }}
					</button>
				</template>
			</div>

			<!-- Next Button -->
			<button
				:disabled="isNextDisabled"
				class="inline-flex items-center justify-center w-10 h-10 sm:w-auto sm:px-4 rounded-xl font-bold transition-all duration-300 border text-sm"
				:class="
					isNextDisabled
						? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
						: 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary hover:shadow-lg active:scale-95'
				"
				@click="nextPage"
			>
				<span class="hidden sm:inline">Sau</span>
				<i class="fas fa-chevron-right sm:ml-2 text-[10px]" />
			</button>
		</div>
	</div>
	<span v-else />
</template>

<style scoped>
.text-primary {
	color: #e31837;
}
.bg-primary {
	background-color: #e31837;
}
.border-primary {
	border-color: #e31837;
}
.shadow-primary\/20 {
	--tw-shadow-color: rgba(227, 24, 55, 0.2);
	--tw-shadow: var(--tw-shadow-colored);
}
</style>
