import { createRouter, createWebHistory } from "vue-router";

import login from "../pages/authentication/login.vue"
import dashboard from "../pages/dashboard.vue"
import companies from "../pages/companies.vue"
import employees from "../pages/employees.vue"


import store from '../store'

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: dashboard,
    },
    {
        path: '/login',
        name: 'login',
        component: login,
    },
    {
        path: '/companies',
        name: 'companies',
        component: companies,
    },
    {
        path: '/employees',
        name: 'employees',
        component: employees,
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
});

router.beforeEach((to, from, next) => {
    const authRequiredRoutes = ["dashboard", "companies", "employees"];
    const authNotRequiredRoutes = ["login",];
    const _isAuthenticated = store.getters._isAuthenticated;

    if (authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) next({ name: "dashboard" });

    if (authRequiredRoutes.indexOf(to.name) > -1) {
        if (_isAuthenticated) next();
        else next({ name: "login" });
    } else {
        // not found
        if (to.matched.length === 0) {
            next({ name: "login" });
        } else {
            next();
        }
    }
});


export default router;
