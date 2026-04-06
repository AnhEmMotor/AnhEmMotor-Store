<script setup>
import { ref } from "vue";

defineProps({
	title: {
		type: String,
		default: "Review",
	},
	highlightText: {
		type: String,
		default: "Trải nghiệm",
	},
	subTitle: {
		type: String,
		default: "Kênh YouTube chính thức của AnhEm Motor",
	},
	thumbnail: {
		type: String,
		default: "/assets/image/index/index-banner-bg.webp",
	},
	videoUrl: {
		type: String,
		default: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
	},
	subscribers: {
		type: String,
		default: "100K+",
	},
});

const isVideoPlaying = ref(false);
</script>

<template>
	<div
		class="bg-gray-900 rounded-[40px] p-8 text-white space-y-6 relative overflow-hidden h-full flex flex-col"
	>
		<div class="relative z-10 space-y-2">
			<h3
				class="text-2xl font-black uppercase italic tracking-wider leading-none"
			>
				{{ title }} <br ><span class="text-red-500 text-4xl">{{
					highlightText
				}}</span>
			</h3>
			<p class="text-xs text-white/50">
				{{ subTitle }}
			</p>
		</div>

		<div
			class="relative flex-1 bg-black rounded-3xl overflow-hidden group shadow-[0_30px_60px_-15px_rgba(220,38,38,0.3)] min-h-[300px] cursor-pointer"
			@click="isVideoPlaying = true"
		>
			<template v-if="!isVideoPlaying">
				<img
					:src="thumbnail"
					class="absolute inset-0 w-full h-full object-cover opacity-70 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-40"
					alt="Video Review Thumbnail"
				>
				<div class="absolute inset-0 flex items-center justify-center">
					<div
						class="relative h-24 w-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
					>
						<div
							class="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-20"
						/>
						<div
							class="absolute inset-[-10px] border border-red-500/30 rounded-full animate-spin [animation-duration:10s]"
						/>

						<div
							class="h-20 w-20 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_40_rgba(220,38,38,0.6)] relative z-10 group-hover:bg-white transition-colors duration-300"
						>
							<Icon
								name="fa6-solid:play"
								class="text-3xl text-white ml-1 group-hover:text-red-600 transition-colors"
							/>
						</div>
					</div>
				</div>
				<div
					class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"
				/>

				<div class="absolute bottom-6 left-6 flex items-center gap-2">
					<span
						class="bg-red-600 px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest text-white shadow-lg animate-pulse"
						>Live</span
					>
					<span
						class="text-xs font-black uppercase tracking-widest text-white drop-shadow-md"
						>Review Chân Thực</span
					>
				</div>
			</template>
			<iframe
				v-else
				width="100%"
				height="100%"
				:src="videoUrl"
				title="YouTube video player"
				frameborder="0"
				allow="
					accelerometer;
					autoplay;
					clipboard-write;
					encrypted-media;
					gyroscope;
					picture-in-picture;
					web-share;
				"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
				class="absolute inset-0"
			/>
		</div>

		<div class="pt-2 flex justify-between items-center relative z-10">
			<div class="space-y-1">
				<div class="text-lg font-black text-red-600">{{ subscribers }}</div>
				<div class="text-[10px] text-white/60 font-bold uppercase">
					Subscribers
				</div>
			</div>
			<button
				class="px-6 py-3 bg-red-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-red-600/30 flex items-center gap-2"
			>
				<Icon name="fa6-solid:play" />
				Đăng Ký Ngay
			</button>
		</div>

		<div class="absolute -bottom-10 -right-10 opacity-10">
			<Icon name="fa6-solid:motorcycle" class="text-[200px]" />
		</div>
	</div>
</template>
