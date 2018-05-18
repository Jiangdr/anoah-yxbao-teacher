
export default {
  namespaced: true,
  state: {
    groupDetail: {},
    curr: {},
    index: 0
  },
  getters: {
  },
  mutations: {
    setgroupDetail(state, val) {
      state.groupDetail = val
    },
    setcurr(state, val) {
      state.curr = val
    },
    setindex(state, val) {
      state.index = val
    }
  },
  actions: {
  }

}
