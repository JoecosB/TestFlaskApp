<template>
  <div class="sidebar">
    <h1>目录</h1>
    <ul>
      <li><router-link to="/" class="route-li">主页</router-link></li>
      <li><router-link to="/blog" class="route-li">我的博客文章</router-link></li>
      <li><router-link to="/contact" class="route-li">联系我</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
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
</style>