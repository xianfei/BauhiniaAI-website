import { createApp } from 'vue'
import App from './App.vue'
import { VueMarkdownItPlugin } from '@f3ve/vue-markdown-it';


createApp(App).use(VueMarkdownItPlugin).mount('#app')
