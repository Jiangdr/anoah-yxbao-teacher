import Vue from 'vue'
import Vuex from 'vuex'

import runEnvStore from './runEnv.js'
import accountStore from '@/module/account/store/account.js'
import userCenterStore from '@/module/user-center/store/userCenter.js'
import homeworkStore from '@/module/homework/store/homework.js'
import batchEvaluateStore from '@/module/batchEvaluate/store/batchEvaluate.js'
import homeworkDetailStore from '@/module/homeworkDetail/store/detail.js'
import answerDetailStore from '@/module/answerDetail/store/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    runEnv: runEnvStore, //
    account: accountStore, // 用户账户模块
    userCenter: userCenterStore, // 用户中心模块
    homework: homeworkStore,
    batchEvaluate: batchEvaluateStore,
    homeworkDetail: homeworkDetailStore, // 作业详情
    answerDetail: answerDetailStore // 批改、查看统计
  }
})
