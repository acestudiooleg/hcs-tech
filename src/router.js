import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      component: Login,
      path: '/',
      name: 'login',
    },
  ],
});

export const transitionTo = (name, params) => router.push({ name, params });

export default router;
