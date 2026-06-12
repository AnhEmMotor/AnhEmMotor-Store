<template>
	<section class="bg-gray-50 py-16">
		<div class="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-12 space-y-3">
				<h2 class="text-xs font-extrabold text-red-600 uppercase tracking-[0.3em]">Giải đáp nhanh</h2>
				<p class="text-4xl font-extrabold text-gray-900 uppercase tracking-tight">Câu hỏi thường gặp</p>
			</div>

			
			<div class="mb-12 space-y-6">
				<div class="relative max-w-2xl mx-auto">
					<Icon name="fa6-solid:magnifying-glass" class="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
					<input 
						v-model="searchQuery" 
						type="text" 
						placeholder="Tìm kiếm câu hỏi của bạn..." 
						class="w-full pl-14 pr-8 py-5 bg-white border border-gray-100 rounded-xl text-sm font-bold shadow-sm focus:ring-4 focus:ring-red-600/5 focus:border-red-600 outline-none transition-all"
					>
				</div>
				
				<div class="flex flex-wrap justify-center gap-2">
					<button 
						v-for="cat in ['Tất cả', 'Bảo hành', 'Trả góp', 'Giấy tờ', 'Bảo dưỡng', 'Hỗ trợ']" 
						:key="cat"
						class="px-6 py-2.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all"
						:class="activeCategory === cat ? 'bg-red-600 text-white shadow-lg shadow-red-600/10' : 'bg-white text-gray-400 border border-gray-100 hover:border-red-600/30'"
						@click="activeCategory = cat"
					>
						{{ cat }}
					</button>
				</div>
			</div>

			
			<div class="space-y-3">
				<div
v-for="(faq, idx) in filteredFaqs" :key="idx" 
					class="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-500"
					:class="{ 'shadow-xl shadow-red-600/5 border-red-600/20': activeIdx === idx }"
				>
					<button 
						class="w-full px-8 py-6 flex items-center justify-between text-left group"
						@click="activeIdx = activeIdx === idx ? -1 : idx"
					>
						<span class="text-[14px] font-extrabold text-gray-900 uppercase tracking-tight group-hover:text-red-600 transition-colors leading-tight">{{ faq.question }}</span>
						<div
class="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-red-700 group-hover:text-white transition-all duration-500"
							:class="{ 'bg-red-700 text-white rotate-180': activeIdx === idx }"
						>
							<Icon name="fa6-solid:chevron-down" class="text-[9px]" />
						</div>
					</button>
					<div 
						v-show="activeIdx === idx"
						class="px-8 pb-8 animate-fade-in"
					>
						<div class="border-t border-gray-50 pt-6">
							<p class="text-[13px] text-gray-500 font-medium leading-relaxed">
								{{ faq.answer }}
							</p>
						</div>
					</div>
				</div>

				
				<div v-if="filteredFaqs.length === 0" class="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
					<Icon name="fa6-solid:face-frown" class="text-4xl text-gray-200 mb-4" />
					<p class="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Không tìm thấy câu hỏi phù hợp</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeIdx = ref(0);
const searchQuery = ref('');
const activeCategory = ref('Tất cả');

const faqs = [
	{ 
		category: 'Bảo hành',
		question: 'Quy trình bảo hành xe tại AnhEm Motor như thế nào?', 
		answer: 'Tất cả các dòng xe mua tại hệ thống AnhEm Motor đều được bảo hành chính hãng theo quy định của nhà sản xuất (Honda, Yamaha, Suzuki...). Quý khách chỉ cần mang xe và sổ bảo hành đến chi nhánh để được kiểm tra miễn phí.' 
	},
	{ 
		category: 'Trả góp',
		question: 'Mua xe trả góp cần chuẩn bị những giấy tờ gì?', 
		answer: 'Hiện tại thủ tục trả góp rất đơn giản, bạn chỉ cần Căn cước công dân gắn chíp. Thời gian duyệt hồ sơ chỉ từ 15-30 phút, hỗ trợ trả trước từ 0đ tùy theo dòng xe và đơn vị tài chính.' 
	},
	{ 
		category: 'Giấy tờ',
		question: 'Thời gian hoàn tất thủ tục biển số là bao lâu?', 
		answer: 'Thông thường thời gian chờ biển số sẽ từ 7-15 ngày làm việc tùy thuộc vào địa phương đăng ký hộ khẩu của khách hàng. Chúng tôi có đội ngũ hỗ trợ trọn gói thủ tục này.' 
	},
	{ 
		category: 'Hỗ trợ',
		question: 'Có hỗ trợ tư vấn kỹ thuật tận nơi khi gặp sự cố không?', 
		answer: 'Hiện tại chúng tôi hỗ trợ tư vấn kỹ thuật qua Hotline và tại cửa hàng. Đối với các trường hợp xe gặp sự cố nặng, chúng tôi khuyến khích khách hàng đưa xe đến trung tâm bảo dưỡng gần nhất để được kiểm tra chính xác nhất.' 
	},
	{ 
		category: 'Bảo dưỡng',
		question: 'Bao lâu thì tôi nên thay nhớt và bảo dưỡng định kỳ?', 
		answer: 'Theo khuyến cáo, bạn nên thay nhớt sau mỗi 1,500km - 2,000km và bảo dưỡng tổng quát sau mỗi 6,000km để xe luôn vận hành ổn định và bền bỉ.' 
	}
];

const filteredFaqs = computed(() => {
	return faqs.filter(faq => {
		const matchesSearch = faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
							 faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase());
		const matchesCategory = activeCategory.value === 'Tất cả' || faq.category === activeCategory.value;
		return matchesSearch && matchesCategory;
	});
});
</script>


<style scoped>
.animate-fade-in {
	animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
	from { opacity: 0; transform: translateY(-5px); }
	to { opacity: 1; transform: translateY(0); }
}
</style>
