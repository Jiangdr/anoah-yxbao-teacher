import stroage from '@/store/stroage.js'
import userApi from '@/module/account/axios/user.js'

export default {
  namespaced: true,
  state: {
    isLogin: false,
    username: 'zh1234',
    password: '111111',
    userInfo: stroage['persistent'].get('userinfo'),
    jwt: stroage['persistent'].get('jwt'),
    userid: 33737
  },
  getters: {
  },
  mutations: {
    setIsLogin (state, isLogin) {
      state.isLogin = isLogin
      // 登录成功后会话更新登录状态
      stroage['persistent'].set('user.isLogin', isLogin)
    },
    setUsername (state, val) {
      state.username = val
    },
    setPassword (state, val) {
      state.password = val
    },
    setUserInfo (state, val) {
      state.userInfo = val.userinfo
      state.jwt = val.jwt
    },
    setUserId (state, val) {
      state.userid = val;
    }
  },
  actions: {
    doLoginOld ({state, commit}) {
      return userApi.doLoginOld({
        username: state.username,
        password: state.password,
        token: '',
        machine_number: '',
        machine_type: ''
      }).then(r => {
        console.log('r', r)
        // 登录成功后持久用户名和密码
        stroage['persistent'].set('user.username', state.username)
        stroage['persistent'].set('user.password', state.password)
        stroage['persistent'].set('jwt', '')
        stroage['persistent'].set('userinfo', r)
        commit('setIsLogin', true)
        commit('setUserInfo', {"userinfo": r, "jwt": ""})
        commit('setUserId', r.userid)
      })
    },
    doLogin ({state, commit}) {
      return userApi.doLogin({
        'device': 'PC_BROWSER',
        'module': 'YOUXUE-BAN',
        'version': 'v1.0',
        'timestamp': new Date().getTime() / 1000,
        'account': state.username,
        'password': state.password,
        'jwtusertoken': true
      }).then(r => {
        // 登录成功后持久用户名和密码
        stroage['persistent'].set('user.username', state.username)
        stroage['persistent'].set('user.password', state.password)
        stroage['persistent'].set('jwt', r.jwt)
        stroage['persistent'].set('userinfo', r.userinfo)
        commit('setIsLogin', true)
        commit('setUserInfo', r)
      })
    },
    refreshLocalIsLogin ({state}) {
      state.isLogin = stroage['persistent'].get('user.isLogin')
    }
  }
}
