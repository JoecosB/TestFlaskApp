<template>
  <div id="app">
    <NavBar/>
    <SideBar/>
    <div class="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";

export default {
  name: 'App',
  components: {
    NavBar,
    SideBar
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