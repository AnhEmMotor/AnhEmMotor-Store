<script setup>
import { ref } from "vue";

const activeSubTab = ref("news");

const subTabs = [
	{ id: "news", label: "Tin tức", icon: "fa6-solid:newspaper" },
	{ id: "promotions", label: "Khuyến mãi", icon: "fa6-solid:tag" },
	{ id: "vouchers", label: "Kho Voucher", icon: "fa6-solid:ticket" },
	{ id: "feedback", label: "Phản hồi", icon: "fa6-solid:comment-dots" },
];

// Mock data for demonstration
const notifications = ref({
	news: [
		{
			id: 1,
			title: "Khai trương chi nhánh mới tại Quận 7",
			date: "2024-05-10",
			content: "AnhEm Motor hân hạnh thông báo khai trương chi nhánh mới với nhiều ưu đãi hấp dẫn...",
			isRead: false,
		},
		{
			id: 2,
			title: "Cập nhật chính sách bảo hành 2024",
			date: "2024-05-01",
			content: "Chúng tôi đã cập nhật điều khoản bảo hành mới giúp khách hàng an tâm hơn khi sử dụng dịch vụ...",
			isRead: true,
		},
	],
	promotions: [
		{
			id: 3,
			title: "Giảm 50% phí thay nhớt cuối tuần",
			date: "2024-05-12",
			content: "Chương trình áp dụng cho tất cả các dòng xe tay ga và xe số tại toàn hệ thống...",
			isRead: false,
		},
	],
	vouchers: [
		{
			id: 4,
			title: "Voucher giảm 500k mua xe mới",
			expiry: "2024-06-30",
			code: "ANHEM500",
			status: "Còn hạn",
		},
		{
			id: 5,
			title: "Miễn phí rửa xe 1 năm",
			expiry: "2024-12-31",
			code: "FREEWASH",
			status: "Còn hạn",
		},
	],
	feedback: [
		{
			id: 6,
			store: "AnhEm Motor - Thủ Đức",
			title: "Phản hồi về lịch bảo dưỡng",
			date: "2024-05-13",
			content: "Cảm ơn bạn đã đặt lịch, chuyên viên của chúng tôi sẽ đợi bạn vào lúc 14h ngày mai...",
			isRead: false,
		},
	],
});

function markAsRead(type, id) {
	const item = notifications.value[type].find((n) => n.id === id);
	if (item) item.isRead = true;
}
</script>

<template>
	<div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
		<!-- Header & Sub-tabs -->
		<div class="p-6 border-b border-gray-100">
			<h3 class="text-xl font-bold text-gray-900 mb-6">Thông báo của tôi</h3>
			
			<div class="flex flex-wrap gap-2">
				<button
					v-for="tab in subTabs"
					:key="tab.id"
					class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
					:class="activeSubTab === tab.id 
						? 'bg-primary text-white shadow-lg shadow-primary/20' 
						: 'bg-gray-50 text-gray-600 hover:bg-gray-100'"
					@click="activeSubTab = tab.id"
				>
					<Icon :name="tab.icon" />
					{{ tab.label }}
					<span v-if="notifications[tab.id]?.filter(n => !n.isRead).length > 0" 
						class="w-2 h-2 rounded-full bg-white animate-pulse" />
				</button>
			</div>
		</div>

		<!-- Content -->
		<div class="p-6 min-h-[400px]">
			<Transition name="fade" mode="out-in">
				<div :key="activeSubTab" class="space-y-4">
					<!-- News & Promotions & Feedback -->
					<div v-if="activeSubTab !== 'vouchers'" class="space-y-4">
						<div v-if="notifications[activeSubTab].length === 0" class="flex flex-col items-center justify-center py-20 text-gray-400">
							<Icon name="ph:bell-slash-bold" class="text-6xl mb-4 opacity-20" />
							<p>Không có thông báo nào trong mục này</p>
						</div>

						<div
							v-for="item in notifications[activeSubTab]"
							:key="item.id"
							class="group p-4 rounded-2xl border transition-all hover:shadow-md"
							:class="item.isRead ? 'bg-white border-gray-100' : 'bg-primary/5 border-primary/20'"
							@click="markAsRead(activeSubTab, item.id)"
						>
							<div class="flex justify-between items-start mb-2">
								<div class="flex items-center gap-3">
									<div v-if="!item.isRead" class="w-2 h-2 rounded-full bg-primary" />
									<h4 class="font-bold text-gray-900 group-hover:text-primary transition-colors">
										{{ item.title }}
									</h4>
								</div>
								<span class="text-xs text-gray-400 font-medium">
									{{ item.date || item.expiry }}
								</span>
							</div>
							<p class="text-sm text-gray-600 line-clamp-2">
								{{ item.content }}
							</p>
							<div v-if="item.store" class="mt-3 flex items-center gap-2 text-xs font-semibold text-primary">
								<Icon name="ph:storefront-bold" />
								{{ item.store }}
							</div>
						</div>
					</div>

					<!-- Vouchers -->
					<div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div
							v-for="voucher in notifications.vouchers"
							:key="voucher.id"
							class="relative flex bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-lg transition-all"
						>
							<!-- Left Side (Icon/Accent) -->
							<div class="w-24 bg-primary/10 flex flex-col items-center justify-center p-4 gap-2 border-r border-dashed border-gray-200">
								<Icon name="ph:ticket-bold" class="text-3xl text-primary" />
								<span class="text-[10px] font-bold text-primary uppercase">AnhEm</span>
							</div>
							
							<!-- Right Side (Info) -->
							<div class="flex-1 p-4">
								<h4 class="font-bold text-gray-900 text-sm mb-1">{{ voucher.title }}</h4>
								<p class="text-xs text-gray-500 mb-3">Hết hạn: {{ voucher.expiry }}</p>
								
								<div class="flex items-center justify-between">
									<div class="px-2 py-1 bg-gray-100 rounded-lg font-mono text-xs font-bold text-gray-700">
										{{ voucher.code }}
									</div>
									<button class="text-xs font-bold text-primary hover:underline">
										Sử dụng ngay
									</button>
								</div>
							</div>

							<!-- Decorative circles for dashed effect -->
							<div class="absolute top-1/2 -translate-y-1/2 left-24 -translate-x-1/2 w-4 h-4 bg-white border border-gray-100 rounded-full" />
						</div>
					</div>
				</div>
			</Transition>
		</div>
	</div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
	opacity: 0;
	transform: translateY(10px);
}

.fade-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}

.animate-fadeIn {
	animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
