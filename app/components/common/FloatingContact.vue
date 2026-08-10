<script setup>
import { ref, computed, onBeforeUnmount, nextTick, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { HubConnectionBuilder } from '@microsoft/signalr';

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);
const config = useRuntimeConfig();

const isVisible = ref(true);
const isAiOpen = ref(false);

const visitorKey = ref('');
const sessionId = ref(null);
const messages = ref([]);
const messageText = ref('');
const isSending = ref(false);
const messagesContainer = ref(null);
const sessionMode = ref('Ai');
const assignedStaffName = ref(null);

// Khách vãng lai (chưa đăng nhập) phải điền Tên/SĐT trước khi chat được — phiên đã có sẵn 2 field
// này (quay lại lần sau) thì bỏ qua form luôn.
const needsContactInfo = ref(false);
// true cho tới khi initChat() xác định xong needsContactInfo — tránh nháy màn hình chat bình thường
// rồi mới chuyển sang form (needsContactInfo mặc định false trong lúc chờ API phản hồi).
const isCheckingSession = ref(true);
const contactNameInput = ref('');
const contactPhoneInput = ref('');
const contactInfoError = ref('');
const isSubmittingContactInfo = ref(false);

let connection = null;

const scrollMessagesToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

// Card/icon bên trong bong bóng có thể load lệch nhịp (icon fa6 nạp qua API, ảnh sản phẩm), làm
// scrollHeight đổi SAU lần scroll đầu — quan sát mutation trong khung chat để luôn kéo lại đáy thay vì
// chỉ scroll đúng 1 lần tại các điểm gọi thủ công bên dưới.
let scrollObserver = null;
watch(messagesContainer, (el) => {
  scrollObserver?.disconnect();
  if (!el) return;
  scrollObserver = new MutationObserver(() => scrollMessagesToBottom());
  scrollObserver.observe(el, {
    childList: true,
    subtree: true,
    characterData: true,
  });
});

const formatTime = (isoString) => {
  if (!isoString) return '';
  return new Date(isoString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Bong bóng AI đang build dần khi stream — -1 khi không có lượt trả lời nào đang chạy.
// Luôn đọc/ghi qua messages.value[streamingIdx] (không giữ reference object rời) vì mutate
// thẳng lên object đã push ra ngoài mảng reactive không đi qua proxy nên Vue không re-render.
let streamingIdx = -1;
const newStreamingMsg = () => ({
  id: 'streaming',
  sender: 'Ai',
  content: '',
  createdAt: new Date().toISOString(),
  cardsJson: null,
});

const connectHub = async () => {
  const baseUrl = config.public.apiUrlForBrowserClient;
  connection = new HubConnectionBuilder()
    .withUrl(`${baseUrl}/hubs/store-chat?visitorKey=${encodeURIComponent(visitorKey.value)}`)
    .withAutomaticReconnect()
    .build();

  connection.on('ReceiveMessage', (message) => {
    if (message.sender !== 'Visitor' && streamingIdx !== -1) {
      messages.value.splice(streamingIdx, 1);
      streamingIdx = -1;
    }
    messages.value.push(message);
    scrollMessagesToBottom();
  });

  connection.on('AiTyping', () => {
    streamingIdx = messages.value.push(newStreamingMsg()) - 1;
    scrollMessagesToBottom();
  });

  connection.on('ReceiveMessageChunk', (delta) => {
    if (streamingIdx === -1) {
      streamingIdx = messages.value.push(newStreamingMsg()) - 1;
    }
    messages.value[streamingIdx].content += delta;
    scrollMessagesToBottom();
  });

  connection.on('ModeChanged', (payload) => {
    sessionMode.value = payload.mode;
    assignedStaffName.value = payload.staffName || null;
  });

  await connection.start();
  await connection.invoke('JoinSession', sessionId.value);
};

const initChat = async () => {
  visitorKey.value = getOrCreateVisitorKey();

  const session = await storeChatRepository.createOrRestoreSession(visitorKey.value);
  sessionId.value = session.id;
  sessionMode.value = session.mode;
  assignedStaffName.value = session.assignedStaffName || null;
  needsContactInfo.value = !accessToken.value && !session.contactName;
  isCheckingSession.value = false;

  // Khách đã đăng nhập TRƯỚC khi mở khung chat (trường hợp phổ biến nhất) — watch(accessToken)
  // bên dưới chỉ bắt được lúc đăng nhập giữa chừng trong khi đang chat, không bắt được trường hợp
  // này vì token không đổi giá trị. Gắn ngay ở đây để Manager không hiện nhầm "Khách vãng lai".
  if (accessToken.value) {
    try {
      await storeChatRepository.linkToCustomer(session.id);
    } catch {
      // Không chặn luồng mở chat nếu gắn phiên thất bại.
    }
  }

  messages.value = await storeChatRepository.getHistory(session.id);
  scrollMessagesToBottom();

  await connectHub();
};

const submitContactInfo = async () => {
  const name = contactNameInput.value.trim();
  const phone = contactPhoneInput.value.trim();
  if (!name || !phone) return;

  contactInfoError.value = '';
  isSubmittingContactInfo.value = true;
  try {
    await storeChatRepository.setContactInfo(sessionId.value, name, phone);
    needsContactInfo.value = false;
  } catch {
    contactInfoError.value = 'Số điện thoại không hợp lệ, vui lòng kiểm tra lại.';
  } finally {
    isSubmittingContactInfo.value = false;
  }
};

// "Xoá cuộc trò chuyện" = kết thúc phiên hiện tại, tạo phiên mới (VisitorKey mới) — phiên cũ giữ
// nguyên toàn bộ lịch sử cho quản trị, không nhận tin mới nữa vì khách không còn tham chiếu tới nó.
// Giữ Tên/SĐT đã điền (BE tự copy sang phiên mới) nên không phải hỏi lại.
const clearChat = async () => {
  if (!sessionId.value) return;

  const previousSessionId = sessionId.value;
  try {
    const newVisitorKey = resetVisitorKey();
    const session = await storeChatRepository.createOrRestoreSession(
      newVisitorKey,
      previousSessionId
    );

    connection?.stop();
    streamingIdx = -1;
    visitorKey.value = newVisitorKey;
    sessionId.value = session.id;
    sessionMode.value = session.mode;
    assignedStaffName.value = session.assignedStaffName || null;
    messages.value = [];

    await connectHub();
  } catch {
    // Lỗi mạng — giữ nguyên phiên cũ, khách có thể bấm lại.
  }
};

const sendMessage = async () => {
  const text = messageText.value.trim();
  if (!text || isSending.value || !connection) return;

  messageText.value = '';
  isSending.value = true;
  try {
    await connection.invoke('SendMessage', sessionId.value, text);
  } catch {
    // Lỗi kết nối/rate limit — input đã xoá theo yêu cầu, không khôi phục lại nội dung cũ.
  } finally {
    isSending.value = false;
  }
};

// Tên/SĐT đã có sẵn từ bước điền trước khi chat (khách vãng lai) hoặc từ tài khoản (khách đã đăng
// nhập) — không cần form riêng ở bước này nữa.
const requestHandoff = async () => {
  if (sessionMode.value !== 'Ai' || !sessionId.value) return;
  await storeChatRepository.requestHandoff(sessionId.value);
  sessionMode.value = 'Waiting';
};

// Trạng thái hiển thị dưới tiêu đề "Chat Support" — 1 dòng nhỏ, gọn, thay cho nút bị disable trước đây.
const statusText = computed(() => {
  if (sessionMode.value === 'Waiting') return 'Đang chờ nhân viên...';
  if (sessionMode.value === 'Human') return 'Đang chat với người thật';
  return 'Trợ lý AI đang hỗ trợ';
});

const statusDotClass = computed(() => {
  if (sessionMode.value === 'Waiting') return 'bg-amber-400 animate-pulse';
  if (sessionMode.value === 'Human') return 'bg-emerald-400';
  return 'bg-white/40';
});

// Tin nhắn Staff soạn bằng rich-text editor (WangEditor) ở Manager — nội dung là HTML đã qua editor
// sanitize sẵn, KHÔNG phải markdown thô như Ai/Visitor. Escape+markdown-parse như renderChatMarkdown
// sẽ biến các thẻ <p>/<strong> thành chữ hiển thị nguyên văn — render thẳng v-html cho riêng Staff.
const renderMessageContent = (msg) =>
  msg.sender === 'Staff' ? msg.content : renderChatMarkdown(msg.content);

// Parse cardsJson (mảng block "product-cards"/"variant-cards") — bỏ qua nếu BE trả JSON hỏng, không crash UI
const parseCards = (cardsJson) => {
  if (!cardsJson) return [];
  try {
    return JSON.parse(cardsJson);
  } catch {
    return [];
  }
};

// Bấm card sản phẩm → gửi tin nhắn tự nhiên qua Hub có sẵn để AI gọi lại get_product_detail
const onViewVariants = (productId, name) => {
  messageText.value = `Cho tôi xem các biến thể màu của xe ${name} (mã sản phẩm ${productId})`;
  sendMessage();
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
  scrollObserver?.disconnect();
});

watch(accessToken, async (newToken, oldToken) => {
  if (newToken && !oldToken && sessionId.value) {
    needsContactInfo.value = false;
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
        <div class="p-4 bg-slate-900 text-white flex items-center justify-between gap-2 shrink-0">
          <div class="flex items-center gap-2 min-w-0">
            <div
              class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0"
            >
              <Icon name="fa6-solid:robot" class="w-5 h-5 sm:w-5.5 sm:h-5.5" />
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest"
                >Chat Support</span
              >
              <span
                v-if="!isCheckingSession && !needsContactInfo"
                class="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-white/70 mt-0.5"
              >
                <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="statusDotClass" />
                <span class="truncate">{{ statusText }}</span>
              </span>
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button
              v-if="!isCheckingSession && !needsContactInfo && sessionMode === 'Ai'"
              class="px-2.5 h-7 rounded-full bg-white/10 hover:bg-white/20 text-[9px] font-bold whitespace-nowrap transition-all"
              @click="requestHandoff"
            >
              Gặp nhân viên
            </button>
            <button
              v-if="!isCheckingSession && !needsContactInfo"
              class="floating-icon-button w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
              title="Xoá cuộc trò chuyện"
              @click="clearChat"
            >
              <Icon name="fa6-solid:broom" class="text-xs" />
            </button>
            <button
              class="floating-icon-button w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
              @click="isAiOpen = false"
            >
              <Icon name="fa6-solid:xmark" class="text-sm" />
            </button>
          </div>
        </div>

        <div v-if="isCheckingSession" class="flex-1 flex items-center justify-center">
          <Icon name="fa6-solid:spinner" class="animate-spin text-gray-300 text-2xl" />
        </div>
        <div v-else-if="needsContactInfo" class="flex-1 flex flex-col justify-center p-5 gap-3">
          <p class="text-[11px] font-bold text-gray-700 text-center">
            Vui lòng để lại Tên và SĐT trước khi bắt đầu chat, để nhân viên tiện hỗ trợ và liên hệ
            lại khi cần:
          </p>
          <input
            v-model="contactNameInput"
            type="text"
            placeholder="Tên của bạn"
            class="w-full h-10 bg-gray-100/50 border border-transparent rounded-xl px-4 text-[11px] sm:text-xs font-bold outline-none focus:bg-white focus:border-primary/20"
          />
          <input
            v-model="contactPhoneInput"
            type="tel"
            placeholder="Số điện thoại"
            class="w-full h-10 bg-gray-100/50 border border-transparent rounded-xl px-4 text-[11px] sm:text-xs font-bold outline-none focus:bg-white focus:border-primary/20"
            @keyup.enter="submitContactInfo"
          />
          <p v-if="contactInfoError" class="text-[10px] font-bold text-red-500 text-center">
            {{ contactInfoError }}
          </p>
          <button
            class="h-10 rounded-xl bg-primary text-white text-[11px] font-black uppercase tracking-wider disabled:opacity-50"
            :disabled="
              isSubmittingContactInfo || !contactNameInput.trim() || !contactPhoneInput.trim()
            "
            @click="submitContactInfo"
          >
            Bắt đầu chat
          </button>
        </div>

        <template v-else>
          <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
            <template v-for="msg in messages" :key="msg.id">
              <div
                v-if="msg.sender === 'System'"
                class="text-center text-[10px] text-gray-400 font-bold py-1"
              >
                {{ msg.content }}
              </div>
              <div
                v-else
                class="flex max-w-[90%] sm:max-w-[85%]"
                :class="msg.sender === 'Visitor' ? 'flex-row-reverse gap-2.5 ml-auto' : 'gap-2.5'"
              >
                <div
                  v-if="msg.sender !== 'Visitor'"
                  class="w-7 h-7 rounded-full bg-slate-900 shrink-0 flex items-center justify-center text-white"
                >
                  <Icon
                    :name="msg.sender === 'Staff' ? 'fa6-solid:user' : 'fa6-solid:robot'"
                    class="text-[9px] sm:text-[10px]"
                  />
                </div>
                <div
                  :class="
                    msg.sender === 'Visitor'
                      ? 'bg-primary text-white p-3 sm:p-4 rounded-2xl rounded-tr-none shadow-lg shadow-primary/20'
                      : 'bg-white border border-gray-100 p-3 sm:p-4 rounded-2xl rounded-tl-none shadow-sm'
                  "
                >
                  <div
                    v-if="msg.sender === 'Staff' && assignedStaffName"
                    class="text-[9px] font-black text-primary uppercase tracking-wide mb-1"
                  >
                    {{ assignedStaffName }}
                  </div>
                  <div
                    v-if="msg.id === 'streaming' && !msg.content"
                    class="flex items-center gap-2"
                  >
                    <Icon name="fa6-solid:spinner" class="animate-spin text-gray-400 text-xs" />
                    <span class="text-[11px] text-gray-400 font-bold">Đang suy nghĩ...</span>
                  </div>
                  <div
                    v-else
                    class="prose prose-sm max-w-none text-[11px] sm:text-xs leading-relaxed font-bold [&_ul]:my-1 [&_li]:my-0 [&_p]:my-1 [&_strong]:font-black !text-inherit [&_*]:!text-inherit"
                    :class="msg.sender !== 'Visitor' && 'text-gray-800 font-medium'"
                    v-html="renderMessageContent(msg)"
                  />
                  <template
                    v-for="block in parseCards(msg.cardsJson)"
                    :key="block.kind + '-' + (block.productId ?? '')"
                  >
                    <div v-if="block.kind === 'product-cards'" class="flex flex-col gap-2 mt-2">
                      <CommonStoreChatProductCard
                        v-for="item in block.items"
                        :key="item.productId"
                        v-bind="item"
                        @view-variants="onViewVariants"
                      />
                    </div>
                    <div
                      v-else-if="block.kind === 'variant-cards'"
                      class="flex flex-col gap-2 mt-2"
                    >
                      <CommonStoreChatVariantCard
                        v-for="item in block.items"
                        :key="item.variantId"
                        v-bind="item"
                      />
                    </div>
                  </template>
                  <span
                    class="text-[8px] mt-1.5 block font-bold uppercase"
                    :class="msg.sender === 'Visitor' ? 'text-white/60' : 'text-gray-400'"
                    >{{ formatTime(msg.createdAt) }}</span
                  >
                </div>
              </div>
            </template>
          </div>

          <div class="p-4 bg-white border-t border-gray-100 shrink-0">
            <div class="relative flex items-center">
              <input
                v-model="messageText"
                type="text"
                placeholder="Nhập nội dung cần hỗ trợ..."
                class="w-full h-10 bg-gray-100/50 border border-transparent rounded-xl pl-4 pr-11 text-[11px] sm:text-xs font-bold focus:bg-white focus:border-primary/20 focus:ring-3 focus:ring-primary/5 transition-all outline-none"
                @keyup.enter="sendMessage"
              />
              <button
                class="floating-icon-button absolute right-2 w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-40"
                :disabled="isSending || !messageText.trim()"
                @click="sendMessage"
              >
                <Icon name="fa6-solid:paper-plane" class="text-xs" />
              </button>
            </div>
          </div>
        </template>
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
