import Vue from 'vue';
import VueRouter from 'vue-router';
import Resources from '@/views/Resources.vue';
import Recommendations from '@/views/Recommendations.vue';
import Instructions from '@/views/Instructions.vue';
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
    path: '/recommendations',
    name: 'Recommendations',
    component: Recommendations,
  },
  {
    path: '/instructions',
    name: 'Instructions',
    component: Instructions,
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
