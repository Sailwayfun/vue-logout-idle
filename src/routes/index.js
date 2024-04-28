import { createWebHistory, createRouter } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UserView from '../views/UserView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/user/:userId', component: UserView, name: 'user' },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
