import Vue from 'vue';
import VueRouter from 'vue-router';
import AppGalleries from './components/AppGalleries';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: AppGalleries
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
