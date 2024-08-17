<template>
  <div>
    <div v-if="isLoading" class="loading-spinner-container">
      <div class="loading-spinner"></div>
    </div>
    <MarkdownViewer :filename="filename" @loading="handleLoading" @loaded="handleLoaded"/>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import MarkdownViewer from '@/components/MarkdownViewer.vue';

export default {
  components: {
    MarkdownViewer
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const filename = ref(route.params.filename || 'default.md');
    const isLoading = ref(false); // 用于控制加载动画的显示

    // 处理加载动画开始
    const handleLoading = () => {
      isLoading.value = true;
    };

    // 处理加载动画结束
    const handleLoaded = () => {
      isLoading.value = false;
    };

    watch(() => route.params.filename, (newFilename) => {
      if (newFilename) {
        filename.value = newFilename;
      } else {
        router.push({name: 'Blog', params: {filename: 'default.md'}});
      }
    });

    return {
      filename,
      isLoading,
      handleLoading,
      handleLoaded
    };
  }
}
</script>

<style>
/* 加载动画的容器样式 */
.loading-spinner-container {
  position: fixed;
  top: 80px;
  left: 270px;
  width: calc(100% - 270px); /* 减去侧边栏的宽度 */
  height: calc(100% - 80px); /* 减去导航栏的高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
  z-index: 1000; /* 确保在所有内容之上 */
}

/* 加载动画的样式 */
.loading-spinner {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

/* CSS 动画定义 */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>