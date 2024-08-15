<template>
  <div>
    <h1>About Page</h1>
    <span v-html="result"></span>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // 选择你喜欢的样式
import axios from 'axios';

export default {
  name: 'AboutPage',
  setup() {
    // 使用 ref 来声明响应式变量
    const fileContent = ref('');

    // 定义获取文件内容的函数
    const fetchTextFile = async () => {
      try {
        const response = await axios.get('/api/markdown_file/test.md');
        fileContent.value = response.data;
      } catch (error) {
        console.error('Error fetching text file:', error);
      }
    };

    onMounted(() => {
      fetchTextFile();
    });

    // 使用 computed 以便在 fileContent 变化时重新渲染 Markdown
    const md = new MarkdownIt({
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre><code class="hljs">' +
                   hljs.highlight(str, { language: lang }).value +
                   '</code></pre>';
          } catch (__) {}
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
      }
    });
    const result = computed(() => {
      return md.render(fileContent.value);
    });

    return {
      result
    };
  }
}
</script>
<style>
/* 针对代码块的自定义样式 */
pre code.hljs {
  background-color: #f0f0f0; /* 灰色背景 */
  border: 1px solid #ccc;    /* 边框颜色 */
  padding: 10px;             /* 内边距 */
  border-radius: 5px;        /* 圆角 */
  display: block;
  overflow-x: auto;          /* 横向滚动条 */
  white-space: pre-wrap;     /* 保持换行 */
}

/* 针对内联代码块的样式 */
code.hljs {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 2px 4px;
  border-radius: 3px;
}

/* 针对代码块的自定义样式 */
pre code {
  background-color: #f0f0f0;
  border: none;
  padding: 5px;
  border-radius: 2px;
  display: block;
}

/* 针对内联代码块的样式 */
code {
  background-color: #f0f0f0;
  border: none;
  padding: 2px 4px;
  border-radius: 3px;
}
</style>