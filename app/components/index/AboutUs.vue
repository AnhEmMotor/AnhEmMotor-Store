<template>
	<section id="about" class="about-section">
		<div class="container">
			<div class="about-content">
				<div class="about-image group">
					<img
						src="/assets/image/index/about.webp"
						alt="Về AnhEm Motor"
						width="380"
						height="214"
						loading="lazy"
					>
				</div>

				<div class="about-text">
					<h2>Về AnhEm Motor</h2>
					<p>
						AnhEm Motor là đại lý uy tín chuyên cung cấp xe máy chính hãng từ
						các thương hiệu hàng đầu.
					</p>

					<ul class="feature-list">
						<li>
							<i class="fas fa-check-circle text-red-500" />
							Bảo hành toàn quốc
						</li>
						<li>
							<i class="fas fa-check-circle text-red-500" />
							Dịch vụ hậu mãi chuyên nghiệp
						</li>
						<li>
							<i class="fas fa-check-circle text-red-500" />
							Giá cả cạnh tranh
						</li>
					</ul>

					<p>
						Chúng tôi cam kết mang đến trải nghiệm tuyệt vời với sản phẩm chất
						lượng và dịch vụ tận tâm.
					</p>

					<a
						href="#"
						class="cta-button"
						aria-label="Liên hệ ngay với AnhEm Motor"
						>Liên hệ ngay</a
					>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="css" scoped>
@reference '../../assets/main.css';
.container {
	@apply max-w-7xl mx-auto px-4 sm:px-6 md:px-8;
}

.about-section {
	@apply py-10 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-rose-100;
}

.about-content {
	@apply grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center;
}

.about-image {
	@apply relative rounded-2xl overflow-hidden shadow-xl;
}

.about-image img {
	@apply w-full aspect-[16/9] object-cover;
}

.about-text h2 {
	@apply text-3xl sm:text-4xl font-bold text-rose-600 mb-6;
}

.about-text p {
	@apply text-base sm:text-lg text-gray-700 leading-relaxed mb-5 sm:mb-7;
}

.feature-list {
	@apply list-none space-y-3 mb-5 sm:mb-7;
}

.feature-list li {
	@apply flex items-center gap-4 text-base sm:text-lg font-semibold text-gray-800;
}

.icon-check {
	@apply w-6 h-6 text-rose-600;
}

.cta-button {
	@apply inline-block bg-red-600 text-white font-bold py-2.5 px-6 sm:py-3 sm:px-8 rounded-full shadow-lg hover:bg-red-700 text-sm sm:text-base;
}
</style>
