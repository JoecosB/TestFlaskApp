<template>
  <div class="main-container">
    <div class="content-container">
      <span v-html="result"></span>
    </div>
    <div class="right-container">
      <div class="toc-container">
        <h3>标题导航</h3>
        <a
          v-for="item in tocItems"
          :key="item.id"
          :href="'#' + item.id"
          :class="['toc-item', `toc-${item.level}`, { active: activeId === item.id }]"
        >
          {{ item.text }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import axios from 'axios';
import { ref, onMounted, computed, nextTick, watch } from 'vue';
import imsize from 'markdown-it-imsize';
import attrs from 'markdown-it-attrs';
import { useStore } from "vuex";

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
    const toc = ref('');
    const tocItems = ref([]);
    const activeId = ref('');
    const store = useStore();
    const isDarkMode = computed(() => store.getters.isDarkMode);
    window.hljs = hljs;

    // 这个函数来源于https://github.com/wcoder/highlightjs-line-numbers.js/
    (function (w, d) {
    'use strict';
    console.log(w)

    var TABLE_NAME = 'hljs-ln',
        LINE_NAME = 'hljs-ln-line',
        CODE_BLOCK_NAME = 'hljs-ln-code',
        NUMBERS_BLOCK_NAME = 'hljs-ln-numbers',
        NUMBER_LINE_NAME = 'hljs-ln-n',
        DATA_ATTR_NAME = 'data-line-number',
        BREAK_LINE_REGEXP = /\r\n|\r|\n/g;

    if (w.hljs) {
        w.hljs.initLineNumbersOnLoad = initLineNumbersOnLoad;
        w.hljs.lineNumbersBlock = lineNumbersBlock;
        w.hljs.lineNumbersValue = lineNumbersValue;

        addStyles();
    } else {
        w.console.error('highlight.js not detected!');
    }

    function isHljsLnCodeDescendant(domElt) {
        var curElt = domElt;
        while (curElt) {
            if (curElt.className && curElt.className.indexOf('hljs-ln-code') !== -1) {
                return true;
            }
            curElt = curElt.parentNode;
        }
        return false;
    }

    function getHljsLnTable(hljsLnDomElt) {
        var curElt = hljsLnDomElt;
        while (curElt.nodeName !== 'TABLE') {
            curElt = curElt.parentNode;
        }
        return curElt;
    }

    // Function to workaround a copy issue with Microsoft Edge.
    // Due to hljs-ln wrapping the lines of code inside a <table> element,
    // itself wrapped inside a <pre> element, window.getSelection().toString()
    // does not contain any line breaks. So we need to get them back using the
    // rendered code in the DOM as reference.
    function edgeGetSelectedCodeLines(selection) {
        // current selected text without line breaks
        var selectionText = selection.toString();

        // get the <td> element wrapping the first line of selected code
        var tdAnchor = selection.anchorNode;
        while (tdAnchor.nodeName !== 'TD') {
            tdAnchor = tdAnchor.parentNode;
        }

        // get the <td> element wrapping the last line of selected code
        var tdFocus = selection.focusNode;
        while (tdFocus.nodeName !== 'TD') {
            tdFocus = tdFocus.parentNode;
        }

        // extract line numbers
        var firstLineNumber = parseInt(tdAnchor.dataset.lineNumber);
        var lastLineNumber = parseInt(tdFocus.dataset.lineNumber);

        // multi-lines copied case
        if (firstLineNumber != lastLineNumber) {

            var firstLineText = tdAnchor.textContent;
            var lastLineText = tdFocus.textContent;

            // if the selection was made backward, swap values
            if (firstLineNumber > lastLineNumber) {
                var tmp = firstLineNumber;
                firstLineNumber = lastLineNumber;
                lastLineNumber = tmp;
                tmp = firstLineText;
                firstLineText = lastLineText;
                lastLineText = tmp;
            }

            // discard not copied characters in first line
            while (selectionText.indexOf(firstLineText) !== 0) {
                firstLineText = firstLineText.slice(1);
            }

            // discard not copied characters in last line
            while (selectionText.lastIndexOf(lastLineText) === -1) {
                lastLineText = lastLineText.slice(0, -1);
            }

            // reconstruct and return the real copied text
            var selectedText = firstLineText;
            var hljsLnTable = getHljsLnTable(tdAnchor);
            for (var i = firstLineNumber + 1 ; i < lastLineNumber ; ++i) {
                var codeLineSel = format('.{0}[{1}="{2}"]', [CODE_BLOCK_NAME, DATA_ATTR_NAME, i]);
                var codeLineElt = hljsLnTable.querySelector(codeLineSel);
                selectedText += '\n' + codeLineElt.textContent;
            }
            selectedText += '\n' + lastLineText;
            return selectedText;
        // single copied line case
        } else {
            return selectionText;
        }
    }

    // ensure consistent code copy/paste behavior across all browsers
    // (see https://github.com/wcoder/highlightjs-line-numbers.js/issues/51)
    document.addEventListener('copy', function(e) {
        // get current selection
        var selection = window.getSelection();
        // override behavior when one wants to copy line of codes
        if (isHljsLnCodeDescendant(selection.anchorNode)) {
            var selectionText;
            // workaround an issue with Microsoft Edge as copied line breaks
            // are removed otherwise from the selection string
            if (window.navigator.userAgent.indexOf('Edge') !== -1) {
                selectionText = edgeGetSelectedCodeLines(selection);
            } else {
                // other browsers can directly use the selection string
                selectionText = selection.toString();
            }
            e.clipboardData.setData('text/plain', selectionText);
            e.preventDefault();
        }
    });

    function addStyles () {
        var css = d.createElement('style');
        css.type = 'text/css';
        css.innerHTML = format(
            '.{0}{border-collapse:collapse}' +
            '.{0} td{padding-top:0}' +
            '.{0} td{padding-bottom:0}' +
            '.{1}:before{content:attr({2})}',
        [
            TABLE_NAME,
            NUMBER_LINE_NAME,
            DATA_ATTR_NAME
        ]);
        d.getElementsByTagName('head')[0].appendChild(css);
    }

    function initLineNumbersOnLoad (options) {
        if (d.readyState === 'interactive' || d.readyState === 'complete') {
            documentReady(options);
        } else {
            w.addEventListener('DOMContentLoaded', function () {
                documentReady(options);
            });
        }
    }

    function documentReady (options) {
        try {
            var blocks = d.querySelectorAll('code.hljs,code.nohighlight');

            for (var i in blocks) {
                if (blocks.hasOwnProperty(i)) {
                    if (!isPluginDisabledForBlock(blocks[i])) {
                        lineNumbersBlock(blocks[i], options);
                    }
                }
            }
        } catch (e) {
            w.console.error('LineNumbers error: ', e);
        }
    }

    function isPluginDisabledForBlock(element) {
        return element.classList.contains('nohljsln');
    }

    function lineNumbersBlock (element, options) {
        if (typeof element !== 'object') return;

        async(function () {
            element.innerHTML = lineNumbersInternal(element, options);
        });
    }

    function lineNumbersValue (value, options) {
        if (typeof value !== 'string') return;

        var element = document.createElement('code')
        element.innerHTML = value

        return lineNumbersInternal(element, options);
    }

    function lineNumbersInternal (element, options) {

        var internalOptions = mapOptions(element, options);

        duplicateMultilineNodes(element);

        return addLineNumbersBlockFor(element.innerHTML, internalOptions);
    }

    function addLineNumbersBlockFor (inputHtml, options) {
        var lines = getLines(inputHtml);

        // if last line contains only carriage return remove it
        if (lines[lines.length-1].trim() === '') {
            lines.pop();
        }

        if (lines.length > 1 || options.singleLine) {
            var html = '';

            for (var i = 0, l = lines.length; i < l; i++) {
                html += format(
                    '<tr>' +
                        '<td class="{0} {1}" {3}="{5}">' +
                            '<div class="{2}" {3}="{5}"></div>' +
                        '</td>' +
                        '<td class="{0} {4}" {3}="{5}">' +
                            '{6}' +
                        '</td>' +
                    '</tr>',
                [
                    LINE_NAME,
                    NUMBERS_BLOCK_NAME,
                    NUMBER_LINE_NAME,
                    DATA_ATTR_NAME,
                    CODE_BLOCK_NAME,
                    i + options.startFrom,
                    lines[i].length > 0 ? lines[i] : ' '
                ]);
            }

            return format('<table class="{0}">{1}</table>', [ TABLE_NAME, html ]);
        }

        return inputHtml;
    }

    /**
     * @param {HTMLElement} element Code block.
     * @param {Object} options External API options.
     * @returns {Object} Internal API options.
     */
    function mapOptions (element, options) {
        options = options || {};
        return {
            singleLine: getSingleLineOption(options),
            startFrom: getStartFromOption(element, options)
        };
    }

    function getSingleLineOption (options) {
        var defaultValue = false;
        if (!!options.singleLine) {
            return options.singleLine;
        }
        return defaultValue;
    }

    function getStartFromOption (element, options) {
        var defaultValue = 1;
        var startFrom = defaultValue;

        if (isFinite(options.startFrom)) {
            startFrom = options.startFrom;
        }

        // can be overridden because local option is priority
        var value = getAttribute(element, 'data-ln-start-from');
        if (value !== null) {
            startFrom = toNumber(value, defaultValue);
        }

        return startFrom;
    }

    /**
     * Recursive method for fix multi-line elements implementation in highlight.js
     * Doing deep passage on child nodes.
     * @param {HTMLElement} element
     */
    function duplicateMultilineNodes (element) {
        var nodes = element.childNodes;
        for (var node in nodes) {
            if (nodes.hasOwnProperty(node)) {
                var child = nodes[node];
                if (getLinesCount(child.textContent) > 0) {
                    if (child.childNodes.length > 0) {
                        duplicateMultilineNodes(child);
                    } else {
                        duplicateMultilineNode(child.parentNode);
                    }
                }
            }
        }
    }

    /**
     * Method for fix multi-line elements implementation in highlight.js
     * @param {HTMLElement} element
     */
    function duplicateMultilineNode (element) {
        var className = element.className;

        if ( ! /hljs-/.test(className)) return;

        var lines = getLines(element.innerHTML);

        for (var i = 0, result = ''; i < lines.length; i++) {
            var lineText = lines[i].length > 0 ? lines[i] : ' ';
            result += format('<span class="{0}">{1}</span>\n', [ className,  lineText ]);
        }

        element.innerHTML = result.trim();
    }

    function getLines (text) {
        if (text.length === 0) return [];
        return text.split(BREAK_LINE_REGEXP);
    }

    function getLinesCount (text) {
        return (text.trim().match(BREAK_LINE_REGEXP) || []).length;
    }

    ///
    /// HELPERS
    ///

    function async (func) {
        w.setTimeout(func, 0);
    }

    /**
     * {@link https://wcoder.github.io/notes/string-format-for-string-formating-in-javascript}
     * @param {string} format
     * @param {array} args
     */
    function format (format, args) {
        return format.replace(/\{(\d+)\}/g, function(m, n){
            return args[n] !== undefined ? args[n] : m;
        });
    }

    /**
     * @param {HTMLElement} element Code block.
     * @param {String} attrName Attribute name.
     * @returns {String} Attribute value or empty.
     */
    function getAttribute (element, attrName) {
        return element.hasAttribute(attrName) ? element.getAttribute(attrName) : null;
    }

    /**
     * @param {String} str Source string.
     * @param {Number} fallback Fallback value.
     * @returns Parsed number or fallback value.
     */
    function toNumber (str, fallback) {
        if (!str) return fallback;
        var number = Number(str);
        return isFinite(number) ? number : fallback;
    }

    }(window, document));

    const fetchTextFile = async () => {
      try {
        // 获取md文件
        emit('loading'); // 开始加载时发送事件
        const response = await axios.get(`/api/markdown_files/${props.filename}`);
        fileContent.value = response.data;

        // 添加复制按钮，添加行号，添加文章内导航目录。
        await nextTick();
        addCopyButtons();
        addLineNumbers();
        generateToc();

        // 添加滚动事件监听
        handleScroll();

      } catch (error) {
        console.error('Error fetching text file:', error);
      } finally {
        emit('loaded'); // 加载完成后发送事件
      }
    };

    // 建立函数生成目录
    const generateToc = () => {
      const headers = document.querySelectorAll('.content-container h2, .content-container h3');
      tocItems.value = Array.from(headers).map((header) => {
        const level = header.tagName.toLowerCase();
        const text = header.innerText;
        const id = text.replace(/\s+/g, '-').toLowerCase();
        header.setAttribute('id', id);

        let prefix = '';
        if (level === 'h2') {
          prefix = '- ';
        } else if (level === 'h3') {
          prefix = '· ';
        }

        return {
          id,
          text: `${prefix}${text}`,
          level,
        };
      });
      console.log(tocItems.value);
    };

    // 建立函数，在代码块右上角添加复制按钮
    const addCopyButtons = () => {
      document.querySelectorAll('pre > code.hljs').forEach((codeElement) => {
        const pre = codeElement.parentNode;
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerText = 'Copy';
        button.addEventListener('click', () => {
          const code = codeElement.innerText;
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

    //建立函数，在代码块左方添加行号
    const addLineNumbers = () => {
      document.querySelectorAll('pre code.hljs').forEach((block) => {
        window.hljs.lineNumbersBlock(block, { singleLine: true });
      });
    };

    // 监听滚动事件，更新当前高亮的标题
    const handleScroll = () => {
      const headers = document.querySelectorAll('.content-container h2, .content-container h3');
      const offset = 80; // 用于计算距离，设为0表示从视口顶端开始

      window.addEventListener('scroll', () => {
        let currentId = '';
        let smallestDistance = Infinity;

        headers.forEach((header) => {
          const rect = header.getBoundingClientRect();
          const distance = Math.abs(rect.top - offset);

          // 选择距离视口顶部最近的标题
          if (distance < smallestDistance) {
            smallestDistance = distance;
            currentId = header.id;
          }
        });

        // 更新当前高亮的标题ID
        activeId.value = currentId;
      });
    };

    const applyDarkModeClass = () => {
      const elements = this.$el.querySelectorAll('.loading-spinner-container, .loading-spinner, .copy-button, .copy-button:hover, .hljs-ln-numbers, .hljs-ln-code, .code-lang-label, .toc-container, .right-container, .toc-item, .toc-item:hover, .toc-h2, .toc-h3, .toc-item.active, .toc-item::before');
      elements.forEach(element => {
        if (isDarkMode) {
          element.classList.add('dark-mode');
        } else {
          element.classList.remove('dark-mode');
        }
      });
    };

    // 当文件名变化时重新获取文件
    watch(() => props.filename, (newFilename) => {
      if (newFilename) {
        fetchTextFile();
      }
    });

    // 当黑夜模式变化当时候修改html
    watch(isDarkMode, () => {
      applyDarkModeClass();
    });

    // 组件挂载后获取文件
    onMounted(() => {
      fetchTextFile();
    });

    // 建立markdown解释器
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          console.log(lang);
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
    md.use(attrs, {
      leftDelimiter: '{',
      rightDelimiter: '}',
      allowedAttributes: []  // empty array = all attributes are allowed
    });

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

    // 将markdown渲文本渲染html
    const result = computed(() => {
      return md.render(fileContent.value);
    });

    return {
      result,
      toc,
      tocItems,
      activeId,
      title: props.title
    };
  }
}
</script>

<style>
pre code.hljs {
  background-color: #f0f0f0; /* 灰色背景 */
  border: none;
  padding-left: 10px;             /* 内边距 */
  border-radius: 5px;        /* 圆角 */
  display: block;
  overflow-x: auto;          /* 横向滚动条 */
}

code.hljs {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 2px 4px;
  border-radius: 3px;
}

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
}

.copy-button:hover {
  background-color: #333; /* 鼠标悬停时的颜色 */
  color: #ffffff
}

/* 行号容器的基础样式 */
.hljs-ln-numbers {
  text-align: right;         /* 行号右对齐 */
  padding-right: 10px;       /* 行号与代码之间的间距 */
  vertical-align: top;       /* 行号垂直对齐 */
  user-select: none;         /* 禁止用户选择行号 */
  color: #999;               /* 行号的颜色 */
  background-color: #f0f0f0; /* 行号的背景色 */
  border-right: 1px solid #ddd; /* 行号与代码之间的分割线 */
}

/* 代码容器的基础样式 */
.hljs-ln-code {
  padding-left: 10px;        /* 代码与行号之间的间距 */
}

.hljs-string {
  color: #008000; /* 绿色 */
}

.hljs-subst {
  color: orange;
}

.code-lang-label {
  position: absolute;
  top: 0;
  left: 0;
  text-transform: uppercase; /* 字母大写 */
  Z-index: 10;            /* 确保标签在代码块之上 */
}

/* 导航栏样式 */
.toc-container {
  position: fixed;
  top: 100px;
  right: 0px;
  width: 250px;
  padding: 10px;
  background: #f9f9f9;
  border: none;
  border-radius: 5px;
  overflow-y: auto;
}

.right-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background-color: #f9f9f9;
  border: none;
  overflow-y: auto;
  padding-top: 20px;
  z-index: 10;
}

/* 导航项样式 */
.toc-item {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  text-decoration: none;
  color: #aaa;
}

.toc-item:hover {
  color: cornflowerblue;
}

/* 不同级别标题的缩进 */
.toc-h2 {
  margin-left: 10px;
}

.toc-h3 {
  margin-left: 20px;
}

/* 高亮的导航项 */
.toc-item.active {
  color: #333; /* 高亮状态下的深色 */
  font-weight: bold;
}

.toc-item::before {
  margin-right: 5px;
}

html {
  scroll-behavior: smooth;
}

a {
  text-decoration: none;
  color: orange;
  transition: color 0.3s;
}

a:hover {
  color: cornflowerblue;
}

.dark-mode pre code.hljs {
  background-color: #2a2a2a; /* 背景改为深灰色 */
  color: #e0e0e0; /* 文字改为浅灰色 */
}

.dark-mode code.hljs {
  background-color: #2a2a2a; /* 背景改为深灰色 */
  color: #e0e0e0; /* 文字改为浅灰色 */
}

.dark-mode pre code {
  background-color: #2a2a2a; /* 背景改为深灰色 */
  color: #e0e0e0; /* 文字改为浅灰色 */
}

.dark-mode code {
  background-color: #2a2a2a; /* 背景改为深灰色 */
  color: #e0e0e0; /* 文字改为浅灰色 */
}

.dark-mode .copy-button {
  color: #e0e0e0; /* 按钮文字改为浅灰色 */
}

.dark-mode .copy-button:hover {
  background-color: #444444; /* 背景改为深灰色 */
  color: #ffffff; /* 文字改为白色 */
}

.dark-mode .hljs-ln-numbers {
  color: #999999; /* 行号颜色改为浅灰色 */
  background-color: #2a2a2a; /* 行号背景改为深灰色 */
}

.dark-mode .right-container {
  background-color: #2a2a2a; /* 背景改为深灰色 */
  color: #e0e0e0; /* 文字改为浅灰色 */
}

.dark-mode .toc-container {
  background-color: #2a2a2a;
}

.dark-mode .toc-item {
  color: #999999; /* 导航项文字改为略深的灰色 */
}

.dark-mode .toc-item:hover {
  color: #87cefa; /* 悬停时改为亮蓝色 */
}

.dark-mode .toc-item.active {
  color: #ffffff; /* 高亮状态改为白色 */
}

.dark-mode a {
  color: #87cefa; /* 链接改为亮蓝色 */
}

.dark-mode a:hover {
  color: #ff8c00; /* 悬停时改为橙色 */
}

.content-container h1,
.content-container h2,
.content-container h3{
  font-style: oblique;
  line-height: 1.4;
  text-decoration-line: spelling-error;
  scroll-margin-top: 80px;
}
</style>