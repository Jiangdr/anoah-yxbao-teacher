
export default {
  namespaced: true,
  state: {
    newMsg: false,
    newHomeworkMsg: false,
    newSchoolMsg: false
  },
  mutations: {
    setMsg(state, val) {
      state.newMsg = val
    },
    setHomeworkMsg(state, val) {
      state.newHomeworkMsg = val
    },
    setSchoolMsg(state, val) {
      state.newSchoolMsg = val
    }
  },
  actions: {

  }

}
