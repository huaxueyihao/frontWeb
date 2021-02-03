/**
 * 基于 axios 请求模块
 */

import axios from 'axios'
import JSONbig from 'json-bigint'

// 创建一个axios实例，说白了就是绘制了一个axios
//
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net',
  transformResponse: [
    function (data) {
      // return JSON.parse(data)
      try {
        return JSONbig.parse(data)
      } catch (e) {
        return data
      }
    }
  ]

})

request.interceptors.request.use(
  // 任何所有请求会经过这里
  // config 是当前请求相关的配置信息对象
  // config是可以修改的
  function (config) {
    console.log(config)
    const user = JSON.parse(window.localStorage.getItem('user'))

    // 如果有登录用户信息，则统一设置 token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    return config
  },
  // 请求失败，回经过这里
  function (error) {
    return Promise.reject(error)
  }
)

export default request
