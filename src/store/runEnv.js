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
      let tmp = state.env.replace('.', '');
      return `${state.pro}://${tmp}.${state.host}/yxp_api2/`
    },
    old: state => {
      return `${state.pro}://e${state.env}.${state.host}/`
    },
    apis2: state => {
      return `${state.pro}://apis2.${state.env}.${state.host}:/8182`
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
