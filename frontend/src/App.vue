<template>
  <div id="app">
    <sideBar/>
    <div class="main-content">
    </div>
    <router-view/>
  </div>
</template>

<script>
import sideBar from "@/components/SideBar.vue";

export default {
  name: 'App',
  components: {
    sideBar
  }
}
</script>

<style>
.main-content {
  margin-left: 260px; /* 侧边栏宽度加上一些额外空间 */
  padding: 20px; /* 内边距 */
}
</style>