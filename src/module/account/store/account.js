import stroage from '@/module/account/store/stroage.js'
import userApi from '@/module/account/axios/user.js'

export default {
  namespaced: true,
  state: {
    isLogin: false,
    username: '',
    password: '',
    userInfo: ''
  },
  getters: {
  },
  mutations: {
    setIsLogin (state, isLogin) {
      state.isLogin = isLogin
      // 登录成功后会话更新登录状态
      stroage['session'].set('user.isLogin', isLogin)
    },
    setUsername (state, val) {
      state.username = val
    },
    setPassword (state, val) {
      state.password = val
    },
    setUserInfo (state, val) {
      state.userInfo = val
    }
  },
  actions: {
    doLogin ({state, commit, rootState}) {
      return userApi.doLogin(state.username, state.password).then(r => {
        // 登录成功后持久用户名和密码
        stroage['persistent'].set('user.username', state.username)
        stroage['persistent'].set('user.password', state.password)
        commit('setIsLogin', true)
        commit('setUserInfo', r)
      })
    },
    refreshLocalIsLogin ({state}) {
      state.isLogin = stroage['session'].get('user.isLogin')
    }
  }
}
