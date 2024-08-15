<template>
  <div>
    <span v-html="result"></span>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // 选择你喜欢的样式
import axios from 'axios';
import { ref, onMounted, computed, nextTick, watch } from 'vue';

export default {
  name: 'MarkdownViewer',
  props: {
    filename: {
      type: String,
      required: true,
      default: 'test.md'
    },
    title: {
      type: String,
      default: 'Markdown Viewer'
    }
  },
  setup(props) {
    // 使用 ref 来声明响应式变量
    const fileContent = ref('');

    // 定义获取文件内容的函数
    const fetchTextFile = async () => {
      try {
        const response = await axios.get(`/api/markdown_files/${props.filename}`);
        fileContent.value = response.data;

        // 确保在DOM更新后再执行
        await nextTick(); // 等待DOM更新
        addCopyButtons(); // 确保此时HTML结构已完全渲染

      } catch (error) {
        console.error('Error fetching text file:', error);
      }
    };

    const addCopyButtons = () => {
      document.querySelectorAll('pre').forEach((pre) => {
        // 创建复制按钮
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerText = 'Copy';
        button.addEventListener('click', () => {
          // 复制代码到剪贴板
          const code = pre.querySelector('code').innerText;
          navigator.clipboard.writeText(code).then(() => {
            button.innerText = 'Copied!';
            setTimeout(() => {
              button.innerText = 'Copy';
            }, 2000);
          });
        });
        pre.style.position = 'relative';
        pre.appendChild(button);
      });
    };

    // 监听 filename 的变化
    watch(() => props.filename, (newFilename) => {
      if (newFilename) {
        fetchTextFile();
      }
    });

    // 在组件挂载后调用函数
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
      result,
      title: props.title
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

/* 将复制按钮放置在代码块的右上角 */
.copy-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  color: #333333; /* 按钮文字颜色 */
  border: none;
  padding: 1px 2px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.1s ease, color 0.1s ease
}

.copy-button:hover {
  background-color: #333; /* 鼠标悬停时的颜色 */
  color: #ffffff
}
</style>