<script setup>
useSeoMeta({
	title: "Liên hệ | AnhEm Motor",
	description:
		"Liên hệ với AnhEm Motor để được tư vấn về xe máy, phụ tùng và dịch vụ bảo dưỡng.",
});
</script>

<template>
	<div class="main-container">
		<div class="form-wrapper">
			<ContactInfo />
			<ContactForm />
		</div>
	</div>
</template>

<style scoped>
.main-container {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 40px 20px;
}

.form-wrapper {
	background: #fff;
	border-radius: 20px;
	box-shadow: 0 20px 40px rgba(226, 88, 88, 0.2);
	overflow: hidden;
	max-width: 900px;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	min-height: 600px;
	animation: slideUp 0.6s ease-out;
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

@media (max-width: 768px) {
	.form-wrapper {
		grid-template-columns: 1fr;
		margin: 0;
	}
}
</style>

