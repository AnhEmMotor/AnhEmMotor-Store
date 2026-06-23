import { recruitmentRepository } from "~/core/infrastructure/repositories/recruitment.repository"
import { createRecruitmentService } from "~/services/recruitment.service"

const recruitmentService = createRecruitmentService(recruitmentRepository)

/**
 * Application Layer - Recruitment Composable
 * Connects the UI to the Recruitment Service
 */
export function useRecruitment() {
	const jobs = ref([]);
	const faqs = ref([]);
	const isLoading = ref(false);
	const error = ref(null);

	const fetchJobs = async () => {
		isLoading.value = true;
		try {
			jobs.value = await recruitmentService.getJobs();
		} catch (e) {
			error.value = e;
		} finally {
			isLoading.value = false;
		}
	};

	const fetchFaqs = async () => {
		isLoading.value = true;
		try {
			faqs.value = await recruitmentService.getFaqs();
		} catch (e) {
			error.value = e;
		} finally {
			isLoading.value = false;
		}
	};

	const submitApplication = async (formData) => {
		isLoading.value = true;
		try {
			const response = await recruitmentService.submitApplication(formData);
			return response;
		} catch (e) {
			error.value = e;
			throw e;
		} finally {
			isLoading.value = false;
		}
	};

	const uploadCv = async (formData) => {
		isLoading.value = true;
		try {
			const response = await recruitmentService.uploadCv(formData);
			return response;
		} catch (e) {
			error.value = e;
			throw e;
		} finally {
			isLoading.value = false;
		}
	};

	return {
		jobs,
		faqs,
		isLoading,
		error,
		fetchJobs,
		fetchFaqs,
		submitApplication,
		uploadCv
	};
}

