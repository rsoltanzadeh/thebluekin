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
        meta: {
            disallowsAuth: true
        },
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
        path: '/play',
        name: 'Lobby',
        meta: {
            requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "lobby" */ '../views/Lobby.vue')
    },
    {
        path: '/logout',
        name: 'Logout',
        component: FrontPage
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

router.beforeEach(async (to, from, next) => {
    if(to.path == "/logout") {
        fetch("/api/logout");
    }
    const loggedIn = await store.dispatch('checkAuthentication');
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next({ name: 'Login' });
    } else if (to.matched.some(record => record.meta.disallowsAuth) && loggedIn) {
        next({ name: 'Home' });
    } else {
        next();
    }
});

export default router
