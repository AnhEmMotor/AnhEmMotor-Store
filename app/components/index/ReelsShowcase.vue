<script setup>
import { ref } from "vue";
import { REELS } from "@/constants/reel.constant";
import BaseSectionHeader from "@/components/ui/BaseSectionHeader.vue";
import ReelCard from "@/components/ui/ReelCard.vue";
import VideoModal from "@/components/ui/VideoModal.vue";

const activeVideo = ref(null);
const isOpen = ref(false);

const openVideo = (url) => {
	activeVideo.value = url;
	isOpen.value = true;
};

const closeVideo = () => {
	isOpen.value = false;
	activeVideo.value = null;
};
</script>

<template>
	<section class="py-16 bg-white relative overflow-hidden">
		<div class="container mx-auto px-4">
			<BaseSectionHeader
				title="Video"
				highlight-text="Review"
				description="Cái nhìn thực tế nhất về những mẫu xe đang 'làm mưa làm gió' trên thị trường."
				link-text="Xem toàn bộ video"
				link-to="https://youtube.com/@anhemmotor"
			/>


			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<ReelCard
					v-for="reel in REELS"
					:key="reel.id"
					:reel="reel"
					@play="openVideo"
				/>
			</div>
		</div>

		<VideoModal
			:is-open="isOpen"
			:video-url="activeVideo"
			@close="closeVideo"
		/>
	</section>
</template>
