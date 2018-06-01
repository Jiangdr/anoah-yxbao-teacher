export default {
  namespaced: true,
  state: {
    resource: [],
    params: null
  },
  getters: {
  },
  mutations: {
    setParams: (state, payload) => {
      state.params = payload
    },
    clearParams: state => {
      state.params = null
    },
    setParamsIndex: (state, payload) => {
      state.params.index = payload
    },
    setResource: (state, payload) => {
      state.resource = payload
    },
    clearResource: state => {
      state.resource = []
    }
  },
  actions: {
  }
}
