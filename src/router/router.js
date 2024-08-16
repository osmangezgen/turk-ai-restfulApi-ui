import { createRouter, createWebHistory } from "vue-router";

import dashboard from "../pages/dashboard.vue"
import login from "../pages/authentication/login.vue"


import store from '../store'

const routes = [
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'notFound',
    //     component: notFound
    // },
    {
        path: '/',
        name: 'dashboard',
        component: dashboard,
    },
    {
        path: '/login',
        name: 'login',
        component: login,
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
});

router.beforeEach((to, from, next) => {
    const authRequiredRoutes = ["dashboard"];
    const authNotRequiredRoutes = ["login",];
    const _isAuthenticated = store.getters._isAuthenticated;

    if (authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) next({ name: "dashboard" });

    if (authRequiredRoutes.indexOf(to.name) > -1) {
        if (_isAuthenticated) next();
        else next({ name: "login" });
    } else {
        next();
    }
});


export default router;
