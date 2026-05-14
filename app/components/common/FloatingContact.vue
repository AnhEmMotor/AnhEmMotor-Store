<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";

const layoutStore = useLayoutStore();
const { floatingButtons } = storeToRefs(layoutStore);

const isVisible = ref(true);
const isContactOpen = ref(false);
const isAiOpen = ref(false);

const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
	<div
		v-if="isVisible"
		class="fixed bottom-10 right-6 z-[1000] flex flex-col items-end gap-4"
	>
		<!-- AI CHAT WINDOW (UI ONLY) -->
		<Transition name="chat-slide">
			<div v-if="isAiOpen" class="absolute bottom-20 right-0 w-[380px] h-[550px] bg-white shadow-[0_30px_90px_-15px_rgba(0,0,0,0.3)] border border-gray-100 rounded-[2.5rem] flex flex-col overflow-hidden z-[1000] origin-bottom-right">
				<!-- Chat Header -->
				<div class="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
							<Icon name="fa6-solid:robot" class="text-xl" />
						</div>
						<div class="flex flex-col">
							<span class="text-[11px] font-black uppercase tracking-widest">AnhEm AI Support</span>
							<div class="flex items-center gap-1.5">
								<span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
								<span class="text-[9px] text-white/50 font-bold uppercase tracking-wider">Đang trực tuyến</span>
							</div>
						</div>
					</div>
					<button @click="isAiOpen = false" class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all">
						<Icon name="fa6-solid:xmark" class="text-sm" />
					</button>
				</div>

				<!-- Chat Messages (Scrollable Area) -->
				<div class="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
					<!-- AI Message -->
					<div class="flex gap-3 max-w-[85%]">
						<div class="w-8 h-8 rounded-full bg-slate-900 shrink-0 flex items-center justify-center text-white">
							<Icon name="fa6-solid:robot" class="text-[10px]" />
						</div>
						<div class="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
							<p class="text-xs text-gray-800 leading-relaxed font-medium">Chào mừng bạn đến với **AnhEm Motor**! Tôi là trợ lý AI có thể hỗ trợ bạn tìm kiếm mẫu xe, bảng giá và tư vấn thủ tục trả góp. Bạn cần tôi giúp gì không?</p>
							<span class="text-[9px] text-gray-400 mt-2 block font-bold uppercase">14:07</span>
						</div>
					</div>

					<!-- User Message (Mock) -->
					<div class="flex flex-row-reverse gap-3 max-w-[85%] ml-auto">
						<div class="bg-primary text-white p-4 rounded-2xl rounded-tr-none shadow-lg shadow-primary/20">
							<p class="text-xs leading-relaxed font-bold">Tôi muốn xem bảng giá xe Honda SH 2024</p>
						</div>
					</div>

					<!-- Typing Indicator (Mock) -->
					<div class="flex gap-3 items-center opacity-50">
						<div class="w-8 h-8 rounded-full bg-slate-900 shrink-0 flex items-center justify-center text-white">
							<Icon name="fa6-solid:robot" class="text-[10px]" />
						</div>
						<div class="flex gap-1">
							<span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
							<span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
							<span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
						</div>
					</div>
				</div>

				<!-- Chat Input -->
				<div class="p-6 bg-white border-t border-gray-100 shrink-0">
					<div class="relative flex items-center">
						<input 
							type="text" 
							placeholder="Nhập nội dung cần hỗ trợ..." 
							class="w-full h-12 bg-gray-100/50 border border-transparent rounded-2xl pl-5 pr-12 text-xs font-bold focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none"
						>
						<button class="absolute right-2 w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
							<Icon name="fa6-solid:paper-plane" class="text-sm" />
						</button>
					</div>
					<p class="text-[8px] text-center text-gray-400 mt-3 font-bold uppercase tracking-widest">Powered by AnhEm AI Agent</p>
				</div>
			</div>
		</Transition>

		<TransitionGroup
			name="slide-fade"
			tag="div"
			class="flex flex-col gap-3 mb-2"
		>
			<template v-if="isContactOpen">
				<a
					v-for="(btn, idx) in floatingButtons"
					:key="btn.label"
					:href="btn.action"
					target="_blank"
					:style="{ transitionDelay: `${idx * 50}ms` }"
					:class="[
						'flex items-center gap-3 p-4 rounded-3xl transition-all hover:scale-110 active:scale-95 shadow-2xl border border-white/10 text-white',
						btn.color,
					]"
				>
					<span
						class="text-[10px] font-black uppercase tracking-tighter whitespace-nowrap px-2"
					>
						{{ btn.label }}
					</span>
					<Icon :name="btn.icon" class="text-xl" />
				</a>
			</template>

			<button
				v-if="isContactOpen"
				class="flex items-center gap-3 p-4 rounded-3xl transition-all hover:scale-110 active:scale-95 shadow-2xl border border-white/10 text-white bg-slate-900"
				style="transition-delay: 200ms"
				@click="scrollToTop"
			>
				<span
					class="text-[10px] font-black uppercase tracking-tighter whitespace-nowrap px-2"
				>
					Lên đầu trang
				</span>
				<Icon name="fa6-solid:arrow-up" class="text-xl" />
			</button>
		</TransitionGroup>

		<!-- AI Support Button Toggle -->
		<button
			class="w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-2xl border-4 border-white/20 hover:scale-110 active:scale-95 text-white animate-bounce-subtle group relative"
			:class="isAiOpen ? 'bg-primary border-primary/20 rotate-180' : 'bg-slate-900'"
			@click="isAiOpen = !isAiOpen"
		>
			<Icon :name="isAiOpen ? 'fa6-solid:xmark' : 'fa6-solid:robot'" class="text-2xl transition-all" />
			<div v-if="!isAiOpen" class="absolute right-full mr-4 px-3 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap border border-white/10">
				AI Support (Beta)
			</div>
		</button>

		<!-- Main Contact Toggle (Social/Phone) -->
		<button
			:class="[
				'w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-2xl relative z-[101] border-4 border-white/20 overflow-hidden text-white',
				isContactOpen
					? 'bg-slate-800 rotate-180 scale-90'
					: 'bg-red-600 hover:scale-110',
			]"
			@click="isContactOpen = !isContactOpen"
		>
			<Icon
				:name="isContactOpen ? 'fa6-solid:xmark' : 'fa6-solid:comment-dots'"
				class="text-3xl"
			/>
			<span
				v-if="!isContactOpen"
				class="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-20"
			/>
		</button>
	</div>
</template>

<style scoped>
@keyframes bounce-subtle {
	0%, 100% { transform: translateY(0); }
	50% { transform: translateY(-5px); }
}

.animate-bounce-subtle {
	animation: bounce-subtle 2s infinite ease-in-out;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateY(20px) scale(0.5);
	opacity: 0;
}

/* AI Chat Animation */
.chat-slide-enter-active,
.chat-slide-leave-active {
	transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.chat-slide-enter-from,
.chat-slide-leave-to {
	transform: translateY(20px) scale(0.8);
	opacity: 0;
}


</style>

