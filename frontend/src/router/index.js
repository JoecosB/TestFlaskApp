import { createRouter, createWebHistory } from 'vue-router';

// 引入组件
import HomePage from '../components/HomePage.vue';
import AboutPage from '../components/AboutPage.vue';

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
  }
];

// 创建 router 实例
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
