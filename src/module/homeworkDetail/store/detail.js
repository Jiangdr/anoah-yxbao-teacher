
export default {
  namespaced: true,
  state: {
    params: {},
    mini: {},
    index: 0
  },
  getters: {
  },
  mutations: {
    setParams(state, val) {
      state.params = val
    },
    setmini(state, val) {
      state.mini = val
    },
    setIndex(state, val) {
      // if (val > 0) {
      //   if (state.index === state.mini.length) {
      //     return false
      //   } else {
      //     state.index++
      //   }
      // } else {
      //   if (state.index === 0) {
      //     return false
      //   } else {
      //     state.index--
      //   }
      // }
      // state.params = state.mini[state.index];
      state.index = val
      state.params = state.mini[val]
    }
  },
  actions: {
  }
}
