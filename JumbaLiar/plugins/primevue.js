import { defineNuxtPlugin } from 'nuxt/app';
import PrimeVue from 'primevue/config';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import DataView from 'primevue/dataview';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import InputMask from 'primevue/inputmask';
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';
import Textarea from 'primevue/textarea';
import Timeline from 'primevue/timeline';
import ToggleButton from 'primevue/togglebutton';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(PrimeVue);
  nuxtApp.vueApp.component('Badge', Badge);
  nuxtApp.vueApp.component('Button', Button);
  nuxtApp.vueApp.component('Card', Card);
  nuxtApp.vueApp.component('Chart', Chart);
  nuxtApp.vueApp.component('Column', Column);
  nuxtApp.vueApp.component('DataTable', DataTable);
  nuxtApp.vueApp.component('DataView', DataView);
  nuxtApp.vueApp.component('Dialog', Dialog);
  nuxtApp.vueApp.component('Dropdown', Dropdown);
  nuxtApp.vueApp.component('InputMask', InputMask);
  nuxtApp.vueApp.component('InputText', InputText);
  nuxtApp.vueApp.component('SelectButton', SelectButton);
  nuxtApp.vueApp.component('Textarea', Textarea);
  nuxtApp.vueApp.component('Timeline', Timeline);
  nuxtApp.vueApp.component('ToggleButton', ToggleButton);
})