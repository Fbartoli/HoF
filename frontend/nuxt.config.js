import { resolve } from 'path'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  server: {
    // host: '0.0.0.0',
    port: 8080 // default: 3000
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'front-end',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'format-detection', content: 'telephone=no' },
      { 'http-equiv': 'X-UA-Compatible', content: "IE=edge" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'og:type', name: "og:type", content: "website" },
      { hid: 'og:title', name: "og:title", content: "" },
      { hid: 'og:description', name: "og:description", content: "" },
      { hid: 'og:image', name: "og:image", content: "https://" },
      { hid: 'og:url', name: "og:url", content: "https://" },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/style/tailwind.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/devtools.js',
    '~/plugins/bnc-notify.client.js',
    '~/plugins/preview.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    { path: '~/components', extensions: ['vue'] },
    { path: '~/components/_controllers', extensions: ['vue'] },
    { path: '~/components/_containers', extensions: ['vue'] },
    { path: '~/components/_views', extensions: ['vue'] },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxt/postcss8',
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxt/content',
  ],
  content: {
    // Options
    liveEdit: false,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  alias: {
    'images': resolve(__dirname, './assets/images'),
    'style': resolve(__dirname, './assets/style'),
    'data': resolve(__dirname, './assets/data')
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      // https://nuxtjs.org/docs/configuration-glossary/configuration-css/
      // https://tailwindcss.com/docs/using-with-preprocessors#nesting
      // https://www.elian.codes/blog/writing-your-own-components-with-tailwind-sass/
      // https://www.elian.codes/blog/writing-your-own-components-with-tailwind-sass/
      plugins: {
        'postcss-import': {},
        'postcss-easy-import': { prefix: '_', extensions: ['.css', '.scss'] },
        'tailwindcss/nesting': {},
        'tailwindcss': {},
        'autoprefixer': {},
      },
    },
    extend(config) {
      config.node = {
        fs: 'empty'
      }
    }
  },

  loadingIndicator: {
    // https://nuxtjs.org/docs/configuration-glossary/configuration-loading-indicator
    name: 'circle',
    color: '#26D07C',
    background: '#101820'
  },

  // https://nuxtjs.org/docs/configuration-glossary/configuration-telemetry
  telemetry: false,

  storybook: {
    // https://storybook.nuxtjs.org/api/options/
    addons: [
      '@storybook/addon-essentials',
      '@storybook/addon-viewport/register',
    ],
    webpackFinal(config, { configDir }) {
      // manipulate webpack config
      config.node = {
        fs: 'empty'
      }
      return config;
    }
  }

}
