<script setup>

const layoutStore = useLayoutStore();
const footerData = computed(() => layoutStore.footerData);
</script>

<template>
	<footer
		v-if="footerData"
		class="bg-gradient-to-br from-gray-800 to-slate-800 text-white pt-16 pb-5"
	>
		<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
				<div class="footer-col">
					<h3 class="footer-heading">Thông Tin Liên Hệ</h3>
					<p class="contact-info-item">
						<ClientOnly>
							<Icon name="fa6-solid:location-dot" class="mr-2" />
						</ClientOnly>
						{{ footerData.contact.address }}
					</p>
					<p class="contact-info-item">
						<ClientOnly>
							<Icon name="fa6-solid:phone" class="mr-2" />
						</ClientOnly>
						{{ footerData.contact.phone }}
					</p>
					<p class="contact-info-item">
						<ClientOnly>
							<Icon name="fa6-solid:envelope" class="mr-2" />
						</ClientOnly>
						{{ footerData.contact.email }}
					</p>
					<div class="flex gap-4 mt-5">
						<RouterLink
							v-for="social in footerData.contact.socials"
							:key="social.name"
							:to="social.url"
							class="social-icon"
							:aria-label="`Theo dõi AnhEm Motor trên ${social.name}`"
						>
							<ClientOnly>
								<Icon :name="social.icon" />
							</ClientOnly>
						</RouterLink>
					</div>
				</div>

				<div
					v-for="section in footerData.sections"
					:key="section.title"
					class="footer-col"
				>
					<h3 class="footer-heading">{{ section.title }}</h3>
					<ul class="space-y-2">
						<li v-for="link in section.links" :key="link.name">
							<RouterLink :to="link.url" class="footer-link">{{
								link.name
							}}</RouterLink>
						</li>
					</ul>
				</div>
			</div>

			<div class="text-center pt-8 border-t border-white/10 text-white/60">
				<p>
					© 2025 AnhEm Motor. Mọi quyền được bảo lưu. | Thiết kế bởi AnhEm Team
				</p>
			</div>
		</div>
	</footer>
</template>

<style scoped>
@reference "../../assets/main.css";

.footer-heading {
	@apply text-red-500 mb-5 text-lg sm:text-xl font-bold;
}

.contact-info-item {
	@apply text-white/80 leading-relaxed text-sm sm:text-base mb-2;
}

.social-icon {
	@apply w-11 h-11 bg-red-500/20 flex items-center justify-center rounded-full text-white text-lg transition-all duration-300 ease-in-out hover:bg-red-500 hover:-translate-y-1;
}

.footer-link {
	@apply text-white/80 leading-loose transition-colors duration-300 ease-in-out hover:text-red-500;
}
</style>
