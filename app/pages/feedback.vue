<script setup>
import { ref, reactive } from 'vue';


const router = useRouter();

const isSubmitting = ref(false);
const isSuccess = ref(false);

const categories = ['Chất lượng xe', 'Thái độ phục vụ', 'Bảo hành & Bảo dưỡng', 'Giá bán & Ưu đãi', 'Showroom', 'Website'];
const stats = [
	{ label: 'Khách hàng hài lòng', value: '98%' }, 
	{ label: 'Góp ý tích cực', value: '5,000+' }, 
	{ label: 'Thời gian xử lý', value: '24h' }
];

const form = reactive({ fullName: '', phone: '', email: '', subject: '', message: '', rating: 5 });

const getRatingIcon = (i) => ['ph:smiley-angry-fill', 'ph:smiley-sad-fill', 'ph:smiley-meh-fill', 'ph:smiley-fill', 'ph:smiley-wink-fill'][i - 1];
const getRatingLabel = (i) => ['Tệ', 'Chưa tốt', 'Bình thường', 'Tốt', 'Rất tốt'][i - 1];

const handleSubmit = async () => {
	if (!form.subject) return alert("Vui lòng chọn lĩnh vực.");
	isSubmitting.value = true;
	
	
	setTimeout(() => {
		isSubmitting.value = false;
		isSuccess.value = true;
		Object.assign(form, { fullName: '', phone: '', email: '', subject: '', message: '', rating: 5 });
	}, 1500);
};

useHead({ title: 'Đóng góp ý kiến | AnhEm Motor' });
</script>

<template>
	<div class="fb-page-container min-h-screen relative overflow-hidden flex flex-col bg-[#FDFDFD]">
		
		<div class="fb-bg-image">
			<img src="/premium_motorcycle_showroom_visit_1778827603878.png" alt="AnhEm Motor Showroom" class="fb-bg-img" >
			<div class="fb-bg-overlay"/>
			
			
			<div class="fb-glow fb-glow-1"/>
			<div class="fb-glow fb-glow-2"/>
			<div class="fb-glow fb-glow-3"/>
			<div class="fb-grid-pattern"/>
		</div>

		<div class="container mx-auto px-6 relative z-10 pt-24 pb-12 flex-grow">
			<div class="max-w-3xl mx-auto">
				
				<div class="text-center mb-6 fb-reveal">
					<div class="fb-badge">
						<Icon name="ph:shooting-star-fill" class="fb-text-red text-sm" />
						<span class="fb-badge-text">Cùng chúng tôi hoàn thiện</span>
					</div>
					<h1 class="fb-main-title">
						Đóng góp <span class="fb-text-red">ý kiến</span>
					</h1>
					<p class="fb-subtitle">
						Bạn muốn AnhEm Motor cải thiện điều gì? Mọi ý kiến của bạn là chìa khóa để chúng tôi nâng tầm dịch vụ mỗi ngày.
					</p>

					
					<div class="fb-trust-row">
						<div v-for="trust in ['Mọi góp ý đều được xem xét', 'Bảo mật thông tin khách hàng', 'Phản hồi trong vòng 24h']" :key="trust" class="fb-trust-item">
							<Icon name="ph:check-circle-fill" class="fb-text-red text-[14px]" />
							<span class="fb-trust-text">{{ trust }}</span>
						</div>
					</div>
				</div>

				<div class="fb-card">
					<div class="fb-card-highlight"/>

					<form class="fb-form-inner" @submit.prevent="handleSubmit">
						<div class="fb-rating-section">
							<label class="fb-label-small">Mức độ hài lòng của bạn</label>
							<div class="fb-emoji-grid">
								<button v-for="i in 5" :key="i" type="button" class="fb-emoji-btn" :class="{ 'active': form.rating === i }" @click="form.rating = i">
									<div class="fb-emoji-box">
										<Icon :name="getRatingIcon(i)" class="text-2xl" />
									</div>
									<span class="fb-emoji-label">{{ getRatingLabel(i) }}</span>
								</button>
							</div>
						</div>

						<div class="fb-field-group">
							<label class="fb-label-small">Lĩnh vực góp ý</label>
							<div class="fb-pill-grid">
								<button v-for="cat in categories" :key="cat" type="button" class="fb-pill" :class="{ 'active': form.subject === cat }" @click="form.subject = cat">
									{{ cat }}
								</button>
							</div>
						</div>

						<div class="fb-grid-2">
							<div class="fb-field">
								<label class="fb-label-small">Họ và tên</label>
								<div class="fb-input-box">
									<Icon name="ph:user-bold" class="fb-input-icon" />
									<input v-model="form.fullName" type="text" required placeholder="Nguyễn Văn A" class="fb-input">
								</div>
							</div>
							<div class="fb-field">
								<label class="fb-label-small">Số điện thoại</label>
								<div class="fb-input-box">
									<Icon name="ph:phone-bold" class="fb-input-icon" />
									<input v-model="form.phone" type="tel" required placeholder="09xxxxxx" class="fb-input">
								</div>
							</div>
						</div>

						<div class="fb-field">
							<label class="fb-label-small">Nội dung chia sẻ</label>
							<textarea v-model="form.message" required rows="5" placeholder="Mô tả chi tiết trải nghiệm của bạn..." class="fb-input fb-textarea"/>
						</div>

						<button type="submit" :disabled="isSubmitting" class="fb-submit-btn">
							<span v-if="!isSubmitting">Gửi đóng góp ngay</span>
							<Icon v-if="!isSubmitting" name="ph:paper-plane-tilt-fill" class="text-xl" />
							<Icon v-else name="svg-spinners:ring-resize" class="text-xl" />
						</button>
					</form>
				</div>

				
				<div class="fb-stats-grid">
					<div v-for="(stat, index) in stats" :key="stat.label" class="fb-stat-item" :class="{ 'fb-stat-divider': index < stats.length - 1 }">
						<p class="fb-stat-value">{{ stat.value }}</p>
						<p class="fb-stat-label">{{ stat.label }}</p>
					</div>
				</div>
			</div>
		</div>

		
		<div v-if="isSuccess" class="fb-modal-overlay">
			<div class="fb-modal-content">
				<div class="fb-success-icon-box">
					<Icon name="ph:heart-fill" class="text-5xl" />
				</div>
				<h2 class="fb-modal-title">Cảm ơn bạn!</h2>
				<p class="fb-modal-desc">Ý kiến của bạn đã được ghi nhận ❤️</p>
				<button class="fb-modal-btn" @click="isSuccess = false; router.push('/')">Về trang chủ</button>
			</div>
		</div>
	</div>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap');


.fb-page-container, .fb-page-container * { font-family: 'Manrope', sans-serif; }
.fb-bg-image {
	position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; background: #f8fafc;
}
.fb-bg-img {
	position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center top;
	filter: saturate(1.12) contrast(1.02); opacity: 0.58; transform: none;
}
.fb-bg-overlay {
	position: absolute; inset: 0;
	background:
		radial-gradient(ellipse at 50% 18%, rgba(253, 253, 253, 0.94) 0%, rgba(253, 253, 253, 0.82) 28%, rgba(253, 253, 253, 0.35) 66%, rgba(253, 253, 253, 0.18) 100%),
		linear-gradient(to bottom, rgba(253, 253, 253, 0.46) 0%, rgba(253, 253, 253, 0.18) 46%, rgba(253, 253, 253, 0.86) 100%);
}
.fb-glow {
	position: absolute; border-radius: 9999px; filter: blur(80px); opacity: 0.4; z-index: 1; pointer-events: none;
}
.fb-glow-1 {
	width: 400px; height: 400px; background: rgba(227, 24, 55, 0.15); top: -100px; right: -100px;
	animation: fbFloat 15s infinite alternate ease-in-out;
}
.fb-glow-2 {
	width: 300px; height: 300px; background: rgba(227, 24, 55, 0.1); bottom: 10%; left: -50px;
	animation: fbFloat 20s infinite alternate-reverse ease-in-out;
}
.fb-glow-3 {
	width: 250px; height: 250px; background: rgba(3, 7, 18, 0.05); top: 40%; right: 10%;
	animation: fbFloat 12s infinite alternate ease-in-out;
}
.fb-grid-pattern {
	position: absolute; inset: 0; z-index: 2; opacity: 0.03; pointer-events: none;
	background-image: radial-gradient(#030712 0.5px, transparent 0.5px);
	background-size: 24px 24px;
}
@keyframes fbFloat {
	0% { transform: translate(0, 0) rotate(0deg); }
	100% { transform: translate(40px, 60px) rotate(15deg); }
}
.fb-text-red { color: #E31837; }
.fb-badge {
	display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.375rem 1rem;
	background: #fff; border: 1px solid #fee2e2; border-radius: 9999px; margin-bottom: 1.5rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.fb-badge-text { font-size: 10px; font-weight: 900; color: #E31837; text-transform: uppercase; letter-spacing: 0.2em; }
.fb-main-title { font-size: 32px; font-weight: 1000; color: #030712; text-transform: uppercase; font-style: italic; line-height: 1; margin-bottom: 1.25rem; letter-spacing: -0.05em; }
@media (min-width: 768px) { .fb-main-title { font-size: 42px; } }
.fb-subtitle { font-size: 15px; color: #6b7280; max-width: 480px; margin: 0 auto; line-height: 1.6; font-weight: 500; }
.fb-trust-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 1.5rem; margin-top: 1.25rem; opacity: 0.7; }
.fb-trust-item { display: flex; align-items: center; gap: 0.5rem; }
.fb-trust-text { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #4b5563; font-weight: 700; }


.fb-card {
	background: #fcfcfc; border-radius: 28px; border: 1px solid #e5e7eb; overflow: hidden; position: relative;
	box-shadow: 0 20px 60px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
}
.fb-card-highlight { position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: linear-gradient(to right, transparent, rgba(227, 24, 55, 0.2), transparent); }
.fb-form-inner { padding: 1.75rem; display: flex; flex-direction: column; gap: 2rem; }
@media (min-width: 768px) { .fb-form-inner { padding: 2.5rem; } }

.fb-label-small { font-size: 10px; font-weight: 800; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.15em; padding-left: 0.2rem; display: block; margin-bottom: 0.4rem; }


.fb-rating-section { text-align: center; border-bottom: 1px solid #f3f4f6; padding-bottom: 2rem; }
.fb-emoji-grid { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-top: 1.25rem; }
.fb-emoji-btn { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; transition: all 0.3s; cursor: pointer; background: none; border: none; padding: 0.25rem; }
.fb-emoji-box { width: 50px; height: 50px; border-radius: 14px; background: #f3f4f6; color: #9ca3af; display: flex; align-items: center; justify-content: center; transition: all 0.3s; font-size: 22px; }
.fb-emoji-btn:hover .fb-emoji-box { background: #fff2f2; color: #E31837; transform: scale(1.08); box-shadow: 0 6px 16px rgba(227,24,55,0.12); border: 1px solid #fecaca; }
.fb-emoji-btn.active .fb-emoji-box { background: #E31837; color: #fff; transform: scale(1.1); box-shadow: 0 8px 20px rgba(227,24,55,0.25); }
.fb-emoji-label { font-size: 10px; font-weight: 600; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.04em; }
.fb-emoji-btn.active .fb-emoji-label { color: #E31837; font-weight: 800; }


.fb-pill-grid { display: flex; flex-wrap: wrap; gap: 0.625rem; margin-top: 0.75rem; }
.fb-pill { padding: 0.625rem 1.25rem; border-radius: 999px; font-size: 13px; font-weight: 600; transition: all 0.25s; border: 1.5px solid #e5e7eb; background: #fff; color: #6b7280; cursor: pointer; }
.fb-pill:hover { background: #f9fafb; border-color: #d1d5db; color: #374151; }
.fb-pill.active { background: #fff2f2; border-color: #E31837; color: #E31837; font-weight: 800; }

.fb-grid-2 { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
@media (min-width: 768px) { .fb-grid-2 { grid-template-columns: 1fr 1fr; } }
.fb-field { display: flex; flex-direction: column; }
.fb-input-box { position: relative; }
.fb-input-icon { position: absolute; left: 1.25rem; top: 50%; transform: translateY(-50%); color: #9ca3af; transition: color 0.3s; }


.fb-input { width: 100%; height: 50px; background: #fff; border: 1.5px solid #e5e7eb; border-radius: 14px; padding-left: 3rem; padding-right: 1.25rem; font-size: 13.5px; font-weight: 600; color: #111827; outline: none; transition: all 0.25s; font-family: 'Manrope', sans-serif; }
.fb-input::placeholder { color: #d1d5db; font-weight: 400; }
.fb-textarea { height: auto; padding-top: 1rem; min-height: 140px; padding-left: 1.25rem; }
.fb-input-box:focus-within .fb-input-icon { color: #E31837; }
.fb-input:focus { border-color: #E31837; box-shadow: 0 0 0 3px rgba(227,24,55,0.08); }


.fb-submit-btn {
	width: 100%; padding: 1.25rem; background: linear-gradient(135deg, #FF2D55 0%, #E31837 100%);
	color: #fff; font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 0.3em; border-radius: 16px; border: none;
	display: flex; align-items: center; justify-content: center; gap: 0.75rem; transition: all 0.4s; cursor: pointer;
	box-shadow: 0 8px 24px rgba(227,24,55,0.2);
}
.fb-submit-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(227,24,55,0.28); }


.fb-stats-grid { margin-top: 2rem; display: grid; grid-template-columns: 1fr 1fr; text-align: center; background: #fff; border-radius: 20px; border: 1px solid #e5e7eb; overflow: hidden; }
@media (min-width: 768px) { .fb-stats-grid { grid-template-columns: 1fr 1fr 1fr; } }
.fb-stat-item { padding: 1.75rem 1rem; position: relative; }
.fb-stat-divider::after { content: ''; position: absolute; right: 0; top: 20%; height: 60%; width: 1px; background: #e5e7eb; }
.fb-stat-value { font-size: 32px; font-weight: 900; color: #111827; font-style: italic; line-height: 1; margin-bottom: 0.25rem; }
.fb-stat-label { font-size: 10px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.12em; }

.fb-modal-overlay { position: fixed; inset: 0; z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 1.5rem; background: rgba(3, 7, 18, 0.4); backdrop-filter: blur(12px); }
.fb-modal-content { background: #fff; border-radius: 40px; padding: 2.5rem; text-align: center; max-width: 28rem; width: 100%; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 1px solid rgba(227, 24, 55, 0.1); }
.fb-success-icon-box { width: 6rem; height: 6rem; background: #E31837; color: #fff; border-radius: 9999px; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; box-shadow: 0 10px 20px rgba(227, 24, 55, 0.3); }
.fb-modal-title { font-size: 28px; font-weight: 900; color: #030712; text-transform: uppercase; font-style: italic; margin-bottom: 0.75rem; }
.fb-modal-desc { color: #6b7280; margin-bottom: 2.5rem; line-height: 1.6; font-weight: 500; }
.fb-modal-btn { width: 100%; padding: 1.25rem; background: #030712; color: #fff; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; border-radius: 1rem; border: none; cursor: pointer; transition: all 0.3s; }
.fb-modal-btn:hover { background: #E31837; }

.fb-reveal { animation: fbReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fbReveal { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }




@media (max-width: 640px) {
	
	.fb-page-container .container { padding-top: 5rem !important; padding-bottom: 2rem !important; }

	
	.fb-main-title { font-size: 28px; letter-spacing: -0.03em; margin-bottom: 1rem; }
	
	
	.fb-subtitle { font-size: 14px; line-height: 1.6; }

	
	.fb-badge { margin-bottom: 1rem; padding: 0.3rem 0.875rem; }

	
	.fb-trust-row { flex-direction: column; align-items: flex-start; gap: 0.625rem; margin-top: 1.25rem; padding: 1rem 1.25rem; background: #f9fafb; border-radius: 16px; }
	.fb-trust-item { width: 100%; }
	.fb-trust-text { font-size: 12px; }

	
	.fb-card { border-radius: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.06); }

	
	.fb-form-inner { padding: 1.25rem; gap: 2rem; }

	
	.fb-emoji-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.375rem; width: 100%; justify-items: center; }
	.fb-emoji-btn { flex: unset; min-width: unset; width: 100%; }
	.fb-emoji-box { width: 100%; height: 52px; border-radius: 12px; font-size: 20px; }
	.fb-emoji-label { font-size: 8px; letter-spacing: 0; white-space: nowrap; }

	
	.fb-pill { padding: 0.5rem 0.875rem; font-size: 12px; }

	
	.fb-grid-2 { grid-template-columns: 1fr; gap: 1rem; }
	.fb-input { height: 52px; font-size: 15px; border-radius: 14px; }
	.fb-textarea { min-height: 120px; }

	
	.fb-submit-btn { padding: 1rem; font-size: 13px; letter-spacing: 0.2em; border-radius: 14px; }

	
	.fb-stats-grid { grid-template-columns: 1fr 1fr; border-radius: 16px; }
	.fb-stat-item { padding: 1.25rem 0.75rem; }
	.fb-stat-value { font-size: 28px; }
	.fb-stat-label { font-size: 9px; }
	.fb-stat-divider::after { display: none; }

	
	.fb-modal-content { border-radius: 28px; padding: 2rem 1.5rem; }
	.fb-success-icon-box { width: 5rem; height: 5rem; margin-bottom: 1.5rem; }
	.fb-modal-title { font-size: 22px; }
	.fb-modal-desc { font-size: 14px; margin-bottom: 1.5rem; }
}
</style>
