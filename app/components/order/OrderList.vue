<script setup>
import OrderCard from "./OrderCard.vue";
import BasePagination from "@/components/ui/BasePagination.vue";

defineProps({
	orders: {
		type: Array,
		required: true,
	},
	pagination: {
		type: Object,
		required: true,
	},
	// Helpers passed from Smart Component to keep these components 'dumb'
	getStatusName: {
		type: Function,
		required: true,
	},
	isCancellable: {
		type: Function,
		required: true,
	},
	canEdit: {
		type: Function,
		required: true,
	},
});

const emit = defineEmits(["edit", "cancel"]);
</script>

<template>
	<div class="space-y-6">
		<OrderCard
			v-for="order in orders"
			:key="order.id"
			:order="order"
			:status-name="getStatusName(order.status)"
			:is-cancellable="isCancellable(order.status)"
			:can-edit="canEdit(order.status)"
			@edit="emit('edit', $event)"
			@cancel="emit('cancel', $event)"
		/>

		<div v-if="pagination.totalPages > 1" class="flex justify-center pt-8">
			<BasePagination
				:current-page="pagination.currentPage"
				:total-pages="pagination.totalPages"
				@update:current-page="pagination.goToPage"
			/>
		</div>
	</div>
</template>
