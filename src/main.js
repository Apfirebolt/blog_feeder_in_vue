import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import CKEditor from '@ckeditor/ckeditor5-vue';
import './style.css'
import router from './routes'
import App from './App.vue'


const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(MotionPlugin)
app.use(CKEditor)
app.mount('#app');

