import { ref, computed, watch, onMounted } from "vue";

export function useMortgage() {
	const bikePrice = ref(50000000);
	const downPaymentPercent = ref(30);
	const loanTermMonths = ref(12);
	const interestRate = 0.0079;

	const downPaymentValue = computed(
		() => (bikePrice.value * downPaymentPercent.value) / 100,
	);
	const loanAmount = computed(() => bikePrice.value - downPaymentValue.value);

	const rawMonthlyPayment = computed(() => {
		const totalInterest =
			loanAmount.value * interestRate * loanTermMonths.value;
		return Math.round(
			(loanAmount.value + totalInterest) / loanTermMonths.value,
		);
	});

	const animatedPayment = ref(0);
	let animationFrame;

	const animateValue = (start, end, duration) => {
		const startTime = performance.now();
		const update = (currentTime) => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
			animatedPayment.value = Math.floor(start + (end - start) * easeProgress);

			if (progress < 1) {
				animationFrame = requestAnimationFrame(update);
			}
		};
		animationFrame = requestAnimationFrame(update);
	};

	watch(rawMonthlyPayment, (newVal, oldVal) => {
		if (animationFrame) cancelAnimationFrame(animationFrame);
		animateValue(oldVal || 0, newVal, 500);
	});

	onMounted(() => {
		animateValue(0, rawMonthlyPayment.value, 800);
	});

	return {
		bikePrice,
		downPaymentPercent,
		loanTermMonths,
		downPaymentValue,
		loanAmount,
		rawMonthlyPayment,
		animatedPayment,
	};
}
