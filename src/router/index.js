import Vue from 'vue'
import Router from 'vue-router'
import account from '@/module/account/router'
// 纠错
import correction from '@/module/correction/router'
// 通知/消息
import notice from '@/module/notice/router'
// 批改作业--按题
import answerDetail from '@/module/answerDetail/router'
// 批改作业--作业详情
import homeworkDetail from '@/module/homeworkDetail/router'
// 批改作业--统计
import tongji from '@/module/tongji/router/index'
import userCenter from '@/module/user-center/router'
import home from '@/module/home/index'
import list from '@/module/home/list'
import test from '@/components/test'
import homeworkRoutes from '@/module/homework/homework.route'
import studentHomework from '@/module/studentHomework/route'
import originalQuestion from '@/module/qti/router/index'
// 批量评价
import batchEvaluateRoutes from '@/module/batchEvaluate/batchEvaluate.route'
Vue.use(Router)
let routes = [
  {
    path: '/test',
    name: 'test',
    component: test,
    meta: { requiresAuth: true, keepAlive: false }
  },
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
  },
  ...homeworkRoutes,
  ...userCenter,
  ...account,
  ...correction,
  ...notice,
  ...answerDetail,
  ...homeworkDetail,
  ...tongji,
  ...batchEvaluateRoutes,
  ...studentHomework,
  ...originalQuestion
]
let router = new Router({
  routes: routes
})
// 全局跳转
router.beforeEach((to, from, next) => {
  // 没定义的路由，跳到/
  if (to.name === null) {
    next({
      path: '/'
    })
  }
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
          query: {
            redirect: to.fullPath
          } // 把要跳转的地址作为参数传到下一步
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
