<template>
  <div class="sidebar">
    <h1>Navigation</h1>
    <ul>
      <li><router-link to="/" class="route-li">Home</router-link></li>
      <li><router-link to="/about" class="route-li">About</router-link></li>
      <li><router-link to="/contact" class="route-li">Contact</router-link></li>
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
  top: 0;
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