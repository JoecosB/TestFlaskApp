<template>
  <div id="app">
    <sideBar/>
    <div class="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";

export default {
  name: 'App',
  components: {
    SideBar
  }
}
</script>

<style>
.main-content {
  margin-left: 260px; /* 侧边栏宽度加上一些额外空间 */
  padding: 20px; /* 内边距 */
}
</style>