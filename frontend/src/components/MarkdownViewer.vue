<template>
  <div>
    <span v-html="result"></span>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import axios from 'axios';
import { ref, onMounted, computed, nextTick, watch } from 'vue';
import imsize from 'markdown-it-imsize';

export default {
  name: 'MarkdownViewer',
  props: {
    filename: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: 'Markdown Viewer'
    }
  },
  setup(props, { emit }) {
    const fileContent = ref('');

    const fetchTextFile = async () => {
      try {
        emit('loading'); // 开始加载时发送事件
        const response = await axios.get(`/api/markdown_files/${props.filename}`);
        fileContent.value = response.data;
        await nextTick();
        addCopyButtons();
      } catch (error) {
        console.error('Error fetching text file:', error);
      } finally {
        emit('loaded'); // 加载完成后发送事件
      }
    };

    const addCopyButtons = () => {
      document.querySelectorAll('pre').forEach((pre) => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerText = 'Copy';
        button.addEventListener('click', () => {
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

    watch(() => props.filename, (newFilename) => {
      if (newFilename) {
        fetchTextFile();
      }
    });

    onMounted(() => {
      fetchTextFile();
    });

    const md = new MarkdownIt({
      linkify: true,
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
    md.use(imsize)

    // 添加图片大小处理规则
    md.renderer.rules.image = function (tokens, idx, options, env, self) {
      const token = tokens[idx];
      const src = token.attrGet('src');
      const alt = token.content || '';

      let width = 'calc(100% - 80px)';
      let height = 'auto';

      // 生成最终的 HTML 图片标签
      return `<img src="${src}" alt="${alt}" style="max-width:${width}; height:${height};" />`;
    };

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