const API_PUBLIC_CONFIG = '/api/v1/analytics/public-config';

function injectGtag(measurementId) {
  if (window.__ga4Initialized) return;
  window.__ga4Initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

export default defineNuxtPlugin(async (nuxtApp) => {
  try {
    const base = (useRuntimeConfig().public.apiUrlForBrowserClient || '').replace(/\/$/, '');
    const response = await fetch(`${base}${API_PUBLIC_CONFIG}`, { credentials: 'include' });
    if (!response.ok) return;
    const config = await response.json();
    if (!config?.enabled || !config?.storeMeasurementId) return;

    injectGtag(config.storeMeasurementId);

    const sendPageView = (path) => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', { page_path: path });
      }
    };

    sendPageView(window.location.pathname + window.location.search);
    nuxtApp.$router.afterEach((to) => sendPageView(to.fullPath));

    nuxtApp.provide('ga4', {
      event: (name, params = {}) => {
        if (typeof window.gtag === 'function') {
          window.gtag('event', name, params);
        }
      },
    });
  } catch {}
});
