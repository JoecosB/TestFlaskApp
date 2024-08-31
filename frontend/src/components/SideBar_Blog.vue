<template>
  <div :class="['sidebar', {'dark-mode' : isDarkMode}]">
    <div :class="['sidebar-header', {'dark-mode' : isDarkMode}]">
      <h1>目录</h1>
    </div>
    <div
      class="sidebar-content"
      :class="{ 'shadow-top': hasTopShadow, 'shadow-bottom': hasBottomShadow, 'dark-mode' : isDarkMode }"
      @scroll="handleScroll"
    >
      <div v-if="isLoading" :class="['loader', {'dark-mode' : isDarkMode}]"></div>
      <ul v-else :class="{'dark-mode' : isDarkMode}">
        <li v-for="(file, index) in fileList" :key="index" :class="['file-item', {'dark-mode' : isDarkMode}]">
          <router-link
            :to="{ name: 'Blog', params: { filename: file } }"
            :class="['route-li', {'dark-mode' : isDarkMode}]"
            @click.native="scrollToTop"
          >
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Sidebar',
  computed: {
    ...mapState(['darkMode']),
    ...mapGetters(['isDarkMode']),
  },
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

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

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
      scrollToTop
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
  z-index: 10;
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

.dark-mode .sidebar {
  background-color: #2a2a2a; /* 深色背景 */
  color: #e0e0e0; /* 浅色文字 */
}

.dark-mode .sidebar-header {
  border-bottom: 1px solid #444; /* 边框颜色改为更暗的灰色 */
}

.dark-mode .sidebar-content {
  background-color: #2a2a2a; /* 与侧边栏一致的背景色 */
}

.dark-mode .shadow-top {
  box-shadow: inset 0 30px 30px -10px rgba(255, 255, 255, 0.2); /* 改为浅色阴影 */
}

.dark-mode .shadow-bottom {
  box-shadow: inset 0 -30px 30px -10px rgba(255, 255, 255, 0.2); /* 改为浅色阴影 */
}

.dark-mode .route-li {
  color: #cccccc; /* 链接颜色改为浅灰色 */
  background-color: transparent; /* 保持透明背景 */
}

.dark-mode .route-li:hover {
  color: #87cefa; /* 悬停时的颜色改为亮蓝色 */
}

/* 条目背景色交替 */
.dark-mode .file-item:nth-child(odd) {
  background-color: #3a3a3a; /* 比主背景稍浅的灰色 */
}

.dark-mode .file-item:nth-child(even) {
  background-color: #2e2e2e; /* 深色 */
}

/* 加载动画样式 */
.dark-mode .loader {
  border: 6px solid #444444;
  border-top: 6px solid #87cefa; /* 边框颜色改为适合夜间模式 */
}
</style>