import Vue from 'vue';
import VueRouter from 'vue-router';
import AppGalleries from './components/AppGalleries';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import SingleGallery from './components/SingleGallery';
import AuthorGallery from './components/AuthorGallery';
import MyGalleries from './components/MyGalleries';
import CreateGallery from './components/CreateGallery';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/galleries'
  },
  {
    path: '/galleries',
    name: 'home',
    component: AppGalleries,
    meta: {
      auth: false
    }
  },
  {
    path: '/galleries/:id',
    name: 'single-gallery',
    component: SingleGallery
  },
  {
    path: '/authors/:id',
    name: 'authors-gallery',
    component: AuthorGallery
  },
  {
    path: '/my-galleries',
    name: 'my-galleries',
    component: MyGalleries
  },
  {
    path: '/create',
    name: 'create-gallery',
    component: CreateGallery
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      guest: true
    }
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (isAuthenticated && to.meta.guest) {
    return next({ name: 'home' });
  }
  if (!isAuthenticated && to.meta.auth) {
    return next({ name: 'login' });
  }
  return next();
});

export default router;
