<script setup>
defineProps({
	relatedNews: {
		type: Array,
		required: true,
	},
	title: {
		type: String,
		default: "Tin Nổi Bật",
	},
});

// News categories for the sidebar
const newsCategories = [
	{ name: "ĐÁNH GIÁ XE", slug: "danh-gia-xe", count: 15 },
	{ name: "TIN KHUYẾN MÃI", slug: "tin-khuyen-mai", count: 8 },
	{ name: "KINH NGHIỆM LÁI XE", slug: "kinh-nghiem-lai-xe", count: 12 },
	{ name: "TIN CÔNG NGHỆ", slug: "tin-cong-nghe", count: 6 },
	{ name: "SỰ KIỆN", slug: "su-kien", count: 10 },
];
</script>

<template>
	<aside class="space-y-12 font-['Manrope']">
		<!-- Widget 1: Bài viết nổi bật (Featured/Related News) -->
		<div class="space-y-8">
			<!-- Sidebar Header with Sleek Accent Line -->
			<div class="border-b border-gray-100 pb-4">
				<h2 class="text-xl font-black text-gray-950 uppercase tracking-tighter flex items-center gap-3">
					<span class="w-1.5 h-6 bg-red-600 rounded-full"/>
					{{ title }}
				</h2>
			</div>

			<!-- Related News List -->
			<div class="space-y-6">
				<NuxtLink
					v-for="newsItem in relatedNews"
					:key="newsItem.id"
					:to="`/news/${newsItem.slug}`"
					class="group flex gap-4 p-3 bg-white hover:bg-gray-50/50 rounded-2xl border border-gray-100/80 hover:border-red-100 hover:shadow-[0_15px_30px_rgba(230,0,35,0.04)] transition-all duration-500"
				>
					<!-- Thumbnail -->
					<div class="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
						<img
							:src="newsItem.image"
							:alt="newsItem.title"
							class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
						>
					</div>

					<!-- Details -->
					<div class="flex flex-col justify-between py-1 flex-1">
						<div class="space-y-1">
							<!-- Metadata -->
							<div class="flex items-center gap-2">
								<span class="text-[9px] font-black text-red-600 uppercase tracking-wider">
									{{ newsItem.category?.name || newsItem.category || 'Sự kiện' }}
								</span>
								<span class="text-[9px] font-bold text-gray-400">•</span>
								<span class="text-[9px] font-black text-gray-400 uppercase tracking-wider">
									{{ newsItem.date || 'Mới nhất' }}
								</span>
							</div>

							<!-- Title -->
							<h3 class="font-black text-xs uppercase tracking-tight text-gray-950 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight">
								{{ newsItem.title }}
							</h3>
						</div>

						<!-- Micro link action -->
						<span class="text-[8px] font-black uppercase tracking-widest text-gray-400 group-hover:text-red-600 transition-colors flex items-center gap-1.5 pt-1">
							Đọc ngay
							<Icon name="ph:arrow-right-bold" class="text-[10px] group-hover:translate-x-1 transition-transform" />
						</span>
					</div>
				</NuxtLink>
			</div>
		</div>

		<!-- Widget 2: Danh mục (Categories) -->
		<div class="space-y-6">
			<div class="border-b border-gray-100 pb-4">
				<h2 class="text-xl font-black text-gray-950 uppercase tracking-tighter flex items-center gap-3">
					<span class="w-1.5 h-6 bg-red-600 rounded-full"/>
					Danh mục
				</h2>
			</div>
			<div class="space-y-3">
				<NuxtLink
					v-for="cat in newsCategories"
					:key="cat.slug"
					:to="`/news?category=${cat.slug}`"
					class="group flex items-center justify-between p-4 bg-gray-50 hover:bg-red-50 rounded-xl border border-gray-100 hover:border-red-200 transition-all duration-300"
				>
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100 group-hover:border-red-200 transition-colors">
							<Icon name="ph:folder-fill" class="text-gray-600 group-hover:text-red-600 text-lg transition-colors" />
						</div>
						<span class="font-bold text-sm text-gray-950 group-hover:text-red-600 transition-colors">{{ cat.name }}</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="text-xs font-black text-gray-400">{{ cat.count }}</span>
						<Icon name="ph:arrow-right-bold" class="text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all text-sm" />
					</div>
				</NuxtLink>
			</div>
		</div>

		<!-- Widget 3: Form đăng ký (Newsletter) -->
		<div class="relative p-8 bg-gray-950 rounded-[2.5rem] overflow-hidden text-white border border-white/5 shadow-2xl">
			<!-- Neon Glow Background -->
			<div class="absolute -right-20 -bottom-20 w-48 h-48 bg-red-600/10 blur-[60px] rounded-full"/>

			<div class="relative z-10 space-y-6">
				<div class="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
					<Icon name="ph:paper-plane-tilt-fill" class="text-red-500 text-xs" />
					<span class="text-[9px] font-black uppercase tracking-widest">Bản tin độc quyền</span>
				</div>

				<div class="space-y-2">
					<h4 class="text-xl font-black uppercase tracking-tighter">Đăng ký nhận <br ><span class="text-red-500 italic">ưu đãi sớm</span></h4>
					<p class="text-xs text-gray-400 font-medium leading-relaxed">Cập nhật nhanh nhất các tin tức xe mới, sự kiện lái thử và khuyến mãi độc quyền từ AnhEm Motor.</p>
				</div>

				<form class="space-y-3" @submit.prevent>
					<div class="relative">
						<input
							type="email"
							placeholder="Email của bạn..."
							class="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-all font-medium"
						>
					</div>
					<button
						type="submit"
						class="w-full py-3.5 bg-red-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20 active:scale-95"
					>
						Đăng ký ngay
					</button>
				</form>
			</div>
		</div>

		<!-- Widget 4: CTA Tư vấn mua xe -->
		<div class="relative p-8 bg-gradient-to-br from-red-600 to-red-700 rounded-[2.5rem] overflow-hidden text-white shadow-2xl">
			<!-- Decorative Elements -->
			<div class="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"/>
			<div class="absolute -bottom-10 -left-10 w-24 h-24 bg-black/10 rounded-full blur-xl"/>

			<div class="relative z-10 space-y-6 text-center">
				<div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-white/20">
					<Icon name="ph:chat-circle-dots-fill" class="text-white text-sm" />
					<span class="text-[10px] font-black uppercase tracking-widest">Hỗ trợ 24/7</span>
				</div>

				<div class="space-y-2">
					<h4 class="text-2xl font-black uppercase tracking-tighter leading-tight">
						Cần tư vấn<br>mua xe?
					</h4>
					<p class="text-sm font-medium leading-relaxed opacity-90">
						Đội ngũ chuyên gia của AnhEm luôn sẵn sàng hỗ trợ bạn chọn mẫu xe phù hợp nhất với nhu cầu và ngân sách.
					</p>
				</div>

				<div class="space-y-3 pt-2">
					<a
						href="tel:0909123456"
						class="group flex items-center justify-center gap-3 w-full py-4 bg-white text-red-600 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-gray-100 transition-all shadow-lg active:scale-95"
					>
						<Icon name="ph:phone-fill" class="text-lg group-hover:rotate-12 transition-transform" />
						Gọi ngay: 0909.123.456
					</a>
					<NuxtLink
						to="/test-ride"
						class="group flex items-center justify-center gap-3 w-full py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-red-600 transition-all"
					>
						<Icon name="ph:arrow-right-fill" class="text-lg group-hover:translate-x-1 transition-transform" />
						Đăng ký lái thử
					</NuxtLink>
				</div>
			</div>
		</div>
	</aside>
</template>
