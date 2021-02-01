import request from '@/utils/request'

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body 参数使用data设置
    // Query 参数使用params设置
    // Headers参数使用headers设置
    params
  })
}

export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
    // Body 参数使用data设置
    // Query 参数使用params设置
    // Headers参数使用headers设置
  })
}
