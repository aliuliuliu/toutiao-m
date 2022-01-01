// 文章相关请求模块

import request from '@/utils/request.js'

// 获取文章方法
export const getArtcles = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
// 获取文章详情
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}
// 收藏文章
export const CollectArticles = (articleId) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target: articleId
    }
  })
}
// 取消收藏文章
export const unCollectArticles = (articleId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${articleId}`
  })
}
// 点赞文章
export const likeArticles = (likeId) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: likeId
    }
  })
}
// 取消点赞文章
export const unlikeArticles = (unlikeId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${unlikeId}`
  })
}
