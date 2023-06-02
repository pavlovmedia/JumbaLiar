import { defineNuxtPlugin } from "nuxt/app";
import PrimeVue from 'primevue/config';
import Timeline from 'primevue/timeline';
import Chart from "primevue/chart";
import Card from "primevue/card";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(PrimeVue);
  nuxtApp.vueApp.component('Timeline', Timeline);
  nuxtApp.vueApp.component('Chart', Chart);
  nuxtApp.vueApp.component('Card', Card);
})