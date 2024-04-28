import { createApp } from 'vue';
import ToastPlugin from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import './style.css';
import App from './App.vue';
import { router } from './routes/index.js';

createApp(App).use(ToastPlugin).use(router).mount('#app');
