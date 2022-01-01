// 请求模块
// 加载 axios库
import axios from 'axios'
import store from '@/store/index.js'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 基础路径
})

// 请求拦截器

request.interceptors.request.use(function(config) {
  // Do something before request is sent
  const { user } = store.state
  // 如果用户已登录 统一接口设置token信息
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 处理完一定要把 config 返回 否则请求 就会停在这里
  return config
}, function(error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器

// 导出
export default request
