<script setup>
import { useAsyncData } from "#imports";
import { technologyService } from "~/core/application/services/technology.service";
import { toast } from "vue3-toastify";

const route = useRoute();

const { data: interactionCard, pending } = useAsyncData(
	`technology-interaction-${route.params.slug}`,
	() => technologyService.getInteractionCardBySlug(route.params.slug)
);

watchEffect(() => {
	if (interactionCard.value) {
		useSeoMeta({
			title: `${interactionCard.value.title} | Công nghệ tiên phong`,
			description: interactionCard.value.description,
		});
	}
});

const shareOnFacebook = () => {
	if (import.meta.client) {
		window.open(
			`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
			"_blank",
		);
	}
};

const copyLink = () => {
	if (import.meta.client) {
		navigator.clipboard.writeText(window.location.href);
		toast.success("Đã sao chép liên kết!");
	}
};
</script>

<template>
	<div class="bg-black text-white min-h-screen pb-24 font-['Manrope']">
		<div v-if="pending" class="h-screen flex items-center justify-center">
			<div class="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"/>
		</div>

		<div v-else-if="interactionCard">
			<section
				class="relative min-h-[500px] md:min-h-[600px] flex items-end overflow-hidden text-white"
			>
				<div class="absolute inset-0 z-0">
					<img
						v-if="interactionCard.image"
						:src="interactionCard.image"
						class="w-full h-full object-cover grayscale opacity-50"
						:alt="interactionCard.title"
					>
					<div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
				</div>

				<div class="container mx-auto px-6 relative z-10 py-16 md:py-24">
					<div class="max-w-5xl space-y-8">
						<div class="flex flex-wrap items-center gap-4 animate-fade-in">
							<span
								class="px-5 py-1.5 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
							>
								<Icon :name="interactionCard.icon" />
								DỊCH VỤ & KINH DOANH
							</span>
						</div>

						<div class="space-y-6 animate-slide-up">
							<h1
								class="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.1] text-white"
							>
								{{ interactionCard.title }}
							</h1>
							<p class="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
								{{ interactionCard.description }}
							</p>
						</div>
					</div>
				</div>
			</section>

			<main class="container mx-auto px-6 mt-4 md:mt-12">
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
					<article class="lg:col-span-8 lg:col-start-3 space-y-16">
						<div
							class="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-white prose-p:text-gray-400 prose-p:leading-relaxed font-sans prose-invert"
							v-html="interactionCard.content"
						/>

						<div
							class="pt-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
						>
							<div class="space-y-1">
								<h4
									class="font-black text-xs uppercase tracking-widest text-gray-500"
								>
									Chia sẻ công nghệ
								</h4>
								<p class="text-xs text-gray-400 font-medium">
									Lan tỏa công nghệ tiên tiến đến cộng đồng.
								</p>
							</div>
							<div class="flex flex-wrap gap-3">
								<button
									class="inline-flex items-center gap-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-[10px] uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95"
									aria-label="Chia sẻ lên Facebook"
									@click="shareOnFacebook"
								>
									<Icon name="ph:facebook-logo-fill" class="text-lg" />
									Facebook
								</button>
								<button
									class="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/10 hover:bg-red-600 text-white rounded-xl font-black text-[10px] uppercase tracking-wider transition-all duration-300 shadow-md active:scale-95"
									aria-label="Sao chép liên kết"
									@click="copyLink"
								>
									<Icon name="ph:link-bold" class="text-lg" />
									Sao chép liên kết
								</button>
							</div>
						</div>
					</article>
				</div>
			</main>
		</div>

		<div v-else class="container mx-auto px-6 py-32 text-center max-w-md">
			<div
				class="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-dashed border-white/20"
			>
				<Icon name="ph:warning-circle-fill" class="text-4xl text-gray-500" />
			</div>
			<h2
				class="text-2xl font-black text-white uppercase tracking-tight mb-2"
			>
				Không Tìm Thấy Nội Dung
			</h2>
			<p class="text-gray-500 text-sm font-medium mb-8">
				Công nghệ bạn yêu cầu không tồn tại hoặc đã bị xóa.
			</p>
			<NuxtLink
				to="/technology"
				class="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-colors shadow-xl"
			>
				<Icon name="ph:arrow-left-bold" />
				Quay lại trang Công nghệ
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped>
.animate-fade-in {
	animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
	animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes slideUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
