/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice'
import Listbox from 'primevue/listbox';
import Button from 'primevue/button';
import App from './App.vue'

// import 'primevue/resources/themes/lara-light-teal/theme.css'
import 'primevue/resources/themes/md-light-indigo/theme.css'
const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)
app.use(ToastService)
app.component('Listbox', Listbox);
app.component('Button', Button);
app.mount('#app')
