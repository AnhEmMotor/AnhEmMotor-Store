<script setup>
import OrderCard from "./OrderCard.vue";

defineProps({
	orders: {
		type: Array,
		required: true
	},
	pagination: {
		type: Object,
		required: true
	},
	getStatusName: {
		type: Function,
		required: true
	},
	isCancellable: {
		type: Function,
		required: true
	},
	canEdit: {
		type: Function,
		required: true
	}
});

defineEmits(['edit', 'cancel']);
</script>

<template>
	<div class="space-y-6">
		<div class="grid grid-cols-1 gap-6">
			<OrderCard
				v-for="order in orders"
				:key="order.id"
				:order="order"
				:status-name="getStatusName(order.status)"
				:is-cancellable="isCancellable(order.status)"
				:can-edit="canEdit(order.status)"
				@edit="$emit('edit', order)"
				@cancel="$emit('cancel', order.id)"
			/>
		</div>

		<!-- Pagination -->
		<div v-if="pagination.totalPages > 1" class="flex justify-center pt-8">
			<UiBasePagination
				:current-page="pagination.currentPage"
				:total-pages="pagination.totalPages"
				@update:current-page="pagination.goToPage"
			/>
		</div>
	</div>
</template>
