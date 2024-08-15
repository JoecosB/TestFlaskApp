<template>
  <div class="sidebar">
    <h1>目录</h1>
    <ul>
      <li v-for="(file, index) in fileList" :key="index">
        <router-link :to="{ name: 'Blog', params: { filename: file } }" class="route-li">
          {{ file }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from 'axios';

export default {
  name: 'Sidebar',
  setup() {
    const fileList = ref([]);

    const fetchFileList = async () => {
      try {
        const response = await axios.get('/api/get_file_list');
        fileList.value = response.data.file_list;
      } catch (error) {
        console.error('Error fetching file list:', error);
      }
    };

    onMounted(() => {
      fetchFileList();
    });

    return {
      fileList
    };
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
</style>