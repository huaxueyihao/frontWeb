/**
 * 基于 axios 请求模块
 */

import axios from 'axios'

// 创建一个axios实例，说白了就是绘制了一个axios
//
const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/'
})

export default request



