import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';
import FrontPage from '../views/FrontPage.vue'

const routes = [
    {
        path: '/',
        name: 'FrontPage',
        component: FrontPage
    },
    {
        path: '/register',
        name: 'Register',
        // route level code-splitting
        // this generates a separate chunk for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
    },
    {
        path: '/password-guide',
        name: 'PasswordGuide',
        component: () => import(/* webpackChunkName: "password-guide" */ '../views/PasswordGuide.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            requresAuth: true
        },
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(/*process.env.BASE_URL*/),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requresAuth)) {
        if (!store.getters.isLoggedIn) {
            next({ name: 'Login' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
