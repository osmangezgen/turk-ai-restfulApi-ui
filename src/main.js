import './assets/css/bootstrap.css';
import './assets/css/reset.css';
import './assets/css/all.css';
import './assets/css/main.css';

import { createApp } from 'vue'
import { appAxios } from './utils/appAxios';
import App from './App.vue'
import router from './router/router.js'
import store from './store';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueSweetalert2);
app.config.globalProperties.$appAxios = appAxios;
app.mount("#app");

