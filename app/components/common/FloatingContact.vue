<script setup>
import { ref, onBeforeUnmount, nextTick, watch } from "vue";
import { storeToRefs } from "pinia";
import { HubConnectionBuilder } from "@microsoft/signalr";

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);
const config = useRuntimeConfig();

const isVisible = ref(true);
const isAiOpen = ref(false);

const VISITOR_KEY_STORAGE = "store_chat_visitor_key";

const visitorKey = ref("");
const sessionId = ref(null);
const messages = ref([]);
const messageText = ref("");
const isSending = ref(false);
const messagesContainer = ref(null);

let connection = null;

const getOrCreateVisitorKey = () => {
	let key = localStorage.getItem(VISITOR_KEY_STORAGE);
	if (!key) {
		key = crypto.randomUUID();
		localStorage.setItem(VISITOR_KEY_STORAGE, key);
	}
	return key;
};

const scrollMessagesToBottom = () => {
	nextTick(() => {
		if (messagesContainer.value) {
			messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
		}
	});
};

const formatTime = (isoString) => {
	if (!isoString) return "";
	return new Date(isoString).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
};

const connectHub = async () => {
	const baseUrl = config.public.apiUrlForBrowserClient;
	connection = new HubConnectionBuilder()
		.withUrl(
			`${baseUrl}/hubs/store-chat?visitorKey=${encodeURIComponent(visitorKey.value)}`,
		)
		.withAutomaticReconnect()
		.build();

	connection.on("ReceiveMessage", (message) => {
		messages.value.push(message);
		scrollMessagesToBottom();
	});

	await connection.start();
	await connection.invoke("JoinSession", sessionId.value);
};

const initChat = async () => {
	visitorKey.value = getOrCreateVisitorKey();

	const session = await storeChatRepository.createOrRestoreSession(
		visitorKey.value,
	);
	sessionId.value = session.id;

	messages.value = await storeChatRepository.getHistory(session.id);
	scrollMessagesToBottom();

	await connectHub();
};

const sendMessage = async () => {
	const text = messageText.value.trim();
	if (!text || isSending.value || !connection) return;

	isSending.value = true;
	try {
		await connection.invoke("SendMessage", sessionId.value, text);
		messageText.value = "";
	} catch {
		// Lỗi kết nối/rate limit — giữ nguyên nội dung input để người dùng gửi lại.
	} finally {
		isSending.value = false;
	}
};

// Chỉ tạo phiên/kết nối Hub khi khách thực sự mở khung chat — tránh tốn quota
// rate-limit và mở WebSocket cho khách chỉ ghé trang mà không bấm vào chat.
let isInitialized = false;
watch(isAiOpen, (open) => {
	if (open && !isInitialized) {
		isInitialized = true;
		initChat();
	}
});

onBeforeUnmount(() => {
	connection?.stop();
});

watch(accessToken, async (newToken, oldToken) => {
	if (newToken && !oldToken && sessionId.value) {
		try {
			await storeChatRepository.linkToCustomer(sessionId.value);
		} catch {
			// Không chặn luồng đăng nhập nếu gắn phiên chat thất bại.
		}
	}
});
</script>

<template>
	<div
		v-if="isVisible"
		class="fixed bottom-20 right-4 sm:bottom-10 sm:right-6 z-1000 flex flex-col items-end gap-3 sm:gap-4"
	>
		<Transition name="chat-slide">
			<div
				v-if="isAiOpen"
				class="absolute bottom-16 sm:bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-95 h-[60vh] sm:h-137.5 bg-white shadow-[0_30px_90px_-15px_rgba(0,0,0,0.3)] border border-gray-100 rounded-4xl sm:rounded-[2.5rem] flex flex-col overflow-hidden z-1000 origin-bottom-right"
			>
				<div
					class="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0"
				>
					<div class="flex items-center gap-2">
						<div
							class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20"
						>
							<Icon name="fa6-solid:robot" class="w-5 h-5 sm:w-5.5 sm:h-5.5" />
						</div>
						<div class="flex flex-col">
							<span
								class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest"
								>AnhEm AI Support</span
							>
							<div class="flex items-center gap-1">
								<span
									class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
								/>
								<span
									class="text-[8px] text-white/50 font-bold uppercase tracking-wider"
									>Đang trực tuyến</span
								>
							</div>
						</div>
					</div>
					<button
						class="floating-icon-button w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
						@click="isAiOpen = false"
					>
						<Icon name="fa6-solid:xmark" class="text-sm" />
					</button>
				</div>

				<div
					ref="messagesContainer"
					class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50"
				>
					<div
						v-for="msg in messages"
						:key="msg.id"
						class="flex max-w-[90%] sm:max-w-[85%]"
						:class="
							msg.sender === 'Visitor'
								? 'flex-row-reverse gap-2.5 ml-auto'
								: 'gap-2.5'
						"
					>
						<div
							v-if="msg.sender !== 'Visitor'"
							class="w-7 h-7 rounded-full bg-slate-900 shrink-0 flex items-center justify-center text-white"
						>
							<Icon name="fa6-solid:robot" class="text-[9px] sm:text-[10px]" />
						</div>
						<div
							:class="
								msg.sender === 'Visitor'
									? 'bg-primary text-white p-3 sm:p-4 rounded-2xl rounded-tr-none shadow-lg shadow-primary/20'
									: 'bg-white border border-gray-100 p-3 sm:p-4 rounded-2xl rounded-tl-none shadow-sm'
							"
						>
							<p
								class="text-[11px] sm:text-xs leading-relaxed font-bold"
								:class="msg.sender !== 'Visitor' && 'text-gray-800 font-medium'"
							>
								{{ msg.content }}
							</p>
							<span
								class="text-[8px] mt-1.5 block font-bold uppercase"
								:class="
									msg.sender === 'Visitor' ? 'text-white/60' : 'text-gray-400'
								"
								>{{ formatTime(msg.createdAt) }}</span
							>
						</div>
					</div>
				</div>

				<div class="p-4 bg-white border-t border-gray-100 shrink-0">
					<div class="relative flex items-center">
						<input
							v-model="messageText"
							type="text"
							placeholder="Nhập nội dung cần hỗ trợ..."
							class="w-full h-10 bg-gray-100/50 border border-transparent rounded-xl pl-4 pr-11 text-[11px] sm:text-xs font-bold focus:bg-white focus:border-primary/20 focus:ring-3 focus:ring-primary/5 transition-all outline-none"
							@keyup.enter="sendMessage"
						>
						<button
							class="floating-icon-button absolute right-2 w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-40"
							:disabled="isSending || !messageText.trim()"
							@click="sendMessage"
						>
							<Icon name="fa6-solid:paper-plane" class="text-xs" />
						</button>
					</div>
					<p
						class="text-[8px] text-center text-gray-400 mt-2 font-bold uppercase tracking-widest"
					>
						Powered by AnhEm AI Agent
					</p>
				</div>
			</div>
		</Transition>

		<button
			class="floating-icon-button w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all shadow-2xl relative z-101 border-4 border-white/20 overflow-hidden text-white group"
			:class="isAiOpen ? 'bg-slate-800 rotate-180 scale-90' : 'bg-red-600 hover:scale-110'"
			@click="isAiOpen = !isAiOpen"
		>
			<Icon
				:name="isAiOpen ? 'fa6-solid:xmark' : 'fa6-solid:comment-dots'"
				class="floating-contact-icon"
			/>
			<span
				v-if="!isAiOpen"
				class="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-20"
			/>
			<div
				v-if="!isAiOpen"
				class="absolute right-full mr-3 sm:mr-4 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-slate-900 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap border border-white/10 hidden sm:block"
			>
				AI Support (Beta)
			</div>
		</button>
	</div>
</template>

<style scoped>
.floating-icon-button {
	padding: 0 !important;
	flex-shrink: 0;
}

.floating-contact-icon {
	display: block;
	width: 1.75rem;
	height: 1.75rem;
	color: currentColor;
	flex-shrink: 0;
}

@media (min-width: 640px) {
	.floating-contact-icon {
		width: 2rem;
		height: 2rem;
	}
}

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
