<template>
  <div class="flex items-center justify-center gap-4 my-6">
    <span class="font-semibold text-gray-700">Chia sẻ</span>
    
    <a 
      :href="facebookShareUrl" 
      target="_blank"
      rel="noopener noreferrer"
      class="social-icon-wrapper group"
      aria-label="Chia sẻ lên Facebook"
    >
      <div class="social-icon bg-blue-100 group-hover:bg-blue-600">
        <i class="fab fa-facebook-f text-blue-600 group-hover:text-white transition-colors"></i>
      </div>
    </a>
    
    <a 
      :href="linkedinShareUrl" 
      target="_blank"
      rel="noopener noreferrer"
      class="social-icon-wrapper group"
      aria-label="Chia sẻ lên LinkedIn"
    >
      <div class="social-icon bg-blue-100 group-hover:bg-blue-700">
        <i class="fab fa-linkedin-in text-blue-700 group-hover:text-white transition-colors"></i>
      </div>
    </a>
    
    <button 
      @click="copyLink"
      class="social-icon-wrapper group"
      aria-label="Sao chép liên kết"
    >
      <div class="social-icon bg-gray-100 group-hover:bg-primary-red">
        <i class="fas fa-link text-gray-600 group-hover:text-white transition-colors"></i>
      </div>
    </button>

    <!-- Copy Success Toast -->
    <transition name="fade">
      <div 
        v-if="showCopySuccess"
        class="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      >
        <i class="fas fa-check-circle mr-2"></i>
        Đã sao chép liên kết!
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SocialShare',
  props: {
    url: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showCopySuccess: false
    };
  },
  computed: {
    shareUrl() {
      return this.url || window.location.href;
    },
    facebookShareUrl() {
      return `https://www.facebook.com/sharer.php?u=${encodeURIComponent(this.shareUrl)}`;
    },
    linkedinShareUrl() {
      return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(this.shareUrl)}&title=${encodeURIComponent(this.title)}`;
    }
  },
  methods: {
    async copyLink() {
      try {
        await navigator.clipboard.writeText(this.shareUrl);
        this.showCopySuccess = true;
        setTimeout(() => {
          this.showCopySuccess = false;
        }, 3000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  }
};
</script>

<style scoped>
.social-icon-wrapper {
  display: inline-block;
  cursor: pointer;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.social-icon:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.bg-primary-red {
  background-color: #E65151;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>