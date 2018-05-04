// import stroage from '@/module/account/store/stroage.js'
// import userApi from '@/module/account/axios/user.js'

export default {
  namespaced: true,
  state: {},
  getters: {
    userInfo (state, getters, rootState) {
      return rootState.account.userInfo
    }
  },
  mutations: {},
  actions: {}
}
