import Vue from 'vue'
import Router from 'vue-router'
import account from '@/module/account/router'
<<<<<<< HEAD
import userCenter from '@/module/user-center/router'
=======

>>>>>>> local
import home from '@/components/home/index'
import list from '@/components/home/list'

Vue.use(Router)
let routes = [
  {
    path: '/',
    name: 'Home',
    component: home,
    meta: { requiresAuth: true, keepAlive: false }
  },
  {
    path: '/list',
    name: 'List',
    component: list,
    meta: { requiresAuth: true, keepAlive: false }
  }
]

routes = routes.concat(account)

let router = new Router({
  routes: routes
})

// 全局跳转
router.beforeEach((to, from, next) => {
  // console.log('to=>', to, 'from=>', from)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 检查state的isLogin
    if (!router.app.$options.store.state.account.isLogin) {
      // 从sessionStroage中刷新isLogin
      router.app.$options.store.dispatch('account/refreshLocalIsLogin')
      // 再次检查state的isLogin
      if (!router.app.$options.store.state.account.isLogin) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }// 把要跳转的地址作为参数传到下一步
        })
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    // 如果to登录页
    if (to.path === '/login') {
      // 帐号已经登录过了，就直接转到首页
      router.app.$options.store.dispatch('account/refreshLocalIsLogin')
      // console.log('router.app.$options.store.state.account.isLogin', router.app.$options.store.state.account.isLogin)
      if (router.app.$options.store.state.account.isLogin) {
        next({
          path: '/'
        })
      } else {
        next() // 确保一定要调用 next()
      }
    } else {
      next() // 确保一定要调用 next()
    }
  }
})

export default router
