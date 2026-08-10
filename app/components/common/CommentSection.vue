<script setup>
import { ref, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import { useCommentService } from '~/services/comment.service';

const props = defineProps({
  articleType: {
    type: String,
    required: true,
  },
  articleSlug: {
    type: String,
    required: true,
  },
});

const commentService = useCommentService();
const comments = ref([]);
const newComment = ref('');
const isSubmitting = ref(false);
const isLoading = ref(true);

const fetchComments = async () => {
  try {
    isLoading.value = true;
    const data = await commentService.getComments(props.articleType, props.articleSlug);
    comments.value = (data || []).filter((c) => c.isApproved);
  } catch {
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchComments();
});

const submitComment = async () => {
  if (!newComment.value.trim()) {
    toast.warning('Vui lòng nhập nội dung bình luận');
    return;
  }

  isSubmitting.value = true;

  try {
    await commentService.createComment({
      articleType: props.articleType,
      articleSlug: props.articleSlug,
      authorName: 'Khách', 
      content: newComment.value,
    });

    toast.success('Bình luận của bạn đã được gửi!');
    newComment.value = '';
    await fetchComments();
  } catch {
    toast.error('Có lỗi xảy ra khi gửi bình luận');
  } finally {
    isSubmitting.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
</script>

<template>
  <div class="mt-12 border-t border-gray-100 pt-8 w-full">
    <h3
      class="text-xl font-black uppercase tracking-tight text-gray-950 mb-8 flex items-center gap-2"
    >
      <Icon name="ph:chat-circle-dots-bold" class="text-2xl text-red-600" />
      Bình luận
      <span class="text-gray-400 text-base font-medium ml-1">({{ comments.length }})</span>
    </h3>

    <div class="flex gap-4 mb-10">
      <div class="hidden sm:block shrink-0">
        <div
          class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200"
        >
          <Icon name="ph:user-bold" class="text-gray-400 text-xl" />
        </div>
      </div>

      <div class="flex-grow">
        <div
          class="relative rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500 transition-all"
        >
          <textarea
            v-model="newComment"
            rows="3"
            placeholder="Nhập bình luận của bạn về bài viết này..."
            class="w-full p-4 bg-transparent border-none focus:ring-0 resize-none text-gray-700 placeholder-gray-400"
          />

          <div
            class="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center"
          >
            <p class="text-xs text-gray-500 font-medium hidden sm:block">
              Vui lòng tuân thủ tiêu chuẩn cộng đồng khi bình luận.
            </p>
            <button
              :disabled="isSubmitting"
              class="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm font-black uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 ml-auto"
              @click="submitComment"
            >
              <Icon v-if="isSubmitting" name="ph:spinner-gap-bold" class="animate-spin text-lg" />
              <Icon v-else name="ph:paper-plane-right-fill" class="text-lg" />
              Gửi bình luận
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="text-center py-10">
      <Icon name="ph:spinner-gap-bold" class="animate-spin text-3xl text-gray-400" />
    </div>
    <div
      v-else-if="comments.length === 0"
      class="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200"
    >
      <Icon name="ph:chats-teardrop-light" class="text-5xl text-gray-300 mb-3" />
      <p class="text-gray-500 font-medium">
        Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
      </p>
    </div>
    <div v-else class="space-y-6">
      <div v-for="comment in comments" :key="comment.id" class="flex gap-4">
        <div class="shrink-0">
          <div
            class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold"
          >
            {{ comment.authorName ? comment.authorName.charAt(0).toUpperCase() : 'K' }}
          </div>
        </div>
        <div class="flex-grow bg-gray-50 p-4 rounded-2xl rounded-tl-none border border-gray-100">
          <div class="flex items-baseline justify-between mb-2">
            <span class="font-bold text-gray-900">{{ comment.authorName || 'Khách' }}</span>
            <span class="text-xs text-gray-400">{{ formatDate(comment.createdAt) }}</span>
          </div>
          <p class="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
            {{ comment.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
