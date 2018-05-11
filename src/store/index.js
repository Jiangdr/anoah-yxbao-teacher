import Vue from 'vue'
import Vuex from 'vuex'

import accountStore from '@/module/account/store/account.js'
import userCenterStore from '@/module/user-center/store/userCenter.js'
import homeworkStore from '@/module/homework/store/homework.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account: accountStore, // 用户账户模块
    userCenter: userCenterStore, // 用户中心模块
    homework: homeworkStore // 用户中心模块
  }
})
