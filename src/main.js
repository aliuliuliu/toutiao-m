// 加载 vue 第三方库
import Vue from 'vue'
// 加载 App 组价
import App from './App.vue'
// 加载 vue-router 路由
import router from './router'
// 加载 vuex 状态管理
import store from './store'
// 加载 vant 组件库
import Vant from 'vant'
// 加载 vant 组件库 css 样式
import 'vant/lib/index.css'
// 加载全局样式
import '@/styles/index.css'
// 加载 amfe-flexible rem 适配  自动设置 REM 基准值 （html 标签字体大小）
import 'amfe-flexible'
// 把 request组件挂载到 vue 原型链上
// import request from '@/utils/request.js'
// Vue.prototype.$http = request
// 全局注册 Vant 中的组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  beforeCreate() {
    // 设置事件总线
    Vue.prototype.$bus = this
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
