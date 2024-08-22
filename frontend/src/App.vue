<template>
  <div id="app">
    <NavBar/>
    <component :is="SideBar"/>
    <div :class="['main-content', {'dark-mode' : isDarkMode}]">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar_Home from "@/components/SideBar_Home.vue";
import SideBar_Blog from "@/components/SideBar_Blog.vue";
import {mapGetters, mapState} from "vuex";

export default {
  name: 'App',
  components: {
    NavBar,
    SideBar_Home,
    SideBar_Blog
  },
  computed: {
    // 根据路由路径选择侧边栏
    SideBar() {
      return this.$route.path.startsWith('/blog') ? SideBar_Blog : SideBar_Home;
    },
    ...mapState(['darkMode']),
    ...mapGetters(['isDarkMode']),
  },
  watch: {
    isDarkMode(newVal) {
      if (newVal) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  },
  mounted() {
    // 页面加载时初始化 body 的 class
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
</script>

<style>
.main-content {
  margin-left: 260px;
  margin-right: 260px;
  margin-top: 70px;
  padding: 20px; /* 内边距 */
  background-color: transparent;
}

body.dark-mode {
  background-color: #1e1e1e;
  color: #b3b3b3;
}
</style>