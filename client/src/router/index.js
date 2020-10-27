import Vue from 'vue';
import VueRouter from 'vue-router';
import SearchLyrics from '../views/SearchLyrics.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'search',
    component: SearchLyrics
  },
  {
    path: '/practice',
    name: 'practice',
    component: () => import('../views/TypingPrompt.vue'),
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;