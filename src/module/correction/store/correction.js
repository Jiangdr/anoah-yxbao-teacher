// import stroage from '@/common/account/store/stroage.js'
// import userApi from '@/common/account/axios/user.js'

// export default {
//   namespaced: true,
//   state: {
//     isLogin: false,
//     username: '',
//     password: ''
//   },
//   getters: {
//   },
//   mutations: {
//     setIsLogin (state, isLogin) {
//       state.isLogin = isLogin
//       // 登录成功后会话更新登录状态
//       stroage['session'].set('user.isLogin', isLogin)
//     },
//     setUsername (state, val) {
//       state.username = val
//     },
//     setPassword (state, val) {
//       state.password = val
//     }
//   },
//   actions: {
//     doLogin (context) {
//       return userApi.doLogin(context.state.username, context.state.password).then(r => {
//         // 登录成功后持久用户名和密码
//         stroage['persistent'].set('user.username', context.state.username)
//         stroage['persistent'].set('user.password', context.state.password)
//         context.commit('setIsLogin', true)
//       })
//     },
//     refreshLocalIsLogin (context) {
//       context.state.isLogin = stroage['session'].get('user.isLogin')
//     }
//   }

// }
