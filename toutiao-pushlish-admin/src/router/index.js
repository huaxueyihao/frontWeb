import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'
import Publish from '@/views/publish'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '', // path为空，默认子路由
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 罗友导航守卫： 说白了所有页面的盗号都会经过这里
// 守卫页面的导航的
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /Login, 校验登录状态
  // 如果没有登录，则条状到登录页面
  // 如果登录了，则允许通过
  // 允许通过

  const user = JSON.parse(window.localStorage.getItem('user'))
  // 检验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})

export default router
