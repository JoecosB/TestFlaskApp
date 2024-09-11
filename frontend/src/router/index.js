import { createRouter, createWebHistory } from 'vue-router';

// 引入页面
import HomePage from '@/views/HomePage.vue';
import BlogPage from '@/views/Blog.vue';
import FriendLink from "@/views/FriendLink.vue";

// 定义路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
        title: '首页 - Jutasite',
        description: '这里是令人头秃的IT开发博客'
      }
  },
  {
    path: '/blog/:filename',
    name: 'Blog',
    component: BlogPage,
    meta: {
        title: '我的博客文章 - Jutasite'
      }
  },
  {
    path: '/friendlink/',
    name: 'FriendLink',
    component: FriendLink,
    meta: {
        title: '友情链接 - Jutasite',
        description: '欢迎交换友情链接!'
      }
  }
];

// 创建 router 实例
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
