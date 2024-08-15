<template>
  <div>
    <MarkdownViewer :filename="filename"/>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import MarkdownViewer from '@/components/MarkdownViewer.vue';

export default {
  components: {
    MarkdownViewer
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const filename = ref(route.params.filename || 'default.md'); // 设置默认值

    // Watch for route changes to dynamically update the filename
    watch(() => route.params.filename, (newFilename) => {
      if (newFilename) {
        filename.value = newFilename;
      } else {
        // 如果没有传递 filename，则重定向到默认文件
        router.push({ name: 'Blog', params: { filename: 'default.md' } });
      }
    });

    return {
      filename
    };
  }
}
</script>