import './assets/css/bootstrap.css';
import './assets/css/reset.css';
import './assets/css/all.css';
import './assets/css/main.css';

import { createApp } from 'vue'
import { appAxios } from './utils/appAxios';
import App from './App.vue'
import router from './router/router.js'
import store from './store';



const app = createApp(App);
app.use(router);
app.use(store);
app.config.globalProperties.$appAxios = appAxios;
app.mount("#app");

