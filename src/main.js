// import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 引入elementplus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

// 引入pinia
import { createPinia } from 'pinia'
app.use(createPinia())



// 引入路由
import router from './router'
app.use(router)


//挂载app
app.mount('#app')

