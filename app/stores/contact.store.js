import { defineStore } from 'pinia';

export const useContactStore = defineStore('contact', {
  state: () => ({
    isSubmitting: false,
    statusMessage: '',
    statusType: '',
    trackingAccess: null,
    trackingRequest: null,
    trackingLoading: false,
    ratingSubmitting: false,
  }),

  actions: {
    async submitContact(formData) {
      const service = contactService;

      this.isSubmitting = true;
      this.statusMessage = '';

      try {
        const data = await service.submitContact(formData);

        if (data.success) {
          this.statusType = 'success';
          this.statusMessage = '🎉 Gửi liên hệ thành công! Chúng tôi sẽ sớm liên hệ với bạn.';
          this.trackingAccess = {
            id: data.id,
            trackingToken: data.trackingToken,
          };
          if (import.meta.client) {
            localStorage.setItem('anhem-support-tracking', JSON.stringify(this.trackingAccess));
          }
          await this.fetchTracking();
          return data;
        } else {
          this.statusType = 'error';
          this.statusMessage = data.message || 'Có lỗi xảy ra khi gửi liên hệ.';
          return null;
        }
      } catch {
        this.statusType = 'error';
        this.statusMessage = 'Không thể kết nối tới máy chủ. Vui lòng thử lại sau!';
        return null;
      } finally {
        this.isSubmitting = false;
        if (this.statusType === 'success') {
          setTimeout(() => {
            this.statusMessage = '';
          }, 5000);
        }
      }
    },
    restoreTracking() {
      if (!import.meta.client) return;
      const stored = localStorage.getItem('anhem-support-tracking');
      if (!stored) return;
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.id && parsed?.trackingToken) {
          this.trackingAccess = parsed;
          this.fetchTracking();
        }
      } catch {
        localStorage.removeItem('anhem-support-tracking');
      }
    },
    async fetchTracking() {
      if (!this.trackingAccess) return null;
      this.trackingLoading = true;
      try {
        this.trackingRequest = await contactService.getSupportTracking(
          this.trackingAccess.id,
          this.trackingAccess.trackingToken
        );
        return this.trackingRequest;
      } catch {
        this.trackingRequest = null;
        return null;
      } finally {
        this.trackingLoading = false;
      }
    },
    async rateEmployee(rating, comment) {
      if (!this.trackingAccess) return false;
      this.ratingSubmitting = true;
      try {
        await contactService.rateSupportEmployee(
          this.trackingAccess.id,
          this.trackingAccess.trackingToken,
          rating,
          comment
        );
        await this.fetchTracking();
        this.statusType = 'success';
        this.statusMessage = 'Cảm ơn bạn đã đánh giá nhân viên hỗ trợ.';
        return true;
      } catch {
        this.statusType = 'error';
        this.statusMessage = 'Không thể gửi đánh giá. Vui lòng thử lại.';
        return false;
      } finally {
        this.ratingSubmitting = false;
      }
    },
  },
});
