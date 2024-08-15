import { createRouter, createWebHistory } from 'vue-router';

// 引入页面
import HomePage from '@/views/HomePage.vue';
import BlogPage from '@/views/Blog.vue';

// 定义路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage
  },
];

// 创建 router 实例
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
