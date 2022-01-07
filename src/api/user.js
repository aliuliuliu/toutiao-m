// 用户中心相关模块
import request from '@/utils/request.js'

// 在非组件模块中 获取 store 必须通过这种方式
// 这里单独加载 store 和在组件中 this.$store 是一个东西
// import store from '@/store/index.js'

// 登录注册
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 短信验证码
export const senfSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取登录用户信息
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
// 获取用户频道列表
export const getChannelUser = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
// 关注用户
export const focusUser = (userId) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
// 取消关注用户
export const unfocusUser = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}
// 获取用户的 个人资料
export const userFlie = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}
// 修改个人昵称
export const updataName = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
// 修改用户照片资料
export const updataPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
