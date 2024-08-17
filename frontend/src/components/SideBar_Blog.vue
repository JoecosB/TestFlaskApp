<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h1>目录</h1>
    </div>
    <div
      class="sidebar-content"
      :class="{ 'shadow-top': hasTopShadow, 'shadow-bottom': hasBottomShadow }"
      @scroll="handleScroll"
    >
      <div v-if="isLoading" class="loader"></div>
      <ul v-else>
        <li v-for="(file, index) in fileList" :key="index" class="file-item">
          <router-link :to="{ name: 'Blog', params: { filename: file } }" class="route-li">
            {{ file }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from 'axios';

export default {
  name: 'Sidebar',
  setup() {
    const fileList = ref([]);
    const isLoading = ref(true);  // 加载状态
    const hasTopShadow = ref(false);  // 控制顶部阴影的显示
    const hasBottomShadow = ref(true);  // 控制底部阴影的显示


    const fetchFileList = async () => {
      try {
        const response = await axios.get('/api/get_file_list');
        fileList.value = response.data.file_list;
      } catch (error) {
        console.error('Error fetching file list:', error);
      } finally {
        isLoading.value = false;  // 请求结束后关闭加载动画
        updateShadows();
      }
    };

    const handleScroll = (event) => {
      const element = event.target;
      hasTopShadow.value = element.scrollTop > 0;
      hasBottomShadow.value = element.scrollTop + element.clientHeight < element.scrollHeight;
    };

    const updateShadows = () => {
      const element = document.querySelector('.sidebar-content');
      if (element) {
        hasTopShadow.value = element.scrollTop > 0;
        hasBottomShadow.value = element.scrollTop + element.clientHeight < element.scrollHeight;
      }
    };

    onMounted(() => {
      fetchFileList();
      updateShadows();
    });

    return {
      fileList,
      isLoading,
      hasTopShadow,
      hasBottomShadow,
      handleScroll,
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
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  flex-shrink: 0; /* 保持标题部分不动 */
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.sidebar-content {
  flex-grow: 1; /* 剩余空间用于滚动内容 */
  overflow-y: auto; /* 添加垂直滚动条 */
  width: 106%;
  margin-left: -3%;
  z-index: 1;
}

.shadow-top {
  box-shadow: inset 0 30px 30px -10px rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.shadow-bottom {
  box-shadow: inset 0 -30px 30px -10px rgba(0, 0, 0, 0.5);
  z-index: 10;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  margin: 0; /* 移除 margin 以便背景颜色覆盖整个宽度 */
}

.route-li {
  text-decoration: none;
  color: #333;
  display: block;
  padding: 10px;
}

.route-li:hover {
  color: #4169E1;
}

/* 使用 nth-child 选择器实现条目背景色交替 */
.file-item:nth-child(odd) {
  background-color: #f9f9f9;
}

.file-item:nth-child(even) {
  background-color: #ffffff;
}

/* 加载动画样式 */
.loader {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #4169E1;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: auto;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>