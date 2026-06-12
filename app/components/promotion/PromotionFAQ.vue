<script setup>
const faqs = [
	{
		question: "Làm thế nào để áp dụng mã khuyến mãi?",
		answer: "Bạn chỉ cần chọn sản phẩm hoặc dịch vụ có áp dụng khuyến mãi, hệ thống sẽ tự động trừ ưu đãi trực tiếp vào giá bán hoặc bạn có thể đưa mã ưu đãi cho nhân viên tại Showroom khi làm thủ tục."
	},
	{
		question: "Khuyến mãi trả góp 0% áp dụng cho những ngân hàng nào?",
		answer: "Chúng tôi liên kết với hơn 10 ngân hàng và công ty tài chính phổ biến như HD Saison, FE Credit, Home Credit, và các ngân hàng lớn (Vietcombank, Techcombank, VPBank...) thông qua hình thức thẻ tín dụng."
	},
	{
		question: "Tôi có thể cộng dồn nhiều chương trình khuyến mãi không?",
		answer: "Tùy vào từng chiến dịch cụ thể. Thông thường, các chương trình giảm giá tiền mặt sẽ không áp dụng đồng thời với các chương trình tặng quà lớn hoặc trả góp 0%. Vui lòng liên hệ nhân viên để được tư vấn chính xác nhất."
	},
	{
		question: "Chương trình thu cũ đổi mới được định giá như thế nào?",
		answer: "Kỹ thuật viên của chúng tôi sẽ kiểm tra tình trạng xe cũ của bạn và định giá dựa trên giá thị trường. Sau đó, bạn sẽ được trợ giá thêm từ 1.000.000 - 3.000.000 VNĐ khi nâng cấp lên xe mới."
	}
];

const openIndex = ref(0);
const toggleFaq = (index) => {
	openIndex.value = openIndex.value === index ? -1 : index;
};
</script>

<template>
	<section class="py-12 md:py-20 bg-gray-50/30 font-['Manrope']">
		<div class="container mx-auto px-4 max-w-4xl">
			<div class="text-center mb-8 md:mb-16 space-y-2 md:space-y-4">
				<h2 class="text-2xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">Câu hỏi thường gặp</h2>
				<p class="text-[10px] md:text-sm font-bold uppercase tracking-widest text-gray-400">Giải đáp nhanh các thắc mắc về ưu đãi</p>
			</div>

			<div class="space-y-4">
				<div 
					v-for="(faq, index) in faqs" 
					:key="index"
					class="group border border-gray-100 rounded-2xl md:rounded-[2rem] overflow-hidden transition-all duration-300"
					:class="openIndex === index ? 'bg-gray-50 border-gray-200' : 'bg-white hover:border-gray-200'"
				>
					<button 
						class="w-full flex items-center justify-between p-5 md:p-8 text-left outline-none"
						@click="toggleFaq(index)"
					>
						<span class="text-sm md:text-lg font-black text-gray-900 uppercase tracking-tight pr-4">{{ faq.question }}</span>
						<div class="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center bg-white border border-gray-100 shadow-sm transition-transform duration-500" :class="{ 'rotate-180 bg-primary text-white border-primary': openIndex === index }">
							<Icon :name="openIndex === index ? 'ph:minus-bold' : 'ph:plus-bold'" class="text-xs md:text-base" />
						</div>
					</button>
					
					<div 
						v-show="openIndex === index"
						class="px-5 md:px-8 pb-5 md:pb-8 animate-fade-in"
					>
						<p class="text-gray-500 text-xs md:text-base font-medium leading-relaxed max-w-3xl">
							{{ faq.answer }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.animate-fade-in {
	animation: fadeIn 0.5s ease-out forwards;
}
@keyframes fadeIn {
	from { opacity: 0; transform: translateY(-10px); }
	to { opacity: 1; transform: translateY(0); }
}
</style>
