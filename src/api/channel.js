// 频道编辑相关模块
import request from '@/utils/request.js'

export const getchannel = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
// 添加指定频道
export const addUserChannel = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data
  })
}
// 删除指定频道
export const deteleUserChannel = (data) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${data}`
  })
}
