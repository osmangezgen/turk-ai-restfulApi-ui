// import './assets/css/bootstrap.css';
// import './assets/css/reset.css';
// import './assets/css/all.css';
// import './assets/css/app.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store';



const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");

