<template>
  <div class="navbar">
    <ul>
      <li><router-link to="/" class="route-li"><h1>JutasITe</h1></router-link></li>
      <li><router-link to="/blog" class="route-li"><h2>我的博客文章</h2></router-link></li>
      <li><router-link to="/contact" class="route-li"><h2>联系我</h2></router-link></li>
    </ul>
    <div class="toggle-container" @click="toggleDarkMode">
    <div :class="['toggle-switch', { active: isDarkMode }]">&thinsp;{{isDarkMode ? '夜' : '日'}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['isDarkMode']),
  },
  methods: {
    ...mapActions(['toggleDarkMode']),
  },
};
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
  justify-content: space-between; /* 改为空间分布 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
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

.toggle-container {
  width: 50px;
  height: 25px;
  background-color: #ccc;
  border-radius: 25px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: auto; /* 将切换按钮靠右 */
  margin-right: 30px;
}

.toggle-container:hover {
  background-color: #bbb;
}

.toggle-switch {
  width: 23px;
  height: 23px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: 1px;
}

.toggle-switch.active {
  transform: translateX(25px);
  background-color: #1e1e1e; /* 当激活时，改变背景色 */
}

.toggle-container.active {
  background-color: #666;
}
</style>