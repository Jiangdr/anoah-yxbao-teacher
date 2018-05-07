// import stroage from '@/module/account/store/stroage.js'
// import userApi from '@/module/account/axios/user.js'

export default {
  namespaced: true,
  state: {},
  getters: {
    userId (state, getters, rootState) {
      return rootState.account.userInfo.userid
    }
  },
  mutations: {},
  actions: {}
}
