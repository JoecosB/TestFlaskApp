<template>
  <div id="app">
    <NavBar/>
    <component :is="SideBar"/>
    <div class="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar_Home from "@/components/SideBar_Home.vue";
import SideBar_Blog from "@/components/SideBar_Blog.vue";

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
}
</style>