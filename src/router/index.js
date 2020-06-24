import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import Home from '../views/Home.vue'
import Auth from '../components/Auth/Auth.vue';
import RacerComponent from "../components/RacerComponent";
import SignIn from "../components/Auth/SignIn";
import {currentUser} from "../firebaseConfig";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        alias: ['*'],
        name: 'home',
        component: Home
    },
    {
        path: '/racer',
        name: 'racer',
        component: RacerComponent,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Auth
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = firebase.auth().currentUser;
    console.log(requiresAuth);
    console.log(!!currentUser);
    if (requiresAuth && !currentUser) {
        next('/login')
    } else if(requiresAuth && currentUser) {
        next();
    }
    else {
        next();
    }
});

export default router
