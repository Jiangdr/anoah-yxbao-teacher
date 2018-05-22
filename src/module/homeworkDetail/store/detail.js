
export default {
  namespaced: true,
  state: {
    mini: {},
    index: 0
  },
  getters: {
  },
  mutations: {
    setmini(state, val) {
      state.mini = val
    },
    setIndex(state, val) {
      state.index = val
    }
  },
  actions: {
  }
}
