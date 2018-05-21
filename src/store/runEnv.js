import stroage from '@/store/stroage.js'

export default {
  namespaced: true,
  state: {
    env: stroage['persistent'].get('runEnv.env') || '.dev',
    host: 'anoah.com',
    pro: 'http'
  },
  getters: {
    api2: state => {
      return `${state.pro}://api2${state.env}.${state.host}/`
    },
    old: state => {
      return `${state.pro}://e${state.env}.${state.host}/`
    }
  },
  mutations: {
    setEnv(state, val) {
      state.env = val;
      stroage['persistent'].set('runEnv.env', val)
    }
  },
  actions: {
    changeEnv: function ({ commit }, val) {
      commit('setEnv', val);
    }
  }
};
