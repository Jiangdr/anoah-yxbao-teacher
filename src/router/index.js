import Vue from 'vue'
import Router from 'vue-router'
import account from '@/common/account/router'
import correction from '@/common/correction/router'
import notice from '@/common/notice/router'
<<<<<<< HEAD
import Home from '@/components/home'

Vue.use(Router)
=======
import userCenter from '@/common/user-center/router'
import home from '@/components/home/index'

Vue.use(Router)

let routes = [{
  path: '/',
  name: 'home',
  component: home,
  meta: { requiresAuth: true, keepAlive: true }
}]
routes = routes.concat(account).concat(userCenter).concat(account, correction, notice)
>>>>>>> common

let routes = [{
  path: '/',
  name: 'home',
  component: Home,
  meta: { requiresAuth: true, keepAlive: true }
}]
routes = routes.concat(account,correction,notice)
let router = new Router({
  routes: routes
})

// 全局跳转
router.beforeEach((to, from, next) => {
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
    if (to.name === 'login') {
      // 帐号已经登录过了，就直接转到首页
      router.app.$options.store.dispatch('account/refreshLocalIsLogin')
      console.log('router.app.$options.store.state.account.isLogin', router.app.$options.store.state.account.isLogin)
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
