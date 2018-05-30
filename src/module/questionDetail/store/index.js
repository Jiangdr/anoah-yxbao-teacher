export default {
  namespaced: true,
  state: {
    resource: []
  },
  getters: {
  },
  mutations: {
    setResource: (state, payload) => {
      console.log('payload', payload)
      state.resource = payload
    }
  },
  actions: {
  }
}
