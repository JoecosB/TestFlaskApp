import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import Prism from 'prismjs';


VMdEditor.use(githubTheme, {
  Prism,
});

const app = createApp(App);
app.use(VMdEditor);
app.mount('#app');
