import { createApp } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from '@/router/router';
import App from './App.vue';
import store from './store';

const app = createApp(App);

// eslint-disable-next-line no-restricted-syntax
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app
    .use(router)
    .use(store)
    .use(ElementPlus)
    .mount('#app');
