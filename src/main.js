// 加载 vue 第三方库
import Vue from 'vue'
// 加载 App 组价
import App from './App.vue'
// 加载 vue-router 路由
import router from './router'
// 加载 vuex 状态管理
import store from './store'
// 加载全局样式
import '@/styles/index.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
