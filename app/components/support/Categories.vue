<template>
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		<div class="text-center mb-12 space-y-3">
			<h2 class="text-xs font-extrabold text-red-600 uppercase tracking-[0.3em]">Hỗ trợ nhanh</h2>
			<p class="text-4xl font-extrabold text-gray-900 uppercase tracking-tight">Bạn cần hỗ trợ về vấn đề gì?</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			<div
v-for="(cat, idx) in categories" :key="idx" 
				class="group p-8 bg-white border transition-all duration-500 cursor-pointer text-center space-y-6 hover:-translate-y-2"
				:class="[
					activeIdx === idx ? 'border-red-600 ring-4 ring-red-600/5 shadow-xl shadow-red-600/5 rounded-2xl' : 'border-gray-100 rounded-2xl hover:border-red-600/30'
				]"
				@click="activeIdx = activeIdx === idx ? -1 : idx"
			>
				<div
class="w-16 h-16 mx-auto bg-gray-50 rounded-xl flex items-center justify-center transition-all duration-500"
					:class="activeIdx === idx ? 'bg-red-600' : 'group-hover:bg-red-600'"
				>
					<Icon
:name="cat.icon" class="text-2xl transition-all duration-500" 
						:class="activeIdx === idx ? 'text-white' : 'text-gray-700 group-hover:text-white'"
					/>
				</div>
				<div class="space-y-3">
					<h3
class="text-[15px] font-extrabold text-gray-900 uppercase tracking-tight transition-colors"
						:class="{ 'text-red-600': activeIdx === idx }"
					>{{ cat.title }}</h3>
					<p class="text-[13px] text-gray-500 font-medium leading-relaxed px-2 line-clamp-2">{{ cat.desc }}</p>
				</div>
				
				<!-- Mini CTA -->
				<div class="pt-2">
					<div class="inline-flex items-center gap-2 transition-all duration-500">
						<span
class="text-[10px] font-extrabold text-gray-900 uppercase tracking-widest transition-colors"
							:class="{ 'text-red-600': activeIdx === idx }"
						>{{ cat.cta }}</span>
						<Icon
name="fa6-solid:arrow-right" class="text-[9px] text-red-600 transition-all" 
							:class="{ 'translate-x-1': activeIdx === idx }"
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- Dynamic Detail Panel -->
		<transition name="panel">
			<div v-if="activeIdx !== -1" class="mt-12 bg-gray-50 rounded-3xl p-10 border border-gray-100 relative overflow-hidden">
				<div class="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full -translate-y-1/2 translate-x-1/2"/>
				
				<div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
					<div class="lg:col-span-7 space-y-6">
						<div class="flex items-center gap-4">
							<div class="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
								<Icon :name="categories[activeIdx].icon" class="text-xl" />
							</div>
							<h3 class="text-2xl font-extrabold text-gray-900 uppercase tracking-tight">{{ categories[activeIdx].title }}</h3>
						</div>
						<p class="text-gray-500 font-medium leading-relaxed">
							{{ categories[activeIdx].detail }}
						</p>
						<div class="flex flex-wrap gap-4 pt-4">
							<div v-for="feature in categories[activeIdx].features" :key="feature" class="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-100 shadow-sm">
								<Icon name="fa6-solid:circle-check" class="text-green-500 text-xs" />
								<span class="text-[11px] font-extrabold text-gray-700 uppercase tracking-wider">{{ feature }}</span>
							</div>
						</div>
					</div>
					<div class="lg:col-span-5">
						<div class="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 space-y-6">
							<div class="space-y-2">
								<p class="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Hành động tiếp theo</p>
								<p class="text-lg font-extrabold text-gray-900 uppercase leading-tight">{{ categories[activeIdx].ctaDesc }}</p>
							</div>
							<button class="w-full h-14 bg-gray-900 text-white rounded-xl text-[11px] font-extrabold uppercase tracking-widest hover:bg-red-600 transition-colors flex items-center justify-center gap-3">
								{{ categories[activeIdx].ctaAction }}
								<Icon name="fa6-solid:arrow-right" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</section>
</template>

<script setup>
import { ref } from 'vue';

const activeIdx = ref(-1);

const categories = [
	{ 
		title: 'Mua xe & Trả góp', 
		desc: 'Tìm hiểu quy trình, thủ tục giấy tờ và các gói vay ưu đãi.', 
		icon: 'fa6-solid:motorcycle', 
		cta: 'Tìm hiểu ngay',
		detail: 'AnhEm Motor hỗ trợ trả góp qua nhiều ngân hàng và công ty tài chính với lãi suất cực thấp. Thủ tục chỉ cần CCCD gắn chip, xét duyệt hồ sơ trong vòng 15-30 phút.',
		features: ['Hỗ trợ trả trước 0đ', 'Lãi suất 0%', 'Thủ tục CCCD', 'Duyệt nhanh'],
		ctaDesc: 'Tính toán khoản vay & tư vấn ngay',
		ctaAction: 'Xem bảng giá trả góp'
	},
	{ 
		title: 'Bảo dưỡng định kỳ', 
		desc: 'Đặt lịch hẹn, xem bảng giá phụ tùng và dịch vụ kỹ thuật.', 
		icon: 'fa6-solid:wrench', 
		cta: 'Đặt lịch ngay',
		detail: 'Đội ngũ kỹ thuật viên tay nghề cao sẽ giúp xế yêu của bạn luôn trong tình trạng hoàn hảo nhất. Chúng tôi sử dụng 100% phụ tùng chính hãng.',
		features: ['Kỹ thuật viên 5 sao', 'Phụ tùng chính hãng', 'Vệ sinh xe miễn phí', 'Bảo hành dịch vụ'],
		ctaDesc: 'Tiết kiệm thời gian chờ đợi',
		ctaAction: 'Đặt lịch bảo dưỡng'
	},
	{ 
		title: 'Hỗ trợ kỹ thuật', 
		desc: 'Tư vấn các vấn đề kỹ thuật cơ bản cho xe của bạn nhanh chóng.', 
		icon: 'fa6-solid:gears', 
		cta: 'Nhận hỗ trợ',
		detail: 'Nếu bạn có bất kỳ thắc mắc nào về cách vận hành, các thông số kỹ thuật hoặc các hiện tượng lạ của xe, hãy liên hệ ngay với chúng tôi.',
		features: ['Tư vấn 24/7', 'Kỹ thuật chuyên sâu', 'Hướng dẫn sử dụng', 'Xử lý lỗi nhanh'],
		ctaDesc: 'Kết nối trực tiếp với kỹ thuật viên',
		ctaAction: 'Chat với kỹ thuật viên'
	},
	{ 
		title: 'Phản hồi & Khiếu nại', 
		desc: 'Tiếp nhận ý kiến về chất lượng sản phẩm và dịch vụ.', 
		icon: 'fa6-solid:message', 
		cta: 'Gửi phản hồi',
		detail: 'Sự hài lòng của quý khách là ưu tiên hàng đầu của chúng tôi. Mọi ý kiến đóng góp sẽ được ban quản trị xem xét và phản hồi trong 24h.',
		features: ['Lắng nghe 100%', 'Xử lý triệt để', 'Bảo mật thông tin', 'Quà tặng tri ân'],
		ctaDesc: 'Giúp chúng tôi hoàn thiện dịch vụ',
		ctaAction: 'Gửi ý kiến đóng góp'
	},
];
</script>

<style scoped>
.panel-enter-active,
.panel-leave-active {
	transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	max-height: 500px;
}
.panel-enter-from,
.panel-leave-to {
	opacity: 0;
	max-height: 0;
	transform: translateY(20px);
}
</style>

