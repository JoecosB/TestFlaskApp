<template>
  <div class="navbar">
    <ul>
      <li><router-link to="/" class="route-li"><h1>JutasITe</h1></router-link></li>
      <li><router-link to="/about" class="route-li"><h2>我的博客文章</h2></router-link></li>
      <li><router-link to="/contact" class="route-li"><h2>联系我</h2></router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: #333333;
  padding: 10px;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 改为左对齐 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  margin: 0 15px;
}

h2 {
  padding-top: 7px;
}

.route-li {
  text-decoration: none;
  color: white;
  font-size: 16px;
}

.route-li:hover {
  color: #4169E1;
}
</style>