<script setup>
useSeoMeta({
	title: "Điều khoản dịch vụ - AnhEm Motor",
	description:
		"Cập nhật các điều khoản và điều kiện khi sử dụng dịch vụ tại AnhEm Motor.",
});

const currentYear = new Date().getFullYear();
</script>

<template>
	<div class="terms-container container mx-auto px-4 py-12 max-w-4xl">
		<div
			class="bg-white shadow-sm border border-slate-100 rounded-2xl p-8 md:p-12"
		>
			<h1
				class="text-3xl md:text-4xl font-bold text-slate-900 mb-8 border-b pb-4"
			>
				Điều khoản dịch vụ
			</h1>

			<p class="text-slate-500 mb-8">Cập nhật lần cuối: {{ currentYear }}</p>

			<section class="mb-10">
				<h2 class="text-xl font-semibold text-slate-800 mb-4">
					1. Chấp nhận các điều khoản
				</h2>
				<p class="text-slate-600 leading-relaxed">
					Bằng cách truy cập và sử dụng website <strong>AnhEm Motor</strong>,
					bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện
					này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này,
					vui lòng không sử dụng dịch vụ của chúng tôi.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-xl font-semibold text-slate-800 mb-4">
					2. Tài khoản người dùng
				</h2>
				<p class="text-slate-600 leading-relaxed mb-4">
					Khi bạn tạo tài khoản tại hệ thống của chúng tôi (bao gồm cả việc sử
					dụng Google/Facebook Login), bạn cam kết:
				</p>
				<ul class="list-disc list-inside space-y-2 text-slate-600 ml-4">
					<li>Cung cấp thông tin chính xác, đầy đủ và cập nhật.</li>
					<li>
						Bảo mật thông tin đăng nhập và chịu trách nhiệm cho mọi hoạt động
						dưới tài khoản của mình.
					</li>
					<li>
						Thông báo ngay lập tức cho chúng tôi nếu phát hiện bất kỳ hành vi sử
						dụng trái phép tài khoản nào.
					</li>
				</ul>
			</section>

			<section class="mb-10">
				<h2 class="text-xl font-semibold text-slate-800 mb-4">
					3. Quyền sở hữu trí tuệ
				</h2>
				<p class="text-slate-600 leading-relaxed">
					Tất cả nội dung trên website này bao gồm văn bản, hình ảnh, logo, đồ
					họa và mã nguồn đều thuộc sở hữu của <strong>AnhEm Motor</strong> và
					được bảo vệ bởi luật bản quyền. Bạn không được phép sao chép, phân
					phối hoặc sử dụng cho mục đích thương mại mà không có sự đồng ý bằng
					văn bản của chúng tôi.
				</p>
			</section>

			<section
				class="mb-10 bg-slate-50 p-6 rounded-xl border-l-4 border-blue-500"
			>
				<h2 class="text-xl font-semibold text-slate-800 mb-4">
					4. Dịch vụ và Thanh toán
				</h2>
				<p class="text-slate-600 leading-relaxed mb-4">
					Chúng tôi luôn cố gắng cung cấp thông tin sản phẩm và giá cả chính xác
					nhất. Tuy nhiên, sai sót có thể xảy ra.
				</p>
				<ul class="list-disc list-inside space-y-2 text-slate-600 ml-4">
					<li>
						Chúng tôi có quyền từ chối hoặc hủy đơn hàng vì các lý do như: lỗi
						giá sản phẩm, thiếu hàng, hoặc nghi ngờ gian lận.
					</li>
					<li>
						Các phương thức thanh toán được chấp nhận sẽ được hiển thị rõ ràng
						tại trang thanh toán.
					</li>
				</ul>
			</section>

			<section class="mb-10">
				<h2 class="text-xl font-semibold text-slate-800 mb-4">
					5. Giới hạn trách nhiệm
				</h2>
				<p class="text-slate-600 leading-relaxed">
					<strong>AnhEm Motor</strong> không chịu trách nhiệm cho bất kỳ thiệt
					hại gián tiếp, ngẫu nhiên hoặc do hệ quả nào phát sinh từ việc sử dụng
					hoặc không thể sử dụng website này.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-xl font-semibold text-slate-800 mb-4">
					6. Thay đổi điều khoản
				</h2>
				<p class="text-slate-600 leading-relaxed">
					Chúng tôi có quyền thay đổi các điều khoản này bất kỳ lúc nào mà không
					cần thông báo trước. Các thay đổi sẽ có hiệu lực ngay khi được đăng
					tải trên website.
				</p>
			</section>

			<section>
				<h2 class="text-xl font-semibold text-slate-800 mb-4">
					7. Luật áp dụng
				</h2>
				<p class="text-slate-600 leading-relaxed">
					Các điều khoản này được điều chỉnh và giải thích theo pháp luật của
					nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
				</p>
			</section>
		</div>
	</div>
</template>

<style scoped>
@reference "../assets/main.css";

.terms-container {
	@apply min-h-screen font-sans;
}
</style>
