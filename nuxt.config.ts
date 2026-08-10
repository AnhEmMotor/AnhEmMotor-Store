import { defineNuxtConfig } from 'nuxt/config';
import tailwindcss from '@tailwindcss/vite';
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: process.env.NODE_ENV === 'development',
  },
  srcDir: 'app',
  build: {
    transpile: ['@tanstack/vue-query'],
  },
  modules: [
    '@nuxtjs/seo',
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxt/eslint-config',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
  ],
  icon: {
    clientBundle: {
      scan: true,
    },
    serverBundle: 'auto',
    collections: ['ph', 'lucide', 'fa6-solid', 'fa6-regular', 'fa6-brands'],
  },
  sitemap: {
    sources: ['/api/dynamic-sitemap'],
    cacheMaxAgeSeconds: 0,
  },
  ogImage: {
    zeroRuntime: true,
  },
  vite: {
    server: {
      strictPort: true,
    },
    optimizeDeps: {
      include: [
        '@microsoft/fetch-event-source',
        '@microsoft/signalr',
        '@tanstack/vue-query',
        '@tanstack/vue-query-devtools',
        '@unhead/schema-org/vue',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'axios',
        'marked',
        'vue3-toastify',
      ],
    },
    ssr: {
      noExternal: ['@tanstack/vue-query'],
    },
    plugins: [...tailwindcss(), svgLoader()],
    build: {
      sourcemap: false,
      rollupOptions: {
        onwarn(warning, warn) {
          const silentCodes = ['SOURCEMAP_BROKEN', 'UNUSED_EXTERNAL_IMPORT', 'INVALID_ANNOTATION'];
          const silentMessages = [
            'cache-driver.js',
            'virtual:#nitro-internal-virtual/storage',
            'module-preload-polyfill',
          ];
          if (
            silentCodes.includes(warning.code || '') ||
            silentMessages.some((msg) => warning.message?.includes(msg))
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
  },
  plugins: ['~/plugins/vue-query.js', '~/plugins/toast.js'],
  nitro: {
    rollupConfig: {
      onwarn(warning, warn) {
        const silentCodes = ['CIRCULAR_DEPENDENCY'];
        const silentMessages = [
          'cache-driver.js',
          'virtual:#nitro-internal-virtual/storage',
          'node_modules/nitropack',
        ];
        if (
          silentCodes.includes(warning.code || '') ||
          silentMessages.some((msg) => warning.message?.includes(msg))
        ) {
          return;
        }
        warn(warning);
      },
    },
    routeRules: {
      '/contact': { redirect: '/support' },
      '/assets/**': {
        headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
      },
      '/sitemap.xml': { cache: { maxAge: 86400 } },
      '/sitemap_index.xml': { cache: { maxAge: 86400 } },
      '/sitemap-*.xml': { cache: { maxAge: 86400 } },
    },
    compressPublicAssets: true,
  },
  css: ['~/assets/main.css'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap',
        },
      ],
      script: [],
    },
  },
  site: {
    url: 'https://anhemmotor.online',
    name: 'Anh Em Motor',
    description: 'Chuyên cung cấp xe máy, phụ tùng, phụ kiện chính hãng | AnhEm Motor',
    defaultLocale: 'vi',
    twitterCard: 'summary_large_image',
    canonical: 'https://anhemmotor.online',
  },
  runtimeConfig: {
    internalApiUrlForServer: process.env.NUXT_INTERNAL_API_URL_FOR_SERVER,
    public: {
      apiUrlForBrowserClient: process.env.NUXT_PUBLIC_API_URL_FOR_BROWSER_CLIENT,
    },
  },
  alias: {
    '@/stores': './app/core/application/stores',
    '@/services': './app/core/application/services',
    '@/mappers': './app/core/application/mappers',
    '@/constants': './app/core/domain/constants',
    '@/utils': './app/core/domain/utils',
    '~/stores': './app/core/application/stores',
    '~/services': './app/core/application/services',
    '~/mappers': './app/core/application/mappers',
    '~/constants': './app/core/domain/constants',
    '~/utils': './app/core/domain/utils',
  },
  imports: {
    dirs: [
      'core/domain/constants/**',
      'core/domain/utils/**',
      'core/application/services/**',
      'core/application/stores/**',
      'core/application/mappers/**',
      'core/infrastructure/repositories/**',
      'core/domain/models/**',
    ],
  },
});
