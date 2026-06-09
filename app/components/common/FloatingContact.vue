<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useLayoutStore } from "~/core/application/stores/layout.store";

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
		class="fixed bottom-20 right-4 sm:bottom-10 sm:right-6 z-1000 flex flex-col items-end gap-3 sm:gap-4"
	>
		<!-- AI CHAT WINDOW (UI ONLY) -->
		<Transition name="chat-slide">
			<div
				v-if="isAiOpen"
				class="absolute bottom-16 sm:bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-95 h-[60vh] sm:h-137.5 bg-white shadow-[0_30px_90px_-15px_rgba(0,0,0,0.3)] border border-gray-100 rounded-4xl sm:rounded-[2.5rem] flex flex-col overflow-hidden z-1000 origin-bottom-right"
			>
				<!-- Chat Header -->
				<div class="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
					<div class="flex items-center gap-2">
						<div class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
							<Icon name="fa6-solid:robot" class="w-5 h-5 sm:w-5.5 sm:h-5.5" />
						</div>
						<div class="flex flex-col">
							<span class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest">AnhEm AI Support</span>
							<div class="flex items-center gap-1">
								<span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
								<span class="text-[8px] text-white/50 font-bold uppercase tracking-wider">Đang trực tuyến</span>
							</div>
						</div>
					</div>
					<button class="floating-icon-button w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all" @click="isAiOpen = false">
						<Icon name="fa6-solid:xmark" class="text-sm" />
					</button>
				</div>

				<!-- Chat Messages (Scrollable Area) -->
				<div class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
					<!-- AI Message -->
					<div class="flex gap-2.5 max-w-[90%] sm:max-w-[85%]">
						<div class="w-7 h-7 rounded-full bg-slate-900 shrink-0 flex items-center justify-center text-white">
							<Icon name="fa6-solid:robot" class="text-[9px] sm:text-[10px]" />
						</div>
						<div class="bg-white border border-gray-100 p-3 sm:p-4 rounded-2xl rounded-tl-none shadow-sm">
							<p class="text-[11px] sm:text-xs text-gray-800 leading-relaxed font-medium">Chào mừng bạn đến với **AnhEm Motor**! Tôi là trợ lý AI có thể hỗ trợ bạn tìm kiếm mẫu xe, bảng giá và tư vấn thủ tục trả góp. Bạn cần tôi giúp gì không?</p>
							<span class="text-[8px] text-gray-400 mt-1.5 block font-bold uppercase">14:07</span>
						</div>
					</div>

					<!-- User Message (Mock) -->
					<div class="flex flex-row-reverse gap-2.5 max-w-[90%] sm:max-w-[85%] ml-auto">
						<div class="bg-primary text-white p-3 sm:p-4 rounded-2xl rounded-tr-none shadow-lg shadow-primary/20">
							<p class="text-[11px] sm:text-xs leading-relaxed font-bold">Tôi muốn xem bảng giá xe Honda SH 2024</p>
						</div>
					</div>

					<!-- Typing Indicator (Mock) -->
					<div class="flex gap-2.5 items-center opacity-50">
						<div class="w-7 h-7 rounded-full bg-slate-900 shrink-0 flex items-center justify-center text-white">
							<Icon name="fa6-solid:robot" class="text-[9px] sm:text-[10px]" />
						</div>
						<div class="flex gap-1">
							<span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
							<span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
							<span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
						</div>
					</div>
				</div>

				<!-- Chat Input -->
				<div class="p-4 bg-white border-t border-gray-100 shrink-0">
					<div class="relative flex items-center">
						<input 
							type="text" 
							placeholder="Nhập nội dung cần hỗ trợ..." 
							class="w-full h-10 bg-gray-100/50 border border-transparent rounded-xl pl-4 pr-11 text-[11px] sm:text-xs font-bold focus:bg-white focus:border-primary/20 focus:ring-3 focus:ring-primary/5 transition-all outline-none"
						>
						<button class="floating-icon-button absolute right-2 w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
							<Icon name="fa6-solid:paper-plane" class="text-xs" />
						</button>
					</div>
					<p class="text-[8px] text-center text-gray-400 mt-2 font-bold uppercase tracking-widest">Powered by AnhEm AI Agent</p>
				</div>
			</div>
		</Transition>

		<TransitionGroup
			name="slide-fade"
			tag="div"
			class="flex flex-col gap-2.5 mb-2"
		>
			<template v-if="isContactOpen">
				<a
					v-for="(btn, idx) in floatingButtons"
					:key="btn.label"
					:href="btn.action"
					target="_blank"
					:style="{ transitionDelay: `${idx * 50}ms` }"
					:class="[
						'flex items-center gap-2.5 p-3 sm:p-4 rounded-3xl transition-all hover:scale-105 active:scale-95 shadow-2xl border border-white/10 text-white',
						btn.color,
					]"
				>
					<span
						class="text-[9px] sm:text-[10px] font-black uppercase tracking-tighter whitespace-nowrap px-2"
					>
						{{ btn.label }}
					</span>
					<Icon :name="btn.icon" class="text-lg sm:text-xl" />
				</a>
			</template>

			<button
				v-if="isContactOpen"
				class="flex items-center gap-2.5 p-3 sm:p-4 rounded-3xl transition-all hover:scale-105 active:scale-95 shadow-2xl border border-white/10 text-white bg-slate-900"
				style="transition-delay: 200ms"
				@click="scrollToTop"
			>
				<span
					class="text-[9px] sm:text-[10px] font-black uppercase tracking-tighter whitespace-nowrap px-2"
				>
					Lên đầu trang
				</span>
				<Icon name="fa6-solid:arrow-up" class="text-lg sm:text-xl" />
			</button>
		</TransitionGroup>

		<!-- AI Support Button Toggle -->
		<button
			class="floating-icon-button floating-chatbot-button w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all shadow-2xl border-4 border-white/20 hover:scale-110 active:scale-95 text-white animate-bounce-subtle group relative"
			:class="isAiOpen ? 'bg-primary border-primary/20 rotate-180' : 'bg-slate-900'"
			@click="isAiOpen = !isAiOpen"
		>
			<Icon
				:key="isAiOpen ? 'chatbot-close' : 'chatbot-robot'"
				:name="isAiOpen ? 'fa6-solid:xmark' : 'ph:robot-fill'"
				class="floating-chatbot-icon transition-all"
			/>
			<div v-if="!isAiOpen" class="absolute right-full mr-3 sm:mr-4 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-slate-900 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap border border-white/10 hidden sm:block">
				AI Support (Beta)
			</div>
		</button>

		<!-- Main Contact Toggle (Social/Phone) -->
		<button
			:class="[
				'floating-icon-button w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all shadow-2xl relative z-101 border-4 border-white/20 overflow-hidden text-white',
				isContactOpen
					? 'bg-slate-800 rotate-180 scale-90'
					: 'bg-red-600 hover:scale-110',
			]"
			@click="isContactOpen = !isContactOpen"
		>
			<Icon
				:name="isContactOpen ? 'fa6-solid:xmark' : 'fa6-solid:comment-dots'"
				class="floating-contact-icon"
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

.floating-icon-button {
	padding: 0 !important;
	flex-shrink: 0;
}

.floating-chatbot-button {
	isolation: isolate;
}

.floating-chatbot-icon {
	display: block;
	width: 1.75rem;
	height: 1.75rem;
	color: currentColor;
	flex-shrink: 0;
	filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.25));
}

.floating-contact-icon {
	display: block;
	width: 1.75rem;
	height: 1.75rem;
	color: currentColor;
	flex-shrink: 0;
}

@media (min-width: 640px) {
	.floating-chatbot-icon,
	.floating-contact-icon {
		width: 2rem;
		height: 2rem;
	}
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
