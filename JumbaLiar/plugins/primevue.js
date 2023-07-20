import { defineNuxtPlugin } from "nuxt/app";
import PrimeVue from 'primevue/config';
import Timeline from 'primevue/timeline';
import Chart from "primevue/chart";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import DynamicDialog from "primevue/dynamicdialog";
import DialogService from 'primevue/dialogservice';
import Dialog from "primevue/dialog";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(PrimeVue);
  nuxtApp.vueApp.use(DialogService);
  nuxtApp.vueApp.component('Timeline', Timeline);
  nuxtApp.vueApp.component('Chart', Chart);
  nuxtApp.vueApp.component('Card', Card);
  nuxtApp.vueApp.component('InputText', InputText);
  nuxtApp.vueApp.component('Button', Button);
  nuxtApp.vueApp.component('Textarea', Textarea);
  nuxtApp.vueApp.component('DynamicDialog', DynamicDialog);
  nuxtApp.vueApp.component('Dialog', Dialog);
})