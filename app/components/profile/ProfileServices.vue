<script setup>
import { ref, computed } from "vue";


const services = ref([
	{
		id: 1,
		serviceName: "Bảo dưỡng định kỳ 1000km",
		date: "2024-05-10",
		time: "09:00",
		status: "Completed",
		location: "AnhEm Motor - Quận 1",
		technician: "Nguyễn Văn A",
		cost: 250000,
		icon: "ph:wrench-fill"
	},
	{
		id: 2,
		serviceName: "Thay lốp Michelin City Grip 2",
		date: "2024-05-25",
		time: "14:30",
		status: "Confirmed",
		location: "AnhEm Motor - Quận 7",
		technician: "Trần Văn B",
		cost: 1200000,
		icon: "ph:tire-fill"
	},
	{
		id: 3,
		serviceName: "Kiểm tra hệ thống điện",
		date: "2024-06-05",
		time: "10:00",
		status: "Pending",
		location: "AnhEm Motor - Quận 1",
		technician: "Chưa phân công",
		cost: 0,
		icon: "ph:lightning-fill"
	}
]);

const activeFilter = ref('All');

const filters = [
	{ id: 'All', label: 'Tất cả dịch vụ', icon: 'ph:layout-fill' },
	{ id: 'Pending', label: 'Đã đặt lịch', icon: 'ph:calendar-plus-fill' },
	{ id: 'Confirmed', label: 'Xác nhận', icon: 'ph:check-circle-fill' },
	{ id: 'Completed', label: 'Lịch sử dịch vụ', icon: 'ph:clock-counter-clockwise-fill' },
];

const filteredServices = computed(() => {
	if (activeFilter.value === 'All') return services.value;
	return services.value.filter(s => s.status === activeFilter.value);
});

const getStatusColor = (status) => {
	switch (status) {
		case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
		case 'Confirmed': return 'bg-blue-100 text-blue-700 border-blue-200';
		case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
		case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
		default: return 'bg-gray-100 text-gray-700 border-gray-200';
	}
};

const getStatusLabel = (status) => {
	switch (status) {
		case 'Completed': return 'Đã hoàn thành';
		case 'Confirmed': return 'Đã xác nhận';
		case 'Pending': return 'Đã đặt lịch';
		case 'Cancelled': return 'Đã hủy';
		default: return status;
	}
};

const formatPrice = (price) => {
	if (price === 0) return "Tạm tính";
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(price);
};
</script>

<template>
	<div class="space-y-5">
		
		<div class="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
			<div class="flex items-center justify-between mb-2">
				<h2 class="text-xl font-black text-gray-900 uppercase tracking-tight">Dịch vụ sử dụng</h2>
				<span class="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
					{{ filteredServices.length }} bản ghi
				</span>
			</div>
			<p class="text-xs text-gray-500 font-medium">Theo dõi lịch sử bảo dưỡng và sửa chữa xe của bạn.</p>
		</div>

		
		<div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
			<button 
				v-for="filter in filters" 
				:key="filter.id"
				:class="[
					'flex items-center gap-2 px-5 py-3 rounded-md text-[11px] font-black transition-all whitespace-nowrap border shrink-0',
					activeFilter === filter.id 
						? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
						: 'bg-white text-gray-500 border-gray-100 hover:border-primary/30 hover:bg-gray-50'
				]"
				@click="activeFilter = filter.id"
			>
				<Icon :name="filter.icon" class="text-sm" />
				{{ filter.label }}
			</button>
		</div>

		
		<div v-if="filteredServices.length > 0" class="grid grid-cols-1 gap-4">
			<div 
				v-for="service in filteredServices" 
				:key="service.id"
				class="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
			>
				<div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
					<div class="flex items-start gap-4">
						<div class="w-14 h-14 rounded-md bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
							<Icon :name="service.icon" class="text-2xl text-primary group-hover:text-white" />
						</div>
						<div class="space-y-1">
							<h3 class="font-black text-gray-900 group-hover:text-primary transition-colors">{{ service.serviceName }}</h3>
							<div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-500 font-bold">
								<div class="flex items-center gap-1.5">
									<Icon name="ph:calendar-blank-fill" class="text-primary/60" />
									{{ service.date }}
								</div>
								<div class="flex items-center gap-1.5">
									<Icon name="ph:clock-fill" class="text-primary/60" />
									{{ service.time }}
								</div>
								<div class="flex items-center gap-1.5">
									<Icon name="ph:map-pin-fill" class="text-primary/60" />
									{{ service.location }}
								</div>
							</div>
						</div>
					</div>

					<div class="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 pt-4 md:pt-0 border-gray-50">
						<div 
							class="px-3 py-1 rounded-full text-[10px] font-black border"
							:class="getStatusColor(service.status)"
						>
							{{ getStatusLabel(service.status) }}
						</div>
						<div class="text-lg font-black text-gray-900">
							{{ formatPrice(service.cost) }}
						</div>
					</div>
				</div>
				
				
				<div class="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
					<div class="flex items-center gap-2">
						<div class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
							<Icon name="ph:user-fill" class="text-xs text-gray-400" />
						</div>
						<span class="text-[10px] font-bold text-gray-500">Kỹ thuật viên: {{ service.technician }}</span>
					</div>
					<button class="text-[10px] font-black text-primary hover:underline flex items-center gap-1">
						Xem chi tiết
						<Icon name="ph:arrow-right-bold" />
					</button>
				</div>
			</div>
		</div>

		
		<div v-else class="bg-white rounded-lg p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
			<div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
				<Icon name="ph:wrench-duotone" class="text-4xl text-gray-200" />
			</div>
			<h3 class="text-lg font-black text-gray-900 uppercase tracking-tight mb-2">Không tìm thấy dịch vụ</h3>
			<p class="text-sm text-gray-400 font-medium max-w-xs mb-8">
				{{ activeFilter === 'All' ? 'Bạn chưa có bản ghi dịch vụ nào trong hệ thống.' : 'Bạn không có dịch vụ nào ở trạng thái này.' }}
			</p>
			<NuxtLink 
				v-if="activeFilter === 'All'"
				to="/service"
				class="px-8 py-3 bg-primary text-white text-[11px] font-black rounded-md hover:shadow-lg hover:shadow-primary/20 transition-all"
			>
				Đặt lịch dịch vụ ngay
			</NuxtLink>
			<button 
				v-else
				class="px-8 py-3 bg-gray-900 text-white text-[11px] font-black rounded-md hover:shadow-lg transition-all"
				@click="activeFilter = 'All'"
			>
				Xem tất cả dịch vụ
			</button>
		</div>
	</div>
</template>
