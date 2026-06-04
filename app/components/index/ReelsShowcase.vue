<script setup>
import { ref } from "vue";

import ReelCard from "../ui/ReelCard.vue";
import VideoModal from "../ui/VideoModal.vue";
import { REELS } from "@/constants/reel.constant";

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
	<section class="py-12 md:py-24 bg-white relative overflow-hidden">
		<div class="container mx-auto px-6">
			<div class="flex flex-col md:flex-row justify-between items-end gap-10 mb-16">
				<div class="space-y-4 max-w-2xl">
					<div class="text-primary font-bold uppercase tracking-widest text-sm">Thực tế & Trực quan</div>
					<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
						Video <span class="text-primary">Review</span>
					</h2>
					<p class="text-slate-500 text-lg font-medium">
						Cái nhìn thực tế nhất về những mẫu xe đang "làm mưa làm gió" trên thị trường qua những thước phim ngắn.
					</p>
				</div>
				
				<NuxtLink
					to="https://youtube.com/@anhemmotor"
					target="_blank"
					class="group flex items-center gap-2 text-slate-900 font-bold hover:text-primary transition-colors pb-2 border-b-2 border-slate-100 hover:border-primary"
				>
					Xem toàn bộ video
					<Icon name="ph:arrow-right-bold" class="transition-transform group-hover:translate-x-1" />
				</NuxtLink>
			</div>

			<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
