<template>
  <div :class="['sidebar', {'dark-mode' : isDarkMode}]">
    <h1>目录</h1>
    <ul :class="{'dark-mode' : isDarkMode}">
      <li><router-link to="/" :class="['route-li', {'dark-mode' : isDarkMode}]">主页</router-link></li>
      <li><router-link to="/blog" :class="['route-li', {'dark-mode' : isDarkMode}]">我的博客文章</router-link></li>
      <li><router-link to="/contact" :class="['route-li', {'dark-mode' : isDarkMode}]">联系我</router-link></li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Sidebar',
  computed: {
    ...mapState(['darkMode']),
    ...mapGetters(['isDarkMode']),
  }
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  width: 250px;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 10px;
  left: 0;
  margin-top: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

.route-li {
  text-decoration: none;
  color: #333;
}

.route-li:hover {
  color: #4169E1;
}

.dark-mode .sidebar {
  background-color: #2a2a2a; /* 深灰色背景 */
  color: #e0e0e0; /* 浅色文字 */
}

.dark-mode .route-li {
  color: #cccccc; /* 浅灰色文字 */
}

.dark-mode .route-li:hover {
  color: #6495ed; /* 夜间模式下的悬停颜色 */
}
</style>