import Vue from 'vue';
import VueRouter from 'vue-router';
import Resources from '@/views/Resources.vue';
import FourOhFour from '@/views/404.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: { name: 'Resources' }
  },
  {
    path: '/resources',
    name: 'Resources',
    component: Resources,
  },
  {
    path: '*',
    name: '404',
    component: FourOhFour
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
