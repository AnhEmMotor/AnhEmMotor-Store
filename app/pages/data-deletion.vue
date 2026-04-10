<script setup>
useSeoMeta({
	title: "Hướng dẫn xóa dữ liệu - AnhEm Motor",
	description: "Quy trình yêu cầu xóa dữ liệu cá nhân tại AnhEm Motor.",
});

const deletionMethods = [
	{
		title: "Cách 1: Liên hệ bộ phận hỗ trợ (Khuyên dùng)",
		description:
			"Gửi email yêu cầu xóa dữ liệu đến hòm thư hỗ trợ của chúng tôi.",
		details:
			"Email: hoctap.tranthanhbinh@gmail.com. Tiêu đề: [Yêu cầu xóa dữ liệu] - Họ tên của bạn.",
	},
	{
		title: "Cách 2: Sử dụng trang Dashboard Facebook",
		description:
			"Nếu bạn đã đăng nhập bằng Facebook, bạn có thể gỡ bỏ quyền truy cập ứng dụng trực tiếp từ Facebook.",
		steps: [
			"Vào phần Cài đặt & Quyền riêng tư của tài khoản Facebook.",
			"Chọn 'Cài đặt'.",
			"Tìm mục 'Ứng dụng và trang web'.",
			"Tìm 'AnhEm Motor' và chọn 'Gỡ'.",
			"Chọn 'Gỡ' một lần nữa để xác nhận.",
		],
	},
];
</script>

<template>
	<div class="data-deletion-container container mx-auto px-4 py-12 max-w-4xl">
		<div
			class="bg-white shadow-sm border border-slate-100 rounded-2xl p-8 md:p-12"
		>
			<h1
				class="text-3xl md:text-4xl font-bold text-slate-900 mb-8 border-b pb-4"
			>
				Hướng dẫn xóa dữ liệu cá nhân
			</h1>

			<p class="text-slate-500 mb-8 leading-relaxed">
				Tại <strong>AnhEm Motor</strong>, chúng tôi đánh giá cao quyền riêng tư
				và quyền kiểm soát dữ liệu cá nhân của bạn. Dưới đây là quy trình chi
				tiết để yêu cầu xóa dữ liệu mà chúng tôi đã thu thập từ tài khoản của
				bạn.
			</p>

			<section class="mb-10">
				<h2 class="text-xl font-semibold text-slate-800 mb-4">
					1. Các loại dữ liệu sẽ bị xóa
				</h2>
				<p class="text-slate-600 leading-relaxed mb-4">
					Khi yêu cầu xóa dữ liệu được thực hiện thành công, các thông tin sau
					sẽ bị gỡ bỏ vĩnh viễn khỏi hệ thống của chúng tôi:
				</p>
				<ul class="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
					<li class="flex items-center text-slate-600">
						<span class="w-1.5 h-1.5 bg-red-400 rounded-full mr-2" />
						Hồ sơ người dùng (Tên, Email, SĐT)
					</li>
					<li class="flex items-center text-slate-600">
						<span class="w-1.5 h-1.5 bg-red-400 rounded-full mr-2" />
						Liên kết tài khoản Social (Google/Facebook)
					</li>
					<li class="flex items-center text-slate-600">
						<span class="w-1.5 h-1.5 bg-red-400 rounded-full mr-2" />
						Lịch sử truy cập và sở thích
					</li>
					<li class="flex items-center text-slate-600">
						<span class="w-1.5 h-1.5 bg-red-400 rounded-full mr-2" />
						Ảnh đại diện và các cấu hình cá nhân
					</li>
				</ul>
				<p class="text-amber-600 text-sm mt-4 italic font-medium">
					* Lưu ý: Các dữ liệu liên quan đến hóa đơn tài chính và giao dịch đã
					thực hiện sẽ được lưu giữ tối thiểu theo quy định của pháp luật về kế
					toán và thuế.
				</p>
			</section>

			<section class="mb-10">
				<h2 class="text-xl font-semibold text-slate-800 mb-6">
					2. Hướng dẫn thực hiện yêu cầu xóa
				</h2>
				<div class="space-y-6">
					<div
						v-for="(method, index) in deletionMethods"
						:key="index"
						class="border border-slate-100 rounded-xl p-6 bg-slate-50"
					>
						<h3 class="font-bold text-slate-900 mb-2">{{ method.title }}</h3>
						<p class="text-slate-600 text-sm mb-4 leading-relaxed">
							{{ method.description }}
						</p>

						<div
							v-if="method.details"
							class="bg-white p-4 rounded border border-slate-200 text-slate-700 font-medium text-sm"
						>
							{{ method.details }}
						</div>

						<ol v-if="method.steps" class="space-y-2">
							<li
								v-for="(step, sIndex) in method.steps"
								:key="sIndex"
								class="flex items-start text-sm text-slate-600"
							>
								<span class="font-bold text-blue-500 mr-2"
									>{{ sIndex + 1 }}.</span
								>
								{{ step }}
							</li>
						</ol>
					</div>
				</div>
			</section>

			<section class="mb-10">
				<h2 class="text-xl font-semibold text-slate-800 mb-4">
					3. Thời gian xử lý
				</h2>
				<p class="text-slate-600 leading-relaxed">
					Sau khi nhận được yêu cầu của bạn qua email, bộ phận kỹ thuật của
					chúng tôi sẽ tiến hành xác minh danh tính và thực hiện xóa dữ liệu
					trong vòng <strong>48 giờ làm việc</strong>. Một email xác nhận sẽ
					được gửi đến bạn sau khi quy trình hoàn tất.
				</p>
			</section>

			<section class="bg-blue-50 p-6 rounded-xl border border-blue-100">
				<h2 class="text-lg font-semibold text-blue-900 mb-2">
					Quyền được quên của bạn
				</h2>
				<p class="text-blue-800 text-sm leading-relaxed">
					Chúng tôi cam kết tuân thủ các quy định về bảo vệ dữ liệu cá nhân
					(GDPR và các luật liên quan tại Việt Nam). Nếu bạn có bất kỳ thắc mắc
					nào khác, vui lòng liên hệ trực tiếp với chúng tôi.
				</p>
			</section>
		</div>
	</div>
</template>

<style scoped>
@reference "../assets/main.css";

.data-deletion-container {
	@apply min-h-screen font-sans;
}
</style>
