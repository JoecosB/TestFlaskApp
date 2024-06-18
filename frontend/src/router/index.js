import { createRouter, createWebHistory } from 'vue-router';

// 引入组件
import HomePage from '@/components/Pages/HomePage.vue';
import AboutPage from '@/components/Pages/AboutPage.vue';
import TrollPage from "@/components/Pages/TrollPage.vue";

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
  }
];

// 创建 router 实例
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
