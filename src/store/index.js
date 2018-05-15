import Vue from 'vue'
import Vuex from 'vuex'

import accountStore from '@/module/account/store/account.js'
import userCenterStore from '@/module/user-center/store/userCenter.js'
import homeworkStore from './homework/store/homework.js'
import homeworkDetailStore from '@/module/homeworkDetail/store/detail.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account: accountStore, // 用户账户模块
    userCenter: userCenterStore, // 用户中心模块
    homework: homeworkStore, // 用户中心模块
    homeworkDetail: homeworkDetailStore // 作业详情
  }
})
