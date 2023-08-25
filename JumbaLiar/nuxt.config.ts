import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // target:'static',
  build: {
    transpile: ["primevue"],
  },
  // // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // plugins: [
  //   { src: '~/plugins/chart.js', mode: 'client' },
  // //   { src: '~/plugins/axios.js' }
  // ],
  css: [
    "~/assets/style/main.css",
    "~/assets/style/base.css",
    "primevue/resources/themes/saga-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
  ],
});
