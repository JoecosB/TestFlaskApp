import { createRouter, createWebHistory } from 'vue-router';

// 引入页面
import HomePage from '@/views/HomePage.vue';
import AboutPage from '@/views/AboutPage.vue';
import TrollPage from "@/views/TrollPage.vue";

// 定义路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/troll',
    name: 'Troll',
    component: TrollPage
  },
];

// 创建 router 实例
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
